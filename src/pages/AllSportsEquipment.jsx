import React, { useEffect, useState } from 'react';
import { FaSortAmountDown, FaSortAmountDownAlt } from "react-icons/fa";
import { useLoaderData, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const AllSportsEquipment = () => {
    const loadedProducts = useLoaderData() || [];
    const [products, setProducts] = useState(loadedProducts);
    const [isSortedDesc, setIsSortedDesc] = useState(false);
    const navigate = useNavigate();
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        fetch('https://equi-sports-server-shakir.vercel.app/users')
            .then(res => res.json())
            .then(data => {
                setAllUsers(data);
            })
    }, []);



    // Handle the sorting logic
    const handleSort = async () => {
        try {
            const sortedProducts = isSortedDesc
                ? products.sort((a, b) => a.price - b.price)
                : products.sort((a, b) => b.price - a.price);
            setProducts(sortedProducts);
            setIsSortedDesc(!isSortedDesc);
        } catch (error) {
            console.error('Error sorting products:', error);
        }
    };

    return (
        <div>
            <div className='sticky top-0 z-50 backdrop-blur bg-white/80 transition-all duration-300'>
                <NavBar />
            </div>
            <div  className='w-11/12 mx-auto my-12'>
                <div className='flex justify-between'>
                <h2>Total Sports Equipment: {products.length}</h2>
                <button
                    onClick={handleSort}
                    className="btn btn-primary flex items-center gap-2 text-white text-xl"
                >
                    Sort by Price {!isSortedDesc ? <FaSortAmountDown /> : <FaSortAmountDownAlt />}
                </button>
                </div>

                {/* Display all equipment in a table format */}
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Added By</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-24 w-24">
                                                    <img src={product.image} alt={product.itemName} className='object-contain' />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{product.itemName}</div>
                                                <div className="text-sm opacity-50">Stock: {product.stockStatus}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {product.categoryName}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">{product.customization}</span>
                                    </td>
                                    <td>{product.price}$</td>
                                    <td className='flex flex-col'>
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12 rounded-full">
                                                <img src={allUsers.find(user => user.email === product.userEmail)?.photo} title={allUsers.find(user => user.email === product.userEmail)?.name} className='object-contain' />
                                            </div>
                                        </div>
                                        <div className="text-sm opacity-50">{allUsers.find(user => user.email === product.userEmail)?.email}</div>
                                    </td>
                                    <th>
                                        <button onClick={() => navigate(`/allSportsEquipment/${product._id}`)} className="text-white bg-orange-600 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-base px-5 py-2.5 text-center ">+ View details</button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th></th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Added By</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default AllSportsEquipment;
