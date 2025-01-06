import React, { useEffect, useState } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { FaStar, FaStarHalfAlt, FaRegStar, FaBox, FaCube, FaClock, FaTag, FaUser } from 'react-icons/fa';
import Footer from '../components/Footer';
import Loading from '../pages/Loading'; 
import { Helmet } from 'react-helmet-async';

// CustomStars Component (remains the same)
const CustomStars = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<FaStar key={i} className="text-yellow-500" />);
        } else if (i - rating < 1) {
            stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
        } else {
            stars.push(<FaRegStar key={i} className="text-gray-300" />);
        }
    }
    return <div className="flex space-x-1">{stars}</div>;
};

const ViewAProductDetails = () => {
    const initialProduct = useLoaderData() || {};
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(initialProduct);
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://equi-sports-server-shakir.vercel.app/products')
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false); 
            });
    }, []);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        navigate(`/product/${product._id}`);
    };

    if (loading) {
        return <Loading />; 
    }

    return (
        <div className="bg-lightBg dark:bg-darkBg min-h-screen">
            <Helmet>
                <title>View Product - EquiSports</title>
            </Helmet>
            <header className="sticky top-0 z-50 backdrop-blur bg-navLightBg dark:bg-navDarkBg transition-all duration-300">
                <NavBar />
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Side: Product List */}
                    <div className="lg:col-span-1 bg-lightCard dark:bg-darkCard rounded-2xl shadow-lg ">
                        <h2 className="text-xl font-bold text-lightText dark:text-darkText px-6 py-4 border-b border-gray-200">
                            Our Products
                        </h2>
                        <div className="max-h-screen overflow-y-auto">
                            {products.map((product) => (
                                <div
                                    key={product._id}
                                    className={`
                                        flex items-center p-4 cursor-pointer 
                                        border-b last:border-b-0 
                                        hover:bg-gray-50 dark:hover:bg-gray-700
                                        ${selectedProduct._id === product._id 
                                            ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200' 
                                            : 'border-gray-100'}
                                    `}
                                    onClick={() => handleProductClick(product)}
                                >
                                    <div className="w-20 h-20 flex-shrink-0 mr-4">
                                        <img
                                            src={product.image}
                                            alt={product.itemName}
                                            className="w-full h-full object-contain rounded"
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-base font-semibold text-lightText dark:text-darkText">
                                            {product.itemName}
                                        </h3>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-priceText font-bold">${product.price}</span>
                                            <CustomStars rating={product.rating} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Product Details */}
                    <div className="lg:col-span-2 bg-lightCard dark:bg-darkCard rounded-2xl shadow-lg overflow-hidden">
                        {/* Product Image */}
                        <div className="w-full h-[400px] bg-gray-100 dark:bg-gray-700 flex justify-center items-center">
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.itemName}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="p-8">
                            <h1 className="text-3xl font-bold text-lightText dark:text-darkText mb-4">
                                {selectedProduct.itemName}
                            </h1>
                            <p className="text-subtitleText dark:text-gray-300 mb-6">
                                {selectedProduct.description}
                            </p>

                            {/* Detailed Product Info */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Category */}
                                <div className="flex items-center gap-4">
                                    <FaBox className="text-accentColor text-2xl" />
                                    <div>
                                        <h3 className="font-semibold text-lightText dark:text-darkText">Category</h3>
                                        <p className="text-subtitleText">{selectedProduct.categoryName}</p>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="flex items-center gap-4">
                                    <FaTag className="text-accentColor text-2xl" />
                                    <div>
                                        <h3 className="font-semibold text-lightText dark:text-darkText">Price</h3>
                                        <p className="text-priceText font-bold">${selectedProduct.price}</p>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center gap-4">
                                    <FaStar className="text-accentColor text-2xl" />
                                    <div>
                                        <h3 className="font-semibold text-lightText dark:text-darkText">Rating</h3>
                                        <CustomStars rating={selectedProduct.rating} />
                                    </div>
                                </div>

                                {/* Stock */}
                                <div className="flex items-center gap-4">
                                    <FaCube className="text-accentColor text-2xl" />
                                    <div>
                                        <h3 className="font-semibold text-lightText dark:text-darkText">Stock</h3>
                                        <p className="text-subtitleText">{selectedProduct.stockStatus} items available</p>
                                    </div>
                                </div>

                                {/* Processing Time */}
                                <div className="flex items-center gap-4 md:col-span-2">
                                    <FaClock className="text-accentColor text-2xl" />
                                    <div>
                                        <h3 className="font-semibold text-lightText dark:text-darkText">Processing Time</h3>
                                        <p className="text-subtitleText">{selectedProduct.processingTime}</p>
                                    </div>
                                </div>

                                {/* Customization */}
                                <div className="flex items-center gap-4 md:col-span-2">
                                    <FaUser  className="text-accentColor text-2xl" />
                                    <div>
                                        <h3 className="font-semibold text-lightText dark:text-darkText">Customization</h3>
                                        <p className="text-subtitleText">{selectedProduct.customization}</p>
                                    </div>
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="border-t pt-4">
                                <h2 className="font-semibold text-lightText dark:text-darkText">Added By:</h2>
                                <p className="text-gray-600 dark:text-darkText">
                                    {selectedProduct.userName} ({selectedProduct.userEmail})
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="bg-footerLightBg dark:bg-footerDarkBg transition-all duration-300">
                <Footer />
            </footer>
        </div>
    );
};

export default ViewAProductDetails;