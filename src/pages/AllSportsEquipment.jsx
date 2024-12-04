import { MdOutlineDeleteOutline } from "react-icons/md"; 
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { useLoaderData } from 'react-router-dom';
import AllSportsEquipmentTable from '../components/AllSportsEquipmentTable';
import { FaDeleteLeft } from 'react-icons/fa6';
import Swal from "sweetalert2";

const AllSportsEquipment = () => {
    const loadedProducts = useLoaderData() || [];
    const [products, setProducts] = useState(loadedProducts);

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:5000/products/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });

                            // update the loaded products state
                            const remaining = products.filter(product => product._id !== id);
                            setProducts(remaining);

                        }
                    })

            }
        });
    }

    return (
        <div>
            <NavBar />
            <div>
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
                                products.map(product => <tr>
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
                                                <div className="font-bold">{ product.itemName }</div>
                                                <div className="text-sm opacity-50">Stock: { product.stockStatus }</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        { product.categoryName }
                                        <br />
                                        <span className="badge badge-ghost badge-sm">{ product.customization }</span>
                                    </td>
                                    <td>{ product.price }$</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">details</button>
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