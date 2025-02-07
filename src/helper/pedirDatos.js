// import destino from "../data/destinos.json"
// import prod from "../data/productos.json";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/congif";


export const pedirProductos = () => {
  const productosRef = collection(db, "productos");

  return getDocs(productosRef)
    .then((resp) => {
      return resp.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
    })
    .catch((error) => {
      console.error("Error obteniendo productos:", error);
      throw error;
    });
};

export const pedirItemPorId = (id) => {
  const productoRef = doc(db, "productos", id);

  return getDoc(productoRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        return { ...docSnap.data(), id: docSnap.id };
      } else {
        throw new Error("No se encontró el producto");
      }
    })
    .catch((error) => {
      console.error("Error obteniendo producto:", error);
      throw error;
    });
};  

export const pedirdDestino=()=>{

    const productosRef = collection(db, "destinos");

  return getDocs(productosRef)
    .then((resp) => {
      return resp.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
    })
    .catch((error) => {
      console.error("Error obteniendo Destinos:", error);
      throw error;
    });
}