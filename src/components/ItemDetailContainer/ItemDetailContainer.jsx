import React, {useState, useEffect} from 'react';
import ItemDetail from '../ItemDetail/ItemDetail';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';


const ItemDetailContainer = ({onAdd}) => {
    const [product, setProduct] = useState(null)
    const {id} = useParams(null)

    useEffect( () => {
        fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(json => setProduct(json))
        .catch((error) =>{
          alert(error)
        })
      }, [id]
      )
      
      //Sacar cuando usemos Firebase
      if(product!==null){
        product['stock'] = Math.floor(Math.random() * 10)
      }
          

    return (
        <>
            {product == null ? 
            <Loading/> : 
            <div className='productsContainer'>
                <Container>
                    <Row>
                        <Col></Col>
                        <Col>
                        <ItemDetail product={product} onAdd={onAdd}/>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
            
            }
        </>
    );
};

export default ItemDetailContainer;