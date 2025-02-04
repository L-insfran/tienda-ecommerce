import { useNavigate } from "react-router-dom";

import "./CardItem.css";

const CardItem=({item, imageSrc })=>{

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/item/${item.id}`);
  };


  return (
    <div className="card">
    
      <img className="card-image" src={imageSrc} alt="Imagen estatica" />
      <div className="card-header">
        <h2>{item.titulo}</h2>
      </div>
      <div className="card-content">
        <h3>{item.detalle}</h3>
        <br />
        <p>Neto: {item.tipo}</p>
        <button onClick={handleClick} className="card-button">Ver Más</button>
      </div>
      
    </div>
  )
}


export default CardItem