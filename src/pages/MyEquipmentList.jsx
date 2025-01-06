import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { 
    MdOutlineDeleteOutline, 
    MdRemoveRedEye, 
    MdEdit 
} from "react-icons/md";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import Loading from "./Loading";

const MyEquipmentList = () => {
    const allProducts = useLoaderData() || [];
    const { user } = useContext(AuthContext);
    const [addByThisUser, setAddByThisUser] = useState([]);
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();

    useEffect(() => {
        const matchByEmail = allProducts.filter(
            (product) => product.userEmail === user?.email
        );
        setAddByThisUser(matchByEmail);
        setLoading(false); 
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
        return <Loading/>;
    }

    return (
        <div className="bg-lightBg dark:bg-darkBg min-h-screen">
            <Helmet>
                <title>My Equipment - EquiSports</title>
            </Helmet>
            
            {/* Navbar */}
            <header className="sticky top-0 z-50 backdrop-blur bg-navLightBg dark:bg-navDarkBg transition-all duration-300">
                <NavBar />
            </header>

            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-lightText dark:text-darkText mb-4">
                        My Added Products
                    </h2>
                    <p className="text-subtitleText dark:text-gray-300">
                        You have added {addByThisUser.length} products to EquiSports
                    </p>
                </div>

                {/* Empty State */}
                {addByThisUser.length === 0 && (
                    <div className="text-center py-16 bg-lightCard dark:bg-darkCard rounded-lg">
                        <p className="text-2xl text-subtitleText dark:text-gray-300 mb-4">
                            No products added yet
                        </p>
                        <button
                            onClick={() => navigate('/addEquipment')}
                            className="btn bg-lightBtn dark:bg-darkBtn text-white hover:bg-lightBtnHover dark:hover:bg-darkBtnHover"
                        >
                            Add Your First Product
                        </button>
                    </div>
                )}

                {/* Card Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {addByThisUser.map((product) => (
                        <div
                            key={product._id}
                            className="bg-lightCard dark:bg-darkCard rounded-2xl shadow-lg overflow-hidden transform transition-all hover:scale-[1.02]"
                        >
                            {/* Product Image */}
                            <div className="h-56 w-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                                <img
                                    src={product.image}
                                    alt={product.itemName}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-lightText dark:text-darkText mb-2 truncate">
                                    {product.itemName}
                                </h3>
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-subtitleText">
                                        {product.categoryName}
                                    </span>
                                    <span className="text-priceText font-bold">
                                        ${product.price}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span 
                                        className={`
                                            px-2 py-1 rounded-full text-xs font-medium
                                            ${product.stockStatus === 'In Stock' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'}
                                        `}
                                    >
                                        {product.stockStatus}
                                    </span>
                                </div>

                                {/* Action Buttons */}
                                <div className="grid grid-cols-3 gap-2 mt-4">
                                    <button
                                        onClick={() => navigate(`/product/${product._id}`)}
                                        className="btn bg-lightBtn dark:bg-darkBtn hover:bg-lightBtnHover dark:hover:bg-darkBtnHover text-white flex items-center justify-center gap-1"
                                    >
                                        <MdRemoveRedEye />
                                        View
                                    </button>
                                    <button
                                        onClick={() => navigate(`/products/${product._id}`)}
                                        className="btn px-1 bg-lightBtn dark:bg-darkBtn hover:bg-lightBtnHover dark:hover:bg-darkBtnHover text-white flex flex-row items-center justify-center"
                                    >
                                        <MdEdit />
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="btn px-1 bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-1"
                                    >
                                        <MdOutlineDeleteOutline />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
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