import React from 'react';
import { BsCart3 } from "react-icons/bs";
import Badge from 'react-bootstrap/Badge';

const CartWidget = ({cartQuantity}) => {
    return (
        <div>
            <BsCart3/> <Badge bg="secondary">{cartQuantity}</Badge>
        </div>
    );
};

export default CartWidget;