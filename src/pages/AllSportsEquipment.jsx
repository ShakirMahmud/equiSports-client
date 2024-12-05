import React, { useState } from 'react';
import { FaSortAmountDown, FaSortAmountDownAlt } from "react-icons/fa";
import { useLoaderData, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const AllSportsEquipment = () => {
    const loadedProducts = useLoaderData() || [];
    const [products, setProducts] = useState(loadedProducts);
    const [isSortedDesc, setIsSortedDesc] = useState(false);
    const navigate = useNavigate();

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
            <div>
                <h2>Total Sports Equipment: {products.length}</h2>
                <button
                    onClick={handleSort}
                    className="ml-0 lg:ml-4 px-6 py-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 flex items-center gap-3"
                >
                    Sort by Price {!isSortedDesc ? <FaSortAmountDown /> : <FaSortAmountDownAlt />}
                </button>

                {/* Display all equipment in a table format */}
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-20 w-20">
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
                                    <th>
                                        <button onClick={() => navigate(`/allSportsEquipment/${product._id}`)} className="btn btn-ghost btn-xs">View details</button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
};

export default AllSportsEquipment;
