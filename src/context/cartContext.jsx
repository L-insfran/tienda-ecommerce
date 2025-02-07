import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const carritoInicial = JSON.parse(localStorage.getItem("carrito") || "[]")

export const CartProvider = ({children}) => {

  const [carrito, setCarrito] = useState(carritoInicial);

  const AgregarAlCarrito = (item, cantidad) => {
    const itemAgregado = { ...item, cantidad };
    const nuevoCarrito = [...carrito];
    const estaEnElCarrito = nuevoCarrito.find(
      (producto) => producto.id === itemAgregado.id
    );

    if (estaEnElCarrito) {
      estaEnElCarrito.cantidad += cantidad;
    } else {
      nuevoCarrito.push(itemAgregado);
    }

    setCarrito(nuevoCarrito);
  };
  const eliminarDelCarrito = (itemId)=>{
    const actualizarCarrito = carrito.filter((prod) => prod.id !== itemId)
    setCarrito(actualizarCarrito)
  }
  const vaciarCarrito = () => {
    setCarrito([]);
  };
  const cantidadEnCarrito = () => {
    return carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
  };
  const valorTotalEnCarrito = () => {
    return carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0);
  };
  const aumentarCantidad = (itemId) => {
    const actualizarCarrito = [...carrito];
    const itemactualizado = actualizarCarrito.find((prod) => prod.id === itemId);

    itemactualizado.stock >itemactualizado.cantidad ?
    itemactualizado.cantidad += 1:'' ;
    
    setCarrito(actualizarCarrito);
  };
  const disminuirCantidad = (itemId) => {
    const actualizarCarrito = [...carrito];
    const itemactualizado = actualizarCarrito.find((prod) => prod.id == itemId);

    itemactualizado.cantidad > 1?
    itemactualizado.cantidad -= 1 : 1;
    setCarrito(actualizarCarrito);
  };

  useEffect(()=>{
    localStorage.setItem("carrito", JSON.stringify(carrito))
  },[carrito])

  return (
    <CartContext.Provider
      value={{
        carrito,
        AgregarAlCarrito,
        cantidadEnCarrito,
        valorTotalEnCarrito,
        aumentarCantidad,
        disminuirCantidad,
        vaciarCarrito,
        eliminarDelCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
