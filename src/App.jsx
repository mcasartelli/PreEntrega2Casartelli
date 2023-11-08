import {BrowserRouter, Routes, Route} from "react-router-dom"

//Imports de estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

//Imports de componentes
import NavbarMenu from "./components/Navbar/Navbar"
import ItemListContainer from "./components/ItemListContainer/ItemListContainer"
import Error from './components/Error/Error'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import ContactUs from "./components/ContactUs/Contactus";
import Gifs from "./components/Gifs/Gifs";

//Imports de hooks
import React, { useEffect, useState } from "react";


function App() {

  const menu = [
    {
      'name': 'Products',
      'link': '/',
      'title':  'Show all products'
    },
    {
      'name': 'Categories',
      'link': '/category/jewelery',
      'title':  'Seach by categories'
    },
    {
      'name': 'Contact us',
      'link': '/contactus',
      'title':  'Get in touch with us'
    },
    {
      'name': 'Proyect`s Gifs',
      'link': '/gifs',
      'title':  'Display gifs'
    }
  ]

  //Carrito de compras
  const [cartQuantity, setCartQuantity] = useState(0)

  // const [productId, setProductId] = useState(0)

  let onAdd = (cant) => {
    setCartQuantity(cartQuantity + cant)
  }

  const greeting = "Bienvenido a eStore"

  return (
    <>
  
    <BrowserRouter>
      <NavbarMenu links={menu} cartQuantity={cartQuantity}/>
        <div className="body-container">
          <Routes>
            <Route path='/' element={<ItemListContainer mensaje={greeting} onAdd={onAdd} />} />
            <Route path='/category/:id' element={<ItemListContainer mensaje={greeting} onAdd={onAdd} />} />
            <Route path='/item/:id' element={<ItemDetailContainer onAdd={onAdd}/>} />
            <Route path='/contactus' element={<ContactUs/>} />
            <Route path='/gifs' element={<Gifs/>} />
            <Route path="*" element={<Error/>}/>
          </Routes>
        </div>
    </BrowserRouter>
    
    </>
  )
}

export default App
