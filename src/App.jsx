//Imports de hooks
import React from "react";

import {BrowserRouter, Routes, Route} from "react-router-dom"

//Imports de estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

//Imports de componentes
import NavbarMenu from "./components/Navbar/Navbar"
import ItemListContainer from "./components/ItemListContainer/ItemListContainer"
import Error from './components/Error/Error'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import ContactUs from "./components/ContactUs/ContactUs";
import Gifs from "./components/Gifs/Gifs";
import Cart from "./components/Cart/Cart";
import { CartProvider } from "./context/CartContext";
import CheckOut from "./components/CheckOut/CheckOut";

// Loader para migrar productos a Firestore
// import Loader from "./components/Loader/Loader";

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
      'name': 'Cart',
      'link': '/cart',
      'title':  'Watch your products'
    },
    {
      'name': 'Proyect`s Gifs',
      'link': '/gifs',
      'title':  'Display gifs'
    }
  ]

  

  const greeting = "Wellcome to eStore"

  return (
    <>
    <BrowserRouter>
      <CartProvider>
        <NavbarMenu links={menu}/>
          <div className="body-container">
            <Routes>
              <Route path='/' element={<ItemListContainer mensaje={greeting}/>}/>
              <Route path='/category/:id' element={<ItemListContainer mensaje={greeting}/>} />
              <Route path='/item/:id' element={<ItemDetailContainer/>} />
              <Route path='/cart' element={<Cart/>} />
              <Route path='/contactus' element={<ContactUs/>} />
              <Route path='/gifs' element={<Gifs/>} />
              <Route path='/checkout' element={<CheckOut checkOut={true}/>} />
              {/* <Route path='/loader' element={<Loader/>} />  */}
              <Route path="*" element={<Error/>}/>
            </Routes>
          </div>
      </CartProvider>
    </BrowserRouter>
    </>
  )
}

export default App
