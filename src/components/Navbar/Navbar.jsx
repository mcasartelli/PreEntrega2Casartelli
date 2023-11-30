import React, {useContext} from "react";
import "./navbar.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CartWidget from "../CartWidget/CartWidget";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import Loading from "../Loading/Loading";

const NavbarMenu = ({links}) => {
    const [categories, setCategories] = useState(null)
    const {getTotalItems} = useContext(CartContext)
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        setLoading(true)
        fetch("https://fakestoreapi.com/products/categories")
        .then(res => res.json())
        .then(data => setCategories(data))
        .catch((error)=>{
            alert(error)
        })
        .finally(()=>setLoading(false))
    },[])
        const listItems = categories!=null && 
            links.map((link, key) => 
            
               link.name!='Categories' ?
                    (<Nav.Link key={key} as={NavLink} to={link.link} title={link.title}>{link.name}</Nav.Link>)
                :
                (
                    <NavDropdown key={key} title={link.name} id="basic-nav-dropdown">
                        {
                        loading ?
                        (<Loading/>)
                        :
                            (
                                categories.map((category, key1) =>
                                <NavDropdown.Item key={key1} as={NavLink} to={`/category/${category}`}>{category}</NavDropdown.Item>
                            )
                            )     
                        }
                    </NavDropdown>
                )
            )

    return(
        <>
            <Navbar expand="lg" className="bg-body-tertiary" fixed="top"> 
            <Container>
                <Navbar.Brand as={NavLink} to="/">React eStore</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav key={9999} className="me-auto">

                    {listItems}

                </Nav>
                {
                getTotalItems() > 0 ? 
                <Nav.Link as={NavLink} to={'/cart'}> <CartWidget/> </Nav.Link> : ''
                }
                
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </>
    )
}

export default NavbarMenu;