import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

const AddEquipment = () => {
    const { user } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const image = form.get('image');
        const itemName = form.get('itemName');
        const categoryName = form.get('categoryName');
        const description = form.get('description');
        const price = form.get('price');
        const rating = form.get('rating');
        const customization = form.get('customization');
        const processingTime = form.get('processingTime');
        const stockStatus = form.get('stockStatus');
        const userEmail = user?.email;
        const userName = user?.displayName;

        const newProduct = { image, itemName, categoryName, description, price, rating, customization, processingTime, stockStatus, userEmail, userName };

        fetch('https://equi-sports-server-shakir.vercel.app/products', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Product Added Successfully!',
                        text: 'You have successfully added a product.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        timer: 3000,
                        timerProgressBar: true,
                    });
                    e.target.reset();
                }
            });
    };

    return (
        <div>
            <Helmet>
                <title>Add Equipment - EquiSports</title>
            </Helmet>
            <header className="sticky top-0 z-50 backdrop-blur bg-navLightBg dark:bg-navDarkBg transition-all duration-300">
                <NavBar />
            </header>
            <div className="min-h-screen bg-lightBg dark:bg-darkBg py-8 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto bg-lightCard dark:bg-darkCard rounded-lg shadow-md p-6">
                    <h2 className="text-3xl font-semibold text-lightText dark:text-darkText mb-6 text-center">Add New Equipment</h2>
                    <form className="grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                        {/* Image */}
                        <div>
                            <label className="block text-sm font-medium text-lightText dark:text-darkText mb-2">Image URL</label>
                            <input
                                type="text"
                                name="image"
                                className="input input-bordered w-full text-black dark:text-gray-200 bg-lightBg dark:bg-darkBg border-gray-300 rounded-md shadow-sm focus:border-[#649191] focus:ring-[#649191]"
                                placeholder="Enter Image URL"
                            />
                        </div>
                        {/* Item Name */}
                        <div>
                            <label className="block text-sm font-medium text-lightText dark:text-darkText mb-2">Item Name</label>
                            <input
                                type="text"
                                name="itemName"
                                className="input input-bordered w-full text-black dark:text-gray-200 bg-lightBg dark:bg-darkBg border-gray-300 rounded-md shadow-sm focus:border-[#649191] focus:ring-[#649191]"
                                placeholder="Enter Item Name"
                            />
                        </div>
                        {/* Category Name */}
                        <div>
                            <label className="block text-sm font-medium text-lightText dark:text-darkText mb-2">Category Name</label>
                            <input
                                type="text"
                                name="categoryName"
                                className="input input-bordered w-full text-black dark:text-gray-200 bg-lightBg dark:bg-darkBg border-gray-300 rounded-md shadow-sm focus:border-[#649191] focus:ring-[#649191]"
                                placeholder="Enter Category Name"
                            />
                        </div>
                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-lightText dark:text-darkText mb-2">Description</label>
                            <textarea
                                name="description"
                                className="input input-bordered w-full text-black dark:text-gray-200 bg-lightBg dark:bg-darkBg border-gray-300 rounded-md shadow-sm focus:border-[#649191] focus:ring-[#649191]"
                                placeholder="Enter Description"
                            ></textarea>
                        </div>
                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium text-lightText dark:text-darkText mb-2">Price</label>
                            <input
                                type="text"
                                name="price"
                                className="input input-bordered w-full text-black dark:text-gray-200 bg-lightBg dark:bg-darkBg border-gray-300 rounded-md shadow-sm focus:border-[#649191] focus:ring-[#649191]"
                                placeholder="Enter Price"
                            />
                        </div>
                        {/* Rating */}
                        <div>
                            <label className="block text-sm font-medium text-lightText dark:text-darkText mb-2">Rating</label>
                            <input
                                type="text"
                                name="rating"
                                className="input input-bordered w-full text-black dark:text-gray-200 bg-lightBg dark:bg-darkBg border-gray-300 rounded-md shadow-sm focus:border-[#649191] focus:ring-[#649191]"
                                placeholder="Enter Rating"
                            />
                        </div>
                        {/* Customization */}
                        <div>
                            <label className="block text-sm font-medium text-lightText dark:text-darkText mb-2">Customization</label>
                            <input
                                type="text"
                                name="customization"
                                className="input input-bordered w-full text-black dark:text-gray-200 bg-lightBg dark:bg-darkBg border-gray-300 rounded-md shadow-sm focus:border-[#649191] focus:ring-[#649191]"
                                placeholder="Enter Customization Options"
                            />
                        </div>
                        {/* Processing Time */}
                        <div>
                            <label className="block text-sm font-medium text-lightText dark:text-darkText mb-2">Processing Time</label>
                            <input
                                type="text"
                                name="processingTime"
                                className="input input-bordered w-full text-black dark:text-gray-200 bg-lightBg dark:bg-darkBg border-gray-300 rounded-md shadow-sm focus:border-[#649191] focus:ring-[#649191]"
                                placeholder="Enter Processing Time"
                            />
                        </div>
                        {/* Stock Status */}
                        <div>
                            <label className="block text-sm font-medium text-lightText dark:text-darkText mb-2">Stock Status</label>
                            <input
                                type="text"
                                name="stockStatus"
                                className="input input-bordered w-full text-black dark:text-gray-200 bg-lightBg dark:bg-darkBg border-gray-300 rounded-md shadow-sm focus:border-[#649191] focus:ring-[#649191]"
                                placeholder="Enter Stock Status"
                            />
                        </div>
                        {/* User Email */}
                        <div>
                            <label className="block text-sm font-medium text-lightText dark:text-darkText mb-2">User Email</label>
                            <input
                                type="text"
                                name="userEmail"
                                value={user?.email}
                                readOnly
                                className="input input-bordered w-full bg-lightBg dark:bg-darkBg border-gray-300 rounded-md  text-gray-300"
                            />
                        </div>
                        {/* User Name */}
                        <div>
                            <label className="block text-sm font-medium text-lightText dark:text-darkText mb-2">User Name</label>
                            <input
                                type="text"
                                name="userName"
                                value={user?.displayName}
                                readOnly
                                className="input input-bordered w-full bg-lightBg dark:bg-darkBg border-gray-300 rounded-md  text-gray-300"
                            />
                        </div>
                        {/* Submit Button */}
                        <div className="sm:col-span-2">
                            <button
                                type="submit"
                                className="btn w-full bg-lightBtn hover:bg-lightBtnHover dark:bg-darkBtn dark:hover:bg-darkBtnHover text-darkBtnText dark:text-darkBtnText text-lg font-medium py-2.5 rounded-md"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <footer className="bg-footerLightBg dark:bg-footerDarkBg transition-all duration-300">
                <Footer />
            </footer>
        </div>
    );
};

export default AddEquipment;
