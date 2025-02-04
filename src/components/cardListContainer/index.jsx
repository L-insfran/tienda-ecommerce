import { useEffect, useState } from 'react';
import { pedirProductos } from '../../helper/pedirDatos';
import CardList from '../cardList';
import './CardListContainer.css';



const CardListContainer = () => {
  
  const [productos, SetProductos] = useState([])
  // const [destino, SetDestino] = useState([])

  useEffect(()=>{
    pedirProductos()
      .then((resp)=>{
        SetProductos(resp)
      })
  },[])

  // useEffect(()=>{
  //   pedirdDestino()
  //     .then((resp)=>{
  //     SetDestino(resp)
  //     })
  // },[])

  return (
    <div >
        <h2 className="H2">Productos</h2>

        <CardList productos={productos} />

    </div>
  );
};

export default CardListContainer;