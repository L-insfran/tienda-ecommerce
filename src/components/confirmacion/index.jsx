import React, { useContext, useEffect, useState } from "react";
import imagePedido from '../../assets/image/conf-pedido.jpg';
import { CartContext } from "../../context/cartContext";
import { pedirdDestino } from "../../helper/pedirDatos";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/congif";
import "./Pedido.css";

const Pedido = () => {
  const { valorTotalEnCarrito, carrito, vaciarCarrito } = useContext(CartContext);
  const navigate = useNavigate();
  const [destino, setDestino] = useState([]); // Estado para las zonas de envío
  const [formaEntrega, setFormaEntrega] = useState("retiro"); // Estado para la forma de entrega
  const [idZona, setIdZona] = useState(""); // Estado para la zona seleccionada
  const [costoEnvio, setCostoEnvio] = useState(0); // Estado para el costo de envío
  const [medioPago, setMedioPago] = useState("transferencia"); // Estado para el medio de pago seleccionado
  const [datosUsuario, setDatosUsuario] = useState({
    nombre: "",
    direccion: "",
    departamento: "",
    telefono: "",
    comentario: "",
  });
  const [errores, setErrores] = useState({}); // Estado para manejar errores de validación
  const [nroCompra, setNroCompra]= useState(null)
  // Cargar las zonas de envío al montar el componente
  useEffect(() => {
    pedirdDestino()
      .then((resp) => {
        setDestino(resp);
      })
      .catch((error) => {
        console.error("Error al cargar las zonas de envío:", error);
      });
  }, []);

  // Manejar el cambio en la forma de entrega
  const handleFormaEntregaChange = (e) => {
    const nuevaFormaEntrega = e.target.value;
    setFormaEntrega(nuevaFormaEntrega);

    // Si la forma de entrega es "retiro", resetear la zona y el costo de envío
    if (nuevaFormaEntrega === "retiro") {
      setIdZona("");
      setCostoEnvio(0);
    }
  };

  // Manejar el cambio en la selección de la zona de envío
  const handleZonaEnvioChange = (e) => {
    const idZonaSeleccionada = e.target.value;
    setIdZona(idZonaSeleccionada);

    // Calcular el costo de envío basado en la zona seleccionada
    if (idZonaSeleccionada) {
      const zonaSeleccionada = destino.find((zona) => zona.id == idZonaSeleccionada);
      setCostoEnvio(zonaSeleccionada ? zonaSeleccionada.costo : 0);
    } else {
      setCostoEnvio(0);
    }
  };

  // Manejar el cambio en el medio de pago
  const handleMedioPagoChange = (medio) => {
    setMedioPago(medio);
  };

  // Manejar el cambio en los datos del usuario
  const handleDatosUsuarioChange = (e) => {
    const { name, value } = e.target;
    setDatosUsuario({
      ...datosUsuario,
      [name]: value,
    });
  };

  // Validar los datos del usuario
  const validarDatosUsuario = () => {
    const nuevosErrores = {};

    if (!datosUsuario.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    }
    if (formaEntrega === "envio" && !datosUsuario.direccion.trim()) {
      nuevosErrores.direccion = "La dirección es obligatoria";
    }
    if (!datosUsuario.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio";
    } else if (!/^\d+$/.test(datosUsuario.telefono)) {
      nuevosErrores.telefono = "El teléfono debe contener solo números";
    }

    // Validar si se seleccionó una zona de envío cuando la forma de entrega es "envio"
    if (formaEntrega === "envio" && !idZona) {
      nuevosErrores.zona = "Debe seleccionar una zona de envío";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0; // Retorna true si no hay errores
  };

  //Función para manejar el envío del pedido

  const handleEnviarPedido = async () => {
    const pedidosRef = collection(db, "pedidos");

    if (!validarDatosUsuario()) {
      alert("Por favor, complete los campos requeridos correctamente.");
      return;
    }

    if (!medioPago) {
      alert("Por favor, seleccione un medio de pago.");
      return;
    }

    const data = {
      entrega: formaEntrega,
      zona: formaEntrega === "envio" ? destino.find((zona) => zona.id == idZona) : null,
      costoEnvio: formaEntrega === "envio" ? costoEnvio : 0,
      totalAPagar: valorTotalEnCarrito() + costoEnvio,
      medioPago: medioPago,
      datosUsuario: datosUsuario,
      productos: carrito.map((prod) => ({
        titulo: prod.titulo,
        Neto: prod.tipo,
        cantidad: prod.cantidad,
        precio: prod.precio,
      })),
    };

    try {
      const docRef = await addDoc(pedidosRef, data); // Guarda el pedido en Firestore
      setNroCompra(docRef.id);

      const formattedData = `
      🏪 *Tienda On-Line - Kintsugi* 🏪

      📦 *Detalles del Pedido* 📦

      *Forma de Entrega:* ${data.entrega}
      ${data.entrega === "envio" ? `*Zona de Envío:* ${data.zona.zona}\n    *Costo de Envío:* $${data.costoEnvio}` : ""}
      *Total a Pagar:* $${data.totalAPagar}
      *Medio de Pago:* ${data.medioPago}

      👤 *Datos del Usuario* 👤
      *Nombre:* ${data.datosUsuario.nombre}
      *Teléfono:* ${data.datosUsuario.telefono}
      *Dirección:* ${data.datosUsuario.direccion || "No proporcionó información"}

      🛒 *Productos* 🛒
      *#Id-compra:* ${docRef.id}
      ${data.productos
        .map(
          (prod) => `
        *Título:* ${prod.titulo}
        *Neto:* ${prod.Neto}
        *Precio:* $${prod.precio}
        *Cantidad:* ${prod.cantidad}
      `
        )
        .join("\n")}
      `;

      //Enviar mensaje por WhatsApp
      const whatsappMessage = encodeURIComponent(formattedData);
      const whatsappLink = `https://wa.me/541133081248?text=${whatsappMessage}`;
      window.open(whatsappLink, "_blank");

      vaciarCarrito();
      setTimeout(() => {
        navigate("/");
      }, 3000);

      if(docRef.id){
        return(
          <div>
            <h1>Muchas Gracias por tu compra</h1><br />
            <h3>Tu Numero de pedido es: {docRef.id}</h3><br />
            <p>A la brevedad se  estarán contactando por el pedido!</p>
          </div>
        )
      }
    } catch (error) {
      console.error("No se pudo realizar el pedido", error);
    }
  };
  return (
    <div className="pedido-container">
      <div className="pedido-content">
        <img src={imagePedido} alt="confirmar-pedido" />
        <h1 className="pedido-title">Confirmación del pedido</h1>
        <div className="pedido-detalle">
          {/* Sección 1: Local */}
          <section className="pedido-section">
            <h2 className="section-title">1. Local</h2>
            <span className="section-text">Mateo Bootz 2843</span>
          </section>

          {/* Sección 2: Forma de entrega */}
          <section className="pedido-section">
            <h2 className="section-title">2. Forma de entrega</h2>
            <div className="forma-entrega">
              <label className="radio-label">
                <input
                  type="radio"
                  name="entrega"
                  value="retiro"
                  checked={formaEntrega === "retiro"}
                  onChange={handleFormaEntregaChange}
                />
                Retiro en tienda
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="entrega"
                  value="envio"
                  checked={formaEntrega === "envio"}
                  onChange={handleFormaEntregaChange}
                />
                Envío a domicilio
              </label>
              {formaEntrega === "envio" && (
                <>
                  <select
                    className="select-input"
                    value={idZona}
                    onChange={handleZonaEnvioChange}
                  >
                    <option value="">Seleccione una opción</option>
                    {destino.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.zona}
                      </option>
                    ))}
                  </select>
                  {errores.zona && <span className="error-message">{errores.zona}</span>}
                </>
              )}
            </div>
          </section>

          {/* Sección 3: Tus datos */}
          <section className="pedido-section">
            <h2 className="section-title">3. Tus datos</h2>
            <label className="input-label">Nombre completo</label>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre de quien recibe"
              className="input-field"
              value={datosUsuario.nombre}
              onChange={handleDatosUsuarioChange}
            />
            {errores.nombre && <span className="error-message">{errores.nombre}</span>}

            <label className="input-label">Dirección</label>
            <input
              type="text"
              name="direccion"
              placeholder="Dirección de entrega"
              className="input-field"
              value={datosUsuario.direccion}
              onChange={handleDatosUsuarioChange}
            />
            {errores.direccion && <span className="error-message">{errores.direccion}</span>}

            <label className="input-label">Departamento</label>
            <input
              type="text"
              name="departamento"
              placeholder="Departamento"
              className="input-field"
              value={datosUsuario.departamento}
              onChange={handleDatosUsuarioChange}
            />

            <label className="input-label">Teléfono</label>
            <input
              type="text"
              name="telefono"
              placeholder="Número de contacto"
              className="input-field"
              value={datosUsuario.telefono}
              onChange={handleDatosUsuarioChange}
            />
            {errores.telefono && <span className="error-message">{errores.telefono}</span>}

            <label className="input-label">Comentario</label>
            <input
              type="text"
              name="comentario"
              placeholder="Comentarios adicionales"
              className="input-field"
              value={datosUsuario.comentario}
              onChange={handleDatosUsuarioChange}
            />
          </section>

          {/* Sección 4: Medio de pago */}
          <section className="pedido-section forma-pago">
            <h2 className="section-title">Medio de pago</h2>
            <div className="pago-options">
              <span
                className={`pago-option ${medioPago === "efectivo" ? "selected" : ""}`}
                onClick={() => handleMedioPagoChange("efectivo")}
              >
                Efectivo
              </span>
              <span
                className={`pago-option ${medioPago === "transferencia" ? "selected" : ""}`}
                onClick={() => handleMedioPagoChange("transferencia")}
              >
                Transferencia
              </span>
            </div>
          </section>

          {/* Sección 5: Resumen del pedido */}
          <section className="pedido-section resumen">
            <h2 className="section-title">Resumen del pedido</h2>
            <div className="resumen-item">
              <span>Total pedido</span>
              <span>${valorTotalEnCarrito()}</span>
            </div>
            <div className="resumen-item">
              <span>Envío</span>
              <span>${costoEnvio}</span>
            </div>
            <div className="resumen-item total">
              <span>Total a pagar</span>
              <span>${valorTotalEnCarrito() + costoEnvio}</span>
            </div>
          </section>

          {/* Botón de enviar pedido */}
          <button onClick={handleEnviarPedido} className="pedido-btn">
            Enviar Pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pedido;