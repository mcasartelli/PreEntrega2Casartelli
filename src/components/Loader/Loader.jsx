import React from 'react';
import { getFirestore, addDoc, collection } from 'firebase/firestore';

import x from './productos.json'
const Loader = () => {

    ///CARGAR PRODUCTOS A FIRESTORE

    //console.log(x)
    // const db = getFirestore()
    // x.forEach((e)=>{
    //     console.log(e)
    //     addDoc(collection(db, "products"), e)
    //     .then((docRef) => {
    //         console.log('exito ' + e.id)
    //     })
    //     .catch((e)=>{console.log('ERROR '+ e)})
        
    // })

    return (
        <>
            <p>Agregando productos...</p>
        </>
    );
};

export default Loader;