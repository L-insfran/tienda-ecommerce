import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { pedirItemPorId } from "../../helper/pedirDatos"
import { selectedImage } from "../../helper/searchImage"
import CardItemDetail from "../cardItemDetail"

const CardItemDetailContainer =() =>{

  const [item, setItem]= useState(null)
  const [srcImg, setSrcImg] = useState(null)
  const [error, setError] = useState(null)
  const {id} = useParams()

  
  useEffect(() => {
    pedirItemPorId(id)
      .then((res) => {
        if (res) {
          setItem(res);
          setSrcImg(selectedImage(res.tipo)); // Manejo de imagen
        } else {
          setError("Producto no encontrado");
        }
      })
      .catch((err) => {
        console.error("Error al obtener el producto:", err);
        setError("Error al cargar el producto");
      });
  }, [id]);

  

  return (
    <div>
      {error ? <p>{error}</p> : item ? <CardItemDetail item={item} image={srcImg} /> : <p>Cargando...</p>}
    </div>
  )
}

export default CardItemDetailContainer