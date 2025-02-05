import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import './Carrito.css';

const Carrito = () => {
  const { carrito, valorTotalEnCarrito, aumentarCantidad, disminuirCantidad, vaciarCarrito } = useContext(CartContext);
  const navigate = useNavigate();

    const handleClick = () => {
    navigate(`/confirmar`);
  };

  return (
    <div className="carrito-page">
      {/* Encabezado de la página */}
      <div className="carrito-header">
        <div className="header-left">
          <h1>Mi Pedido</h1>
          <span>Total</span>
        </div>
        <div className="header-right">$ {valorTotalEnCarrito()}</div>
      </div>

      {/* Botón para vaciar el carrito */}
      <div className="carrito-actions">
        {carrito.length > 0 &&
        <button className="clear-button" onClick={vaciarCarrito}>
          Vaciar Carrito
        </button>
        }
      </div>

      {/* Lista de productos en el carrito */}
      <div className="carrito-description">
        {carrito.map((prod) => (
          <div key={prod.id} className="product-item">
            <h4>{prod.detalle}</h4>
            <h4>Neto: {prod.tipo}</h4>
            <div className="quantity-controls">
              <button onClick={() => disminuirCantidad(prod.id)}>-</button>
              <span>{prod.cantidad}</span>
              <button onClick={() => aumentarCantidad(prod.id)}>+</button>
            </div>
            <span style={{ color: "red" }}>${prod.cantidad * prod.precio}</span>
            <hr />
          </div>
        ))}
      </div>
       {/* Botón "Realizar pedido" */}
      {valorTotalEnCarrito()>0 &&
      <button
        className="confirmar-pedido-button"
        onClick={handleClick}
      >
        pedido <span className="confirmar-pedido-span">${valorTotalEnCarrito()}</span>
      </button>
      }
    </div>
  );
};

export default Carrito;