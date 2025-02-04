import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CardItemDetailContainer from './components/cardItemDetailContainer'
import CardListContainer from './components/cardListContainer'
// import Contacto from './components/contacto/Contacto'
import { useState } from 'react'
import CardWidget from './components/cardwidget/CardWidge'
import Footer from './components/footer'
import Navbar from './components/navbar'
import { CartContext } from './context/cartContext'
import './main.css'

function App() {
  
  const [carrito, setCarrito] = useState([])

    const AgregarAlCarrito=(item, cantidad)=>{

    const itemAgregado = {...item, cantidad}

    const nuevoCarrito = [...carrito]
    const estaEnElCarrito = nuevoCarrito.find((producto)=>producto.id === itemAgregado.id)



    if(estaEnElCarrito){
      estaEnElCarrito.cantidad += cantidad
    }else{
      nuevoCarrito.push(itemAgregado)
    }
    
    setCarrito(nuevoCarrito)
  }

  return (
    <div>
      <CartContext.Provider value={{carrito, AgregarAlCarrito}}>
        <BrowserRouter>
          <Navbar  />


          <Routes>
            <Route path="/" element={<CardListContainer />} />

            <Route path="/item/:id" element={ <CardItemDetailContainer />} />
            <Route path="/carrito" element={ <CardWidget />} />
          
          </Routes>  

          {/* <Contacto /> */}
          <Footer />
        </BrowserRouter>
      </CartContext.Provider>
    </div>
  
  )
}

export default App
