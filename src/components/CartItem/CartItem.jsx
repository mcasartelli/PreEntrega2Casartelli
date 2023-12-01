import React, {useContext} from 'react';

import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import './cartItem.css'
import { CartContext } from '../../context/CartContext';

const CartItem = ({product, checkOut}) => {
    const {removeItem, incrementProduct, decrementProduct} = useContext(CartContext)
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
            <Col  md={2}>
                <div className="counterDiv">
                    {
                        !checkOut &&
                        (
                            <Button className='counter' variant="secondary" size="sm" onClick={()=>decrementProduct(product.id)}>-</Button>
                        )
                    }
                    
                    <p className='counter cant'>{product.cant}</p>

                    {
                        !checkOut &&
                        (
                            <Button className='counter' variant="secondary" size="sm" onClick={()=>incrementProduct(product.id)}>+</Button>
                        )
                    }     
                </div> 
            </Col>
            <Col md={1} style={{textAlign: 'right'}}>
            <p>{USDollar.format(product.price)}</p>
            </Col>
            <Col md={1} style={{textAlign: 'right'}}>
            <p>{USDollar.format(product.cant * product.price)}</p>
            </Col>
            {!checkOut&&
                <>
                <Col md={2}>
                    <Button variant="secondary" size="sm" onClick={()=>removeItem(product.id)}>Delete item</Button>
                </Col>
                </>
            }            
        </Row>
            
        </>
    );
};

export default CartItem;