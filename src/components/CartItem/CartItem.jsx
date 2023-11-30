import React, {useContext} from 'react';

import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import './cartItem.css'
import { CartContext } from '../../context/CartContext';

const CartItem = ({product, checkOut}) => {
    const {removeItem} = useContext(CartContext)
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return (
        <>
        <Row>
            <Col md={1}>
                <Image className='cartItemImg' src={product.image} roundedCircle />
            </Col>
            <Col md={5}>
                <p>{product.title}</p>
            </Col>
            <Col  md={1}>
                <p>{product.cant}</p>
            </Col>
            <Col md={2}>
            <p>{USDollar.format(product.cant * product.price)}</p>
            </Col>
            {!checkOut&&
                <>
                <Col md={3}>
                    <Button variant="secondary" onClick={()=>removeItem(product.id)}>Delete item</Button>
                </Col>
                </>
            }
            
        </Row>
            
        </>
    );
};

export default CartItem;