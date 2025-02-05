import React from "react";
import "./Pedido.css";
import imagePedido from '../../assets/icon/conf-pedido.jpg'

const Pedido = () => {
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
                <input type="radio" name="entrega" value="retiro" />
                Retiro en tienda
              </label>
              <label className="radio-label">
                <input type="radio" name="entrega" value="envio" defaultChecked />
                Envío a domicilio
              </label>
              <select className="select-input">
                <option value="">Seleccione una opción</option>
                <option value="test1">Opción 1</option>
                <option value="test2">Opción 2</option>
              </select>
            </div>
          </section>

          {/* Sección 3: Tus datos */}
          <section className="pedido-section">
            <h2 className="section-title">3. Tus datos</h2>
            <label className="input-label">Nombre completo</label>
            <input type="text" placeholder="Nombre de quien recibe" className="input-field" />
            <label className="input-label">Dirección</label>
            <input type="text" placeholder="Dirección de entrega" className="input-field" />
            <label className="input-label">Departamento</label>
            <input type="text" placeholder="Departamento" className="input-field" />
            <label className="input-label">Teléfono</label>
            <input type="text" placeholder="Número de contacto" className="input-field" />
            <label className="input-label">Comentario</label>
            <input type="text" placeholder="Comentarios adicionales" className="input-field" />
          </section>

          {/* Sección 4: Medio de pago */}
          <section className="pedido-section forma-pago">
            <h2 className="section-title">Medio de pago</h2>
            <div className="pago-options">
              <span className="pago-option">Efectivo</span>
              <span className="pago-option">Transferencia</span>
            </div>
          </section>

          {/* Sección 5: Resumen del pedido */}
          <section className="pedido-section resumen">
            <h2 className="section-title">Resumen del pedido</h2>
            <div className="resumen-item">
              <span>Total pedido</span>
              <span>$100.00</span>
            </div>
            <div className="resumen-item">
              <span>Envío</span>
              <span>$10.00</span>
            </div>
            <div className="resumen-item total">
              <span>Total a pagar</span>
              <span>$110.00</span>
            </div>
          </section>

          {/* Botón de enviar pedido */}
          <button className="pedido-btn">Enviar Pedido</button>
        </div>
      </div>
    </div>
  );
};

export default Pedido;