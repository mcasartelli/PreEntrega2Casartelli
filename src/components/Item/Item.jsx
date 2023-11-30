import React, {useState, useContext} from 'react';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount';
import { CartContext } from '../../context/CartContext';
import { Button } from 'react-bootstrap';

import './item.css'

const Item = ({product}) => {
    const [quantity, setQuantity] = useState(0)
    const {addToCart} = useContext(CartContext)

    function truncate(str, n){
        return (str.length > n) ? str.slice(0, n-1) + '...' : str;
      }
      
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
             <Card className='card'  style={{ width: '18rem' }}>
                {<Link to={`/item/${product.id}`}>
                    <Card.Img className="productImg" variant="top" src={product.image}/>
                </Link>}
                
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                    {truncate(product.description, 100)}
                    </Card.Text>
                    <Button  variant="secondary" as={Link} to={`/item/${product.id}`}>View more details</Button>
                    <p>{USDollar.format(product.price)} - Stock: {product.stock}</p>
                    {
                        quantity == 0  ?
                            product.stock!=0 ? 
                            <ItemCount init={1} stock={product.stock} onAdd={onAdd}/> :
                            <p>No Stock</p>
                        :
                        <Button as={Link} to={'/cart'}>View cart</Button>
                        
                    }
                    
                </Card.Body>
            </Card>
        </>
    );
};

export default Item;