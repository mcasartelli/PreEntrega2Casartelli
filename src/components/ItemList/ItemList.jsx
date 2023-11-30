import React, {useEffect, useState} from 'react';
import Item from '../Item/Item';
import Loading from '../Loading/Loading';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';

//Imports de Firebase
import {getFirestore, collection, getDocs, query, where} from 'firebase/firestore'

const ItemList = () => {
    //Productos
    const [products, setProducts] = useState([])
    const {id} = useParams(null)
    const [loading, setLoading] = useState(true)


    useEffect(()=>{
        const db = getFirestore()

        const prod = id ?
            query(
                collection(db,'products'),
                where('category', '==', id)
            )
            :
            collection(db,'products')
        
        getDocs(prod).then((snapshot) => {
            setProducts(snapshot.docs.map((doc)=>(
                {id: doc.id, ...doc.data()}
            )))
        })
        .catch((error)=>{
            console.log(error)
        })
        .finally(()=>{
            setLoading(false)
        })

    },[id])
    

    /////// alternativa con promesas
    // useEffect( () => {
    //     setLoading(true)
    //     fetch(id==null ? "https://fakestoreapi.com/products" : `https://fakestoreapi.com/products/category/${id}`)
    //     .then(res => res.json())
    //     .then(json => setProducts(json))
    //     .catch((error) =>{
    //         alert(error)
    //     })
    //     .finally(()=>setLoading(false))
    // }, [id]
    // )

    // //Agregar stock a los objetos del array Sacar con Firebase
    // products.forEach((prod) =>
    // prod['stock'] = Math.floor(Math.random() * 10)
    // )
    
    return (
        <>
            <Container>
                <Row>
                    
                    {
                    loading ? 
                        <Loading/>
                    :
                        products.map((product, key) => 
                        <Col key={key}>
                            <Item key={product.id} product={product}/>
                        </Col>
                        
                        )
                    }
                </Row>
            </Container>
            
        </>
    );
};

export default ItemList;