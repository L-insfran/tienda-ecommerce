import destino from "../data/destinos.json"
import prod from "../data/productos.json"

export const pedirProductos=()=>{

  return new Promise((resolve,reject)=>{
    resolve(prod)
  })
}

export const pedirItemPorId=(id)=>{

  return new Promise((resolve, reject)=>{
    const item =prod.find ((el)=> el.id === id)

    if(item){
      resolve(item)
    }else{
      reject({
        error: "No se encontro el roducto"
      })
    }
    
  })
}

export const pedirdDestino=()=>{

  return new Promise((resolve,reject)=>{
    resolve(destino)
  })
}