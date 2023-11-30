import React, {useState, useEffect} from 'react';
import ItemDetail from '../ItemDetail/ItemDetail';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

//Imports de Firebase
import {getFirestore, getDoc, doc} from 'firebase/firestore'


const ItemDetailContainer = ({onAdd}) => {
    const [product, setProduct] = useState(null)
    const {id} = useParams(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const db = getFirestore()

        const prod = doc(db, 'products', id)

        getDoc(prod)
        .then(res =>{
            const data = res.data()
            const newProd = {id: res.id, ...data}
            setProduct(newProd)
        })        
        .catch((error)=>{
            console.log(error)
        })
        .finally(()=>{
            setLoading(false)
        })

    },[id])

    return (
        <>
            {loading ? 
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