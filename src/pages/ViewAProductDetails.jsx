import React, { useEffect, useState } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import Footer from '../components/Footer';
import Loading from '../pages/Loading'; // Import the Loading component
import { Helmet } from 'react-helmet-async';

// CustomStars Component
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
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://equi-sports-server-shakir.vercel.app/products')
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false); // Set loading to false once data is loaded
            });
    }, []);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        navigate(`/product/${product._id}`);
    };

    if (loading) {
        return <Loading />; // Show the Loading component while the data is being fetched
    }

    return (
        <div>
            <Helmet>
                <title>View Product - EquiSports</title>
            </Helmet>
            <header className="sticky top-0 z-50 backdrop-blur bg-navLightBg dark:bg-navDarkBg transition-all duration-300">
                <NavBar />
            </header>
            <div className="bg-lightBg dark:bg-darkBg min-h-screen">
                <div className="container mx-auto px-4 py-8 lg:flex lg:gap-6">
                    {/* Left Side: Product List */}
                    <div
                        className="lg:w-1/3 bg-lightCard dark:bg-darkCard rounded-lg shadow-lg lg:overflow-y-auto lg:max-h-screen mb-6 lg:mb-0"
                        style={{ maxHeight: 'calc(100vh - 120px)' }}
                    >
                        <h2 className="text-lg font-bold text-lightText dark:text-darkText px-4 py-3 border-b border-gray-200 lg:block hidden">
                            Products
                        </h2>
                        <div className="flex lg:block lg:flex-col lg:space-y-2 overflow-x-auto lg:overflow-hidden space-x-4 lg:space-x-0 px-4 py-3">
                            {products.map((product) => (
                                <div
                                    key={product._id}
                                    className={`flex-shrink-0 w-48 lg:w-auto lg:flex lg:items-center p-4 cursor-pointer border ${selectedProduct._id === product._id
                                        ? 'border-blue-500 '
                                        : 'border-gray-200'
                                        } hover:shadow-md transition rounded-lg`}
                                    onClick={() => handleProductClick(product)}
                                >
                                    <img
                                        src={product.image}
                                        alt={product.itemName}
                                        className="w-16 h-16 object-cover rounded lg:mr-4"
                                    />
                                    <div className="ml-4 lg:ml-0">
                                        <h2 className="text-lightText dark:text-darkText font-semibold text-sm lg:text-base">
                                            {product.itemName}
                                        </h2>
                                        <p className="text-subtitleText dark:text-darkText text-xs lg:text-sm">${product.price}</p>
                                        <CustomStars rating={product.rating} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Product Details */}
                    <div className="lg:w-2/3 bg-lightCard dark:bg-darkCard rounded-lg shadow-lg overflow-hidden">
                        {/* Product Image */}
                        <div className="w-full h-64 sm:h-96 bg-gray-100 dark:bg-gray-700 flex justify-center items-center">
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.itemName}
                                className="object-contain w-full h-full"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="p-6">
                            <h1 className="text-2xl sm:text-3xl font-bold text-lightText dark:text-darkText mb-4">
                                {selectedProduct.itemName}
                            </h1>
                            <p className="text-sm sm:text-base text-subtitleText dark:text-darkText mb-6">
                                {selectedProduct.description}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                {/* Category */}
                                <div>
                                    <h2 className="font-semibold text-lightText dark:text-darkText">Category:</h2>
                                    <p className="text-gray-600 dark:text-darkText">{selectedProduct.categoryName}</p>
                                </div>

                                {/* Price */}
                                <div>
                                    <h2 className="font-semibold text-lightText dark:text-darkText">Price:</h2>
                                    <p className="text-priceText">${selectedProduct.price}</p>
                                </div>

                                {/* Rating */}
                                <div>
                                    <h2 className="font-semibold text-lightText dark:text-darkText">Rating:</h2>
                                    <CustomStars rating={selectedProduct.rating} />
                                </div>

                                {/* Stock Status */}
                                <div>
                                    <h2 className="font-semibold text-lightText dark:text-darkText">Stock:</h2>
                                    <p className="text-gray-600 dark:text-darkText">{selectedProduct.stockStatus} items available</p>
                                </div>

                                {/* Customization */}
                                <div className="sm:col-span-2">
                                    <h2 className="font-semibold text-lightText dark:text-darkText">Customization:</h2>
                                    <p className="text-gray-600 dark:text-darkText">{selectedProduct.customization}</p>
                                </div>

                                {/* Processing Time */}
                                <div className="sm:col-span-2">
                                    <h2 className="font-semibold  text-lightText dark:text-darkText">Processing Time:</h2>
                                    <p className="text-gray-600 dark:text-darkText">{selectedProduct.processingTime}</p>
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
