import React, {useContext} from 'react';
import { CartContext } from '../../context/CartContext';
import CartItem from '../CartItem/CartItem';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const Cart = ({checkOut}) => {
    const {cart} = useContext(CartContext)
    const {getTotalAmount} = useContext(CartContext)
    const {clearCart} = useContext(CartContext)
    const {getTotalItems} = useContext(CartContext)
    
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return (
        <div>
            <h1>Cart</h1>
            <Container>
                
                {
                cart.length > 0 ?
                
                cart.map( (c) => 
                    <CartItem key={c.id} product={c} checkOut={checkOut}/>
                )
                
                :
                    <h1>No products in cart</h1>
                }
                <h2>Total: {USDollar.format(getTotalAmount())} / Items: {getTotalItems()}</h2>
                {
                    
                !checkOut &&
                    <>
                    <Button variant="danger" onClick={()=>clearCart()}>Clear Cart</Button>
                    <Button as={Link} to='/'>Check other products</Button>
                    <Button as={Link} to='/CheckOut'>Check Out</Button>
                    </>
                }
                
            </Container>
        </div>
    );
};

export default Cart;