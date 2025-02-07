import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para manejar la navegación
import icoCarrito from '../../assets/icon/anadir-carrito.png';
import { CartContext } from "../../context/cartContext";
import "./CardItemDetail.css";

const CardItemDetail = ({ item, image }) => {
  
  const { carrito, AgregarAlCarrito } = useContext(CartContext);
  const [cantidad, setCantidad] = useState(1);
  const navigate = useNavigate(); // Hook para navegar



  const aumentar = () => {
    cantidad < item.stock && setCantidad(cantidad + 1);
  };

  const disminuir = () => setCantidad(cantidad > 1 ? cantidad - 1 : 1);

  const styles = {
    button: {
      width: "15%",
      marginTop: "0",
    },
    carrito: {
      width: "4rem",
      marginLeft: "5rem",
    },
  };

  return (
    <div className="card-detail-container">
      {/* Botón flotante para volver atrás */}
      <button className="floating-back-button" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <div className="card-detail">
        <img
          src={image || "default.jpg"}
          alt={item?.titulo || "Imagen del producto"}
          className="card-image-detail"
        />
        <div className="card-content-detail">
          <h1 className="card-title-detail">{item?.titulo || "Sin título"}</h1>
          <h3 className="card-subtitle-detail">{item?.detalle2 || "Sin detalles"}</h3>
          <p className="card-type-detail">
            <strong>Neto:</strong> {item?.tipo || "Tipo no disponible"}
          </p>
          <p className="card-price-detail">
            <strong>Precio:</strong> ${item?.precio ?? "0.00"}
          </p>
          <p className="card-stock-detail">
            <strong>Stock:</strong> {item?.stock ?? "No disponible"}
          </p>

          <div className="card-quantity-detail">
            <button className="card-button" style={styles.button} onClick={disminuir}>
              -
            </button>
            <input type="text" value={cantidad} readOnly className="quantity-input-detail" />
            <button className="card-button" style={styles.button} onClick={aumentar}>
              +
            </button>
            <button
              onClick={() => AgregarAlCarrito(item, cantidad)}
              style={styles.carrito}
              className="card-button"
            >
              <img src={icoCarrito} alt="carrito-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardItemDetail;