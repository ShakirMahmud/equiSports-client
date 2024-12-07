import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MdOutlineDeleteOutline } from "react-icons/md";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

const MyEquipmentList = () => {
    const allProducts = useLoaderData() || [];
    const { user } = useContext(AuthContext);
    const [addByThisUser, setAddByThisUser] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate();

    useEffect(() => {
        const matchByEmail = allProducts.filter(
            (product) => product.userEmail === user?.email
        );
        setAddByThisUser(matchByEmail);
        setLoading(false); // Set loading to false once data is loaded
    }, [allProducts, user?.email]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://equi-sports-server-shakir.vercel.app/products/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                            });
                            setAddByThisUser(prev => prev.filter(product => product._id !== id));
                        }
                    });
            }
        });
    };

    if (loading) {
        // Display a loading screen while the data is being fetched
        return (
            <div className="min-h-screen flex items-center justify-center bg-lightBg dark:bg-darkBg">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-lightBg dark:bg-darkBg">
            <Helmet>
                <title>My Equipment - EquiSports</title>
            </Helmet>
            {/* Navbar */}
            <header className="sticky top-0 z-50 backdrop-blur bg-navLightBg dark:bg-navDarkBg transition-all duration-300">
                <NavBar />
            </header>

            <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-xl sm:text-2xl font-semibold text-lightText dark:text-darkText mb-6 text-center">
                        You added {addByThisUser.length} products
                    </h2>

                    {/* Table for larger screens */}
                    <div className="hidden sm:block overflow-hidden bg-lightCard dark:bg-darkCard rounded-lg shadow-lg">
                        <table className="table-auto w-full">
                            <thead className="bg-gray-200 dark:bg-gray-800">
                                <tr>
                                    <th className="px-3 py-3 text-sm font-medium text-gray-700 dark:text-gray-100">Name</th>
                                    <th className="px-3 py-3 text-sm font-medium text-gray-700 dark:text-gray-100">Category</th>
                                    <th className="px-3 py-3 text-sm font-medium text-gray-700 dark:text-gray-100">Price</th>
                                    <th className="px-3 py-3 text-sm font-medium text-gray-700 dark:text-gray-100 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {addByThisUser.map((product) => (
                                    <tr key={product._id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                                        <td className="px-3 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-10 w-10">
                                                        <img src={product.image} alt={product.itemName} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-lightText dark:text-darkText">{product.itemName}</p>
                                                    <p className="text-sm text-gray-500 dark:text-subtitleText">Stock: {product.stockStatus}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 py-4 text-lightText dark:text-darkText">
                                            {product.categoryName}
                                            <br />
                                            <span className="badge badge-ghost badge-sm">{product.customization}</span>
                                        </td>
                                        <td className="px-3 py-4 font-medium text-lightText dark:text-darkText">{product.price}$</td>
                                        <td className="px-3 py-4">
                                            <div className="flex flex-wrap justify-center gap-2">
                                                <button
                                                    onClick={() => navigate(`/product/${product._id}`)}
                                                    className="btn bg-lightBtn dark:bg-darkBtn hover:bg-lightBtnHover dark:hover:bg-darkBtnHover text-black text-sm px-4 py-1"
                                                >
                                                    View
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/products/${product._id}`)}
                                                    className="btn bg-lightBtn dark:bg-darkBtn hover:bg-lightBtnHover dark:hover:bg-darkBtnHover text-black text-sm px-4 py-1"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="btn bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 flex items-center gap-1"
                                                >
                                                    <MdOutlineDeleteOutline className="text-base" />
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Card layout for small screens */}
                    <div className="sm:hidden space-y-4">
                        {addByThisUser.map((product) => (
                            <div
                                key={product._id}
                                className="p-4 bg-lightCard dark:bg-darkCard rounded-lg shadow-md flex flex-col items-center gap-4"
                            >
                                {/* Avatar and Name Section */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-14 w-14">
                                            <img src={product.image} alt={product.itemName} />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="font-semibold text-lightText dark:text-darkText text-lg">{product.itemName}</h3>
                                        <p className="text-sm text-gray-500 dark:text-subtitleText">Stock: {product.stockStatus}</p>
                                    </div>
                                </div>

                                {/* Product Details */}
                                <div className="text-center text-lightText dark:text-darkText">
                                    <p>
                                        <span className="font-semibold text-lightText dark:text-darkText">Category: </span>
                                        {product.categoryName}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-lightText dark:text-darkText">Price: </span>
                                        {product.price}$
                                    </p>
                                </div>

                                {/* Buttons */}
                                <div className="flex justify-center gap-2">
                                    <button
                                        onClick={() => navigate(`/product/${product._id}`)}
                                        className="btn bg-lightBtn dark:bg-darkBtn hover:bg-lightBtnHover dark:hover:bg-darkBtnHover text-black text-sm px-4 py-1"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => navigate(`/products/${product._id}`)}
                                        className="btn bg-lightBtn dark:bg-darkBtn hover:bg-lightBtnHover dark:hover:bg-darkBtnHover text-black text-sm px-4 py-1"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="btn bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 flex items-center gap-1"
                                    >
                                        <MdOutlineDeleteOutline className="text-base" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Footer */}
            <footer className="bg-footerLightBg dark:bg-footerDarkBg transition-all duration-300">
                <Footer />
            </footer>
        </div>
    );
};

export default MyEquipmentList;
