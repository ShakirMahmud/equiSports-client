import React, { useContext, useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';
import Footer from '../components/Footer';
import Loading from '../pages/Loading'; 
import { Helmet } from 'react-helmet-async';

const UpdateProduct = () => {
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const product = useLoaderData() || {};
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (product) {
            setLoading(false); // Set loading to false once data is loaded
        }
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        const form = new FormData(e.target);
        const image = form.get('image');
        const itemName = form.get('itemName');
        const categoryName = form.get('categoryName');
        const description = form.get('description');
        const priceString = form.get('price');
        // check if the price is a valid number
        if (isNaN(priceString)) {
            setError('Price must be a number');
            return;
        }
        const price = parseFloat(priceString);
        const rating = form.get('rating');
        const customization = form.get('customization');
        const processingTime = form.get('processingTime');
        const stockStatus = form.get('stockStatus');
        const userEmail = user?.email;
        const userName = user?.displayName;

        const updatedProduct = { image, itemName, categoryName, description, price, rating, customization, processingTime, stockStatus, userEmail, userName };

        // Update product API call
        fetch(`https://equi-sports-server-shakir.vercel.app/products/${product._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Product Updated Successfully!',
                        text: 'You have successfully updated this product.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        timer: 3000,
                        timerProgressBar: true,
                    });
                }
            });
    };

    if (loading) {
        return <Loading />; // Show the Loading component while the product data is loading
    }

    return (
        <div>
            <Helmet>
                <title>Update Product - EquiSports</title>
            </Helmet>
            <header className="sticky top-0 z-50 backdrop-blur bg-navLightBg dark:bg-navDarkBg transition-all duration-300">
                <NavBar />
            </header>
            <div className="bg-lightBg dark:bg-darkBg min-h-screen">
                <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="bg-lightCard dark:bg-darkCard p-6 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-semibold text-center mb-8 text-lightText dark:text-darkText">
                            Update Product
                        </h2>
                        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                            {/* Image */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Image URL</label>
                                <input
                                    type="text"
                                    name="image"
                                    className="input input-bordered w-full text-black dark:text-gray-200 bg-lightBg dark:bg-darkBg border-gray-300 rounded-md shadow-sm focus:border-[#649191] focus:ring-[#649191]"
                                    defaultValue={product.image}
                                />
                            </div>

                            {/* Item Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Item Name</label>
                                <input
                                    type="text"
                                    name="itemName"
                                    className="input input-bordered w-full text-black dark:text-gray-200 bg-lightBg dark:bg-darkBg border-gray-300 rounded-md shadow-sm focus:border-[#649191] focus:ring-[#649191]"
                                    defaultValue={product.itemName}
                                />
                            </div>

                            {/* Category Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Category Name</label>
                                <input
                                    type="text"
                                    name="categoryName"
                                    className="input input-bordered w-full text-black dark:text-gray-200 bg-lightBg dark:bg-darkBg border-gray-300 rounded-md shadow-sm focus:border-[#649191] focus:ring-[#649191]"
                                    defaultValue={product.categoryName}
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Description</label>
                                <textarea
                                    name="description"
                                    className="input input-bordered w-full text-black dark:text-gray-200 bg-lightBg dark:bg-darkBg border-gray-300 rounded-md shadow-sm focus:border-[#649191] focus:ring-[#649191]"
                                    defaultValue={product.description}
                                ></textarea>
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Price</label>
                                <input
                                    type="text"
                                    name="price"
                                    className="input input-bordered w-full text-black dark:text-gray-200 bg-lightBg dark:bg-darkBg border-gray-300 rounded-md shadow-sm focus:border-[#649191] focus:ring-[#649191]"
                                    defaultValue={product.price}
                                />
                                {
                                    error && <p className="text-red-500 mt-2">{error}</p>
                                }
                            </div>

                            {/* Rating */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Rating</label>
                                <input
                                    type="text"
                                    name="rating"
                                    className="input input-bordered w-full text-black dark:text-gray-200 bg-lightBg dark:bg-darkBg border-gray-300 rounded-md shadow-sm focus:border-[#649191] focus:ring-[#649191]"
                                    defaultValue={product.rating}
                                />
                            </div>

                            {/* Customization */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Customization</label>
                                <input
                                    type="text"
                                    name="customization"
                                    className="input input-bordered w-full text-black dark:text-gray-200 bg-lightBg dark:bg-darkBg border-gray-300 rounded-md shadow-sm focus:border-[#649191] focus:ring-[#649191]"
                                    defaultValue={product.customization}
                                />
                            </div>

                            {/* Processing Time */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Processing Time</label>
                                <input
                                    type="text"
                                    name="processingTime"
                                    className="input input-bordered w-full text-black dark:text-gray-200 bg-lightBg dark:bg-darkBg border-gray-300 rounded-md shadow-sm focus:border-[#649191] focus:ring-[#649191]"
                                    defaultValue={product.processingTime}
                                />
                            </div>

                            {/* Stock Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Stock Status</label>
                                <input
                                    type="text"
                                    name="stockStatus"
                                    className="input input-bordered w-full text-black dark:text-gray-200 bg-lightBg dark:bg-darkBg border-gray-300 rounded-md shadow-sm focus:border-[#649191] focus:ring-[#649191]"
                                    defaultValue={product.stockStatus}
                                />
                            </div>

                            {/* User Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">User Email</label>
                                <input
                                    type="text"
                                    name="userEmail"
                                    className="input input-bordered w-full  dark:text-gray-300 bg-lightBg dark:bg-darkBg border-gray-300 rounded-md  text-gray-500"
                                    value={user?.email}
                                    readOnly
                                />
                            </div>

                            {/* User Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">User Name</label>
                                <input
                                    type="text"
                                    name="userName"
                                    className="input input-bordered w-full  dark:text-gray-300 bg-lightBg dark:bg-darkBg border-gray-300 rounded-md  text-gray-500"
                                    value={user?.displayName}
                                    readOnly
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="sm:col-span-2">
                                <button
                                    type="submit"
                                    className="btn w-full bg-lightBtn dark:bg-darkBtn hover:bg-lightBtnHover dark:hover:bg-darkBtnHover text-darkBtnText text-lg font-medium py-2.5 rounded-md"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <footer className="bg-footerLightBg dark:bg-footerDarkBg transition-all duration-300">
                <Footer />
            </footer>
        </div>
    );
};

export default UpdateProduct;
