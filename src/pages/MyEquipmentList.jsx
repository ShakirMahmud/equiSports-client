import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { AuthContext } from '../provider/AuthProvider';
import { useLoaderData } from 'react-router-dom';

const MyEquipmentList = () => {
    const allProducts = useLoaderData() || [];
    const { user } = useContext(AuthContext);
    const [ addByThisUser, setAddByThisUser ] = useState([]);
    // console.log(allProducts.userEmail)
    const matchByEmail = allProducts.filter(product => product.userEmail === user?.email);
    console.log(matchByEmail)
    useEffect(() => {
        setAddByThisUser(matchByEmail);
    }, []);
    return (
        <div>
            <NavBar/>
            <h2>My Equipment List {addByThisUser.length}</h2>
        </div>
    );
};

export default MyEquipmentList;