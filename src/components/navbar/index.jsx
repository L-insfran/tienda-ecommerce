import { useContext } from 'react';
import { Link } from 'react-router-dom';
import carrito from '../../assets/image/carrito.JPG';
import logo from '../../assets/image/logo.JPG';
import { CartContext } from '../../context/cartContext';
import './Navbar.css';

const Navbar = () => {

const { cantidadEnCarrito,  }=useContext(CartContext)

  return (
    <nav className='navbar'>
      <div className='logo-container'>
        <Link  to="/">
          <img  src={logo} alt="logo" />
        </Link>
      </div>
        <h2>La dulzura de la imperfección." 🍯✨</h2>

        
          <div className='container-cart-img'>
              <Link to="/carrito">
                <img className='cart-img' src={carrito} 
                alt="carrito" />
              </Link>
              
            <span className='cart-count'>{cantidadEnCarrito()}</span>
          </div>
        
    </nav>
  );
};

export default Navbar;
