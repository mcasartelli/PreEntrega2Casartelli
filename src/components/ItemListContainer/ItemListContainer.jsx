import React from "react";

import "./itemListContainer.css"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ItemList from "../ItemList/ItemList";


const ItemListContainer = ({mensaje}) => {


    return(
        <>
            <h1>{mensaje}</h1>
            
            <div className='productsContainer'>
                <Container>
                    <Row>
                        <ItemList/>
                    </Row>
                </Container>
            </div>
            
        </>
    )
}

export default ItemListContainer;