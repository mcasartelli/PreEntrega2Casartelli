import React, {useEffect, useState} from 'react';
import Item from '../Item/Item';
import Loading from '../Loading/Loading';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';

const ItemList = ({onAdd, setProductId}) => {
    //Productos
    const [products, setProducts] = useState([])
    const {id} = useParams(null)
  
    useEffect( () => {
      fetch(id==null ? "https://fakestoreapi.com/products" : `https://fakestoreapi.com/products/category/${id}`)
      .then(res => res.json())
      .then(json => setProducts(json))
      .catch((error) =>{
        alert(error)
      })
    }, [id]
    )
    

    //Agregar stock a los objetos del array Sacar con Firebase
    products.forEach((prod) =>
    prod['stock'] = Math.floor(Math.random() * 10)
    )
    
    return (
        <>
            <Container>
                <Row>
                    
                    {
                    products.length == 0 ? 
                        <Loading/>
                    :
                        products.map((product, key) => 
                        <Col key={key}>
                            <Item key={product.id} product={product} onAdd={onAdd} setProductId={setProductId}/>
                        </Col>
                        
                        )
                    }
                </Row>
            </Container>
            
        </>
    );
};

export default ItemList;