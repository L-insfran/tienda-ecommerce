import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { pedirItemPorId } from "../../helper/pedirDatos"
import { selectedImage } from "../../helper/searchImage"
import CardItemDetail from "../cardItemDetail"


const CardItemDetailContainer =() =>{

  const [item, setItem]= useState(null)
  const [srcImg, setSrcImg] = useState(null)
  const id = useParams().id

  useEffect(()=>{
    pedirItemPorId(Number(id))
    .then((res)=>{
      setItem(res)
      setSrcImg(selectedImage(res.tipo))
    })

  },[id])
  

  return (
    <div>
      {item &&  <  CardItemDetail item={item} image={srcImg} />}
    </div>
  )
}

export default CardItemDetailContainer