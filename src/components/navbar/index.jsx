import { Link } from 'react-router-dom';
import carrito from '../../assets/image/carrito.JPG';
import logo from '../../assets/image/logo.JPG';
import './Navbar.css';

const Navbar = () => {

  const handleClick=()=>{
    console.log('ir Al carrito') 
  }

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
              alt="carrito" onClick={handleClick} />
            </Link>
            <span className='cart-count'>2</span>
          </div>
      
    </nav>
  );
};

export default Navbar;
