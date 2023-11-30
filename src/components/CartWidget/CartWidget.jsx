import React, {useContext} from 'react';
import { BsCart3 } from "react-icons/bs";
import Badge from 'react-bootstrap/Badge';
import { CartContext } from '../../context/CartContext';

const CartWidget = ({cartQuantity}) => {
    const {getTotalItems} = useContext(CartContext)
    return (
        <div>
            <BsCart3/> <Badge bg="secondary">{getTotalItems()}</Badge>
        </div>
    );
};

export default CartWidget;