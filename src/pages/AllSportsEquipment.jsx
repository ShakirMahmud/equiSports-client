import { MdOutlineDeleteOutline } from "react-icons/md";
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

const AllSportsEquipment = () => {
    const loadedProducts = useLoaderData() || [];
    const [products, setProducts] = useState(loadedProducts);
    const navigate = useNavigate();

    

    return (
        <div>
            <NavBar />
            <div>
                <h2>Total Sports Equipment: {products.length}</h2>
                {/* Display all equipment in a table format.  */}
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map(product => <tr key={product._id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={product.image}
                                                        alt={product.itemName} />
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
                                        <button onClick={() => handleDelete(product._id)}><MdOutlineDeleteOutline /></button>
                                    </th>
                                </tr>)
                            }
                            {/* row 1 */}

                        </tbody>
                        {/* foot */}
                        <tfoot>
                            <tr>
                                <th></th>
                                <th>Category</th>
                                <th>Price</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllSportsEquipment;