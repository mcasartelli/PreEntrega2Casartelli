import React from 'react';

import ItemCount from '../ItemCount/ItemCount';

import { useState } from 'react';

import Card from 'react-bootstrap/Card';

const ItemDetail = ({product, onAdd}) => {
    
    
    return (
        <>
            <Card className='card' style={{ width: '100%' }}>
                <Card.Img className="productImg" variant="top" src={product.image} />
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                    {product.description}
                    </Card.Text>
                    <p>$ {product.price} - Stock: {product.stock}</p>
                    {
                        product.stock!=0 ? 
                        <ItemCount product={product} onAdd={onAdd}/> :
                        <p>Sin Stock</p>
                    }
                </Card.Body>
            </Card>
        </>
    );
};

export default ItemDetail;