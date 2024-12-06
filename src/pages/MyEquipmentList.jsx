import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { AuthContext } from '../provider/AuthProvider';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { MdOutlineDeleteOutline } from 'react-icons/md';

const MyEquipmentList = () => {
    const allProducts = useLoaderData() || [];
    const { user } = useContext(AuthContext);
    const [ addByThisUser, setAddByThisUser ] = useState([]);
    const navigate = useNavigate();
    const matchByEmail = allProducts.filter(product => product.userEmail === user?.email);
    useEffect(() => {
        setAddByThisUser(matchByEmail);
    }, []);

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

                fetch(`https://equi-sports-server-shakir.vercel.app/products/${id}`, {
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
                            const remaining = addByThisUser.filter(product => product._id !== id);
                            setAddByThisUser(remaining);

                        }
                    })
            }
        });
    }

    return (
        <div>
            
            <h2>My Equipment List {addByThisUser.length}</h2>
            <div>
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
                                addByThisUser.map(product => <tr key={product._id}>
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
                                        <button onClick={() => navigate(`/updateProduct/${product._id}`)} className="btn btn-ghost btn-xs">Update</button>
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

export default MyEquipmentList;