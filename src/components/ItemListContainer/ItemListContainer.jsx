import React from "react";

import "./itemListContainer.css"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ItemList from "../ItemList/ItemList";


const ItemListContainer = ({mensaje, onAdd, setProductId}) => {


    return(
        <>
            <h1>{mensaje}</h1>
            
            <div className='productsContainer'>
                <Container>
                    <Row>
                        <ItemList onAdd={onAdd} setProductId={setProductId}/>
                    </Row>
                </Container>
            </div>
            
        </>
    )
}

export default ItemListContainer;