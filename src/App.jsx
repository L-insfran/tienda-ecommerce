import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CardItemDetailContainer from './components/cardItemDetailContainer'
import CardListContainer from './components/cardListContainer'
import Carrito from './components/carrito'
import Pedido from './components/confirmacion'
import Footer from './components/footer'
import Navbar from './components/navbar'
import { CartProvider } from './context/cartContext'
import './main.css'

function App() {

  


  return (
    <div>
      <CartProvider>
        <BrowserRouter>
      
          <Navbar  />

        
          <Routes>
            <Route path="/" element={<CardListContainer />} />
            <Route path="/item/:id" element={ <CardItemDetailContainer />} />
            <Route path="/carrito" element={ <Carrito />} />
            <Route path="/confirmar" element={ <Pedido />} />

          </Routes>  
      
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </div>
  
  )
}

export default App
