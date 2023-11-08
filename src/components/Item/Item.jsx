import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount';

import './item.css'

const Item = ({product, onAdd, setProductId}) => {
    const [prodId, setProdId] = useState(product.id)
    //setProdId(product.id)
    function truncate(str, n){
        return (str.length > n) ? str.slice(0, n-1) + '...' : str;
      }
      
      let onclick = () => {
        setProductId(prodId)
      }

    
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

export default Item;