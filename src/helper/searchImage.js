import kl from "../assets/image/miel-320x180.jpg";
import mk250 from "../assets/image/mk250.png";
import mk500 from "../assets/image/mk500.png";




export const selectedImage = (tipo) => {
  if (tipo === "250gr") return mk250;
  if (tipo === "500gr") return mk500;
  if (tipo === "1 kl") return kl;
  return null; // Para evitar errores si no coincide ningún tipo
};