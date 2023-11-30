import React, {useState, createContext} from 'react';

export const CartContext = createContext()

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([])

    const addToCart =  (product, cant) => {
        if(!isInCart(product.id)){
            setCart((prev) => [...prev,{...product, cant}])
        }else{
            const newCart = cart.map(prod => {
                if(prod.id == product.id){
                    return {...prod, cant: prod.cant+cant}
                }else{
                    return prod
                }
            })
            setCart(newCart)
        }
    }

    const incrementProduct = (id) => {
        if(isInCart) {
            const newCart = cart.map(prod =>{
                if(prod.id === id && prod.stock > prod.cant){
                    return {...prod, cant: prod.cant + 1}
                }
                else{
                    return prod
                }
            })
            setCart(newCart)
        }
    }

    const decrementProduct = (id) => {
        if(isInCart) {
            const newCart = cart.map(prod =>{
                if(prod.id === id && prod.cant > 1){
                    return {...prod, cant: prod.cant - 1}
                }
                else{
                    return prod
                }
            })
            setCart(newCart)
        }
    }

    const isInCart = (itemId) => {
        if(cart.length > 0){
            return cart.some((i) => i.id === itemId)
        }else{
            return false
        }

    }

    const getTotalItems = () => {
        let x = 0
        x = cart.reduce( (accumulator, currentValue) => accumulator + currentValue.cant, 0 )
        return x
    }

    const getTotalAmount = () => {
        let total = 0
        total = cart.reduce( (accumulator, currentValue) => accumulator + (currentValue.price * currentValue.cant), 0 )
        return total
    }

    const removeItem = (id) => {
        const nuevoArr = cart.filter( c => c.id !== id)
        setCart(nuevoArr)
    }

    const clearCart = () => {
        setCart([])
    }

    return (
        <CartContext.Provider value={
            {
                addToCart,
                isInCart,
                getTotalItems,
                removeItem,
                clearCart,
                cart,
                setCart,
                getTotalAmount,
                incrementProduct,
                decrementProduct
            }
        }>
        {children}
        </CartContext.Provider>
    )
}


