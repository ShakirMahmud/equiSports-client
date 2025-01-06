import React, { useEffect, useState } from "react";
import { FaSortAmountDown, FaSortAmountDownAlt, FaBoxOpen, FaUser } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Tooltip from "../components/Tooltip";
import Loading from "../pages/Loading";
import { Helmet } from "react-helmet-async";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const ProductCard = ({ product, allUsers, index }) => {
    const navigate = useNavigate();
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const user = allUsers.find(user => user.email === product.userEmail);

    return (
        <motion.div 
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ 
                duration: 0.5, 
                delay: index * 0.1 
            }}
            className="bg-lightCard dark:bg-darkCard rounded-2xl shadow-lg overflow-hidden transform transition-all hover:scale-[1.02]"
        >
            {/* Product Image */}
            <div className="relative h-48 w-full overflow-hidden flex items-center justify-center">
                <img
                    src={product.image}
                    alt={product.itemName}
                    className="max-h-full max-w-full object-contain"
                />
            </div>

            {/* Product Details */}
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-lightText dark:text-darkText">
                        {product.itemName}
                    </h3>
                    <span className="text-priceText font-bold text-lg">
                        ${product.price}
                    </span>
                </div>

                <div className="mb-4">
                    <div className="flex items-center justify-between">
                        <span className="text-subtitleText flex items-center gap-2">
                            <FaBoxOpen className="text-accentColor" />
                            Quantity: {product.stockStatus}
                        </span>
                       
                    </div>
                </div>

                {/* User Info */}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-1">
                        <Tooltip text={user?.email}>
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-accentColor">
                                <img
                                    src={user?.photo || '/default-avatar.png'}
                                    alt={user?.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </Tooltip>
                        <span className="text-subtitleText text-sm flex items-center">
                        
                            Added By
                        </span>
                    </div>

                    <button
                        onClick={() => navigate(`/product/${product._id}`)}
                        className="
                            px-4 py-2 
                            bg-lightBtn dark:bg-darkBtn 
                            text-white 
                            rounded-full 
                            hover:bg-lightBtnHover 
                            dark:hover:bg-darkBtnHover 
                            transition-all
                        "
                    >
                        View Details
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const AllSportsEquipment = () => {
    const loadedProducts = useLoaderData() || [];
    const [products, setProducts] = useState(loadedProducts);
    const [isSortedDesc, setIsSortedDesc] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    useEffect(() => {
        fetch("https://equi-sports-server-shakir.vercel.app/users")
            .then((res) => res.json())
            .then((data) => {
                setAllUsers(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    useEffect(() => {
        setProducts(loadedProducts);
    }, [loadedProducts]);

    const handleSort = () => {
        const sortedProducts = [...products].sort((a, b) => {
            return isSortedDesc 
                ? a.price - b.price 
                : b.price - a.price;
        });
        setProducts(sortedProducts);
        setIsSortedDesc(!isSortedDesc);
    };

    // Pagination Logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Pagination Render
    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="flex justify-center items-center space-x-2 mt-8">
                <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-lightBtn dark:bg-darkBtn text-white rounded-full disabled:opacity-50"
                >
                    Previous
                </button>
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`
                            px-4 py-2 rounded-full
                            ${currentPage === number 
                                ? 'bg-accentColor text-white' 
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'}
                        `}
                    >
                        {number}
                    </button>
                ))}
                <button 
                    onClick={() => setCurrentPage(prev => 
                        Math.min(prev + 1, pageNumbers.length)
                    )}
                    disabled={currentPage === pageNumbers.length}
                    className="px-4 py-2 bg-lightBtn dark:bg-darkBtn text-white rounded-full disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        );
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="bg-lightBg dark:bg-darkBg min-h-screen">
            <Helmet>
                <title>All Sports Equipment - EquiSports</title>
            </Helmet>
            <header className="sticky top-0 z-50 backdrop-blur bg-navLightBg dark:bg-navDarkBg transition-all duration-300">
                <NavBar />
            </header>

            {/* Header with Sort and Total Products */}
            <div className="w-11/12 lg:w-4/5 mx-auto flex justify-between items-center mt-8 mb-6">
                <h2 className="text-2xl md:text-3xl font-medium text-lightText dark:text-darkText">
                    Total Sports Equipment: {products.length}
                </h2>
                <button
                    onClick={handleSort}
                    className="btn bg-lightBtn dark:bg-darkBtn flex items-center gap-2 text-white text-lg hover:bg-lightBtnHover dark:hover:bg-darkBtnHover"
                >
                    Sort by Price{" "}
                    {!isSortedDesc ? <FaSortAmountDown /> : <FaSortAmountDownAlt />}
                </button>
            </div>

            {/* Products Grid */}
            <AnimatePresence>
                <motion.div 
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-11/12 lg:w-4/5 mx-auto"
                >
                    {currentProducts.map((product, index) => (
                        <ProductCard 
                            key={product._id} 
                            product={product} 
                            allUsers={allUsers}
                            index={index}
                        />
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            {renderPagination()}

            <footer className="bg-footerLightBg dark:bg-footerDarkBg transition-all duration-300 mt-12">
                <Footer />
            </footer>
        </div>
    );
};

export default AllSportsEquipment;