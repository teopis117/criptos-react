import {useEffect} from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'
import {monedas} from '../data/monedas'
import { useState } from 'react'
import Error from './Error'



const InputSubmit= styled.input`
background-color:#9497FF;
border:none;
width:100%;
padding:10px;
font-weight:700;
text-transform:uppercase;
font-size:20px;
border-radius:5px;
color:white;
transition:background-color .3s ease;
margin-top:30px;

&:hover
{
    background-color:#7A7DFE;
    cursor:pointer;-
}

`


const Formulario = ({setMonedas}) => {

  const [criptos,setCriptos]=useState([])

  const [error,setError]=useState(false);
  

{/*me retorna por indice*/}
  const [moneda,SelectMonedas]=useSelectMonedas('Elige tu moneda',monedas);
  const [criptoMoneda,SelectCriptoMoneda]=useSelectMonedas('Elige tu cripto Moneda',criptos);

  useEffect(()=>
  {
  const consultarAPI= async ()=>
  {
    const url="https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"

    const respuesta= await fetch(url);

    const resultado= await respuesta.json();


    const arrayCriptos=resultado.Data.map(cripto=>{

      const objeto=
      {
        id:cripto.CoinInfo.Name,
        nombre:cripto.CoinInfo.FullName,
      }

     return objeto;
    })

    setCriptos(arrayCriptos);
  }

  consultarAPI();
  },[])

  const handleSubmit=e=>
  {
    e.preventDefault();
    if([moneda,criptoMoneda].includes(''))
    {
      setError(true);
      return;
    }

    setError(false);
    setMonedas({moneda,criptoMoneda})
  }

  return (
    <>
    
    {error && <Error>Todos los campos son obligatorios</Error>}
    <form action="" onSubmit={handleSubmit}>
      <SelectMonedas/>
      <SelectCriptoMoneda/>
      
        <InputSubmit type="submit" value="Cotizar" />
    </form>
    </>
  )
}

export default Formulario
