import React, {useState, useContext} from 'react';
import {collection, addDoc, updateDoc, getDoc, getFirestore, doc} from 'firebase/firestore'
import { CartContext } from '../../context/CartContext';

import { useForm } from "react-hook-form"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cart from '../Cart/Cart';
import {Link} from 'react-router-dom';

import Loading from '../Loading/Loading'

import './checkOut.css'

const CheckOut = ({checkOut}) => {
    const [orderId, setOrderId] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [finished, setFinished] = useState(false)

    const { 
        register,
        formState: { errors },
        handleSubmit,
        getValues
    } = useForm()

    const {cart, getTotalAmount, clearCart} = useContext(CartContext)

    const onSubmit = (data) => {
        setLoading(true)
        setFinished(true)
        const db = getFirestore()
        const order = {
            buyer: data,
            items: cart.map((prod)=>({
                id: prod.id,
                name: prod.title,
                quantity: prod.cant
            })),
            date: new Date(),
            total: getTotalAmount()
        }    
        
        Promise.all(
            order.items.map(async (productOrder) => {
                const prodRef = doc(db, 'products', productOrder.id)
                const productDoc = await getDoc(prodRef)
                const actualStock = productDoc.data().stock
                
                await updateDoc(prodRef, {
                    stock: actualStock - productOrder.quantity
                })
            })
        )
        .then(()=>{
            
            addDoc(collection(db, 'orders'), order)
            .then((docRef) => {
                setOrderId(docRef.id)
                clearCart()
            })
            .catch(()=>{
                setError('Error sending the order')
                setFinished(false)
            })
        })
        .catch(() => {
            setError('Can not update stock, try again')
            setFinished(false)
        })
        .finally(()=> setLoading(false))

    }


    return (
        <>
        {loading && <Loading/>}
        <Container>
            <Row>
                <Col><h2>Check Out</h2></Col>
            </Row>

            {!finished  &&
            <>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="First Name" 
                            {...register("name", { required: true, maxLength: 20 })} />
                            {errors.name && <span>This field is required</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Last Name" {...register("lastName", { required: true, maxLength: 20  })} />
                            {errors.lastName && <span>This field is required</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" {...register("email", { required: true })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="emailConfirmation">
                            <Form.Label>Email address confirmation</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" {...register("emailConfirmation", 
                            { 
                                required: true,
                                validate: (fieldValue) => {
                                    return fieldValue === getValues('email')
                                }
                            })} />
                            {errors.emailConfirmation && <span>Emails must be the same</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" placeholder="54 9 ..." {...register("phone", 
                            { 
                                required: true, 
                                maxLength: 20,
                                pattern: /^[0-9]+$/i
                            })} />
                            {errors.phone && <span>This field is required and allow only numbers</span>}
                        </Form.Group>
                        <Button type="submit">Order Now</Button>
                    </Form>
                    {error && <p style={{color: 'red'}}> {error} </p>}
                </Col>
                <Col>
                    <Cart checkOut={checkOut}/>
                </Col>
            </Row>
            </>
            }

            {orderId && (
                <>
                <Row>
                    <Col>
                        <h2>Thank you for your purchase!</h2>
                        <p> Your order number is: <b>{orderId}</b></p>
                        <Button as={Link} to={'/'}>Go home</Button>
                    </Col>
                </Row>
                </>
            )}

        </Container>
        </>
    );
};

export default CheckOut;