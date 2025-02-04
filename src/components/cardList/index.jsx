import { selectedImage } from "../../helper/searchImage";
import CardItem from "../cardItem";
import "./CardList.css";


const CardList = ({ productos }) => {

  return (
    <div>
      <div className="container">
        <div className="container-section">
          {productos.map((prod) => (
            <CardItem 
              item={prod} 
              key={prod.id} 
               imageSrc={selectedImage(prod.tipo)} // Pasamos la imagen seleccionada como prop
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardList;
