import React, { useContext } from 'react';
import ItemCount from '../ItemCount/ItemCount';
import { CartContext } from '../../context/CartContext';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom'
import { Button } from 'react-bootstrap';

const ItemDetail = ({product}) => {
    //Carrito de compras
    const [quantity, setQuantity] = useState(0)
    const {addToCart} = useContext(CartContext)


    let onAdd = (cant) => {
        addToCart(product, cant)
        setQuantity(cant)
    }

    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    
    return (
        <>
            <Card className='card' style={{ width: '100%' }}>
                <Card.Img className="productImg" variant="top" src={product.image} />
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                    {product.description}
                    </Card.Text>
                    <p>{USDollar.format(product.price)} - Stock: {product.stock}</p>
                    {
                        quantity == 0 ?
                            product.stock!=0 ? 
                            <ItemCount init={1} stock={product.stock} onAdd={onAdd}/> 
                            :
                            <p>Sin Stock</p>
                        :
                        <Button as={Link}  to={'/Cart'}>View cart</Button>
                    }
                </Card.Body>
            </Card>
        </>
    );
};

export default ItemDetail;