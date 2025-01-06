import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../pages/Loading";
import { FaFilter, FaChevronRight, FaChevronLeft } from "react-icons/fa";

const CategoryBtns = () => {
    const [limitedProducts, setLimitedProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [activeButton, setActiveButton] = useState("all");
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [categoryLoading, setCategoryLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            try {
                const [limitedProductsData, categoriesData] = await Promise.all([
                    fetch('https://equi-sports-server-shakir.vercel.app/limitedProductsData').then(res => res.json()),
                    fetch('https://equi-sports-server-shakir.vercel.app/categories').then(res => res.json()),
                ]);
                setLimitedProducts(limitedProductsData);
                setCategories(categoriesData);

                fetchAllProducts();

                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error("Error fetching initial data:", error);
            }
        };

        const fetchAllProducts = async () => {
            try {
                const allProductsData = await fetch('https://equi-sports-server-shakir.vercel.app/products').then(res => res.json());
                setAllProducts(allProductsData);
            } catch (error) {
                console.error("Error pre-fetching all products:", error);
            }
        };

        fetchInitialData();
    }, []);

    const handleCategoryClick = (category) => {
        setActiveButton(category);
        setCategoryLoading(true);

        // Filter products by category
        setTimeout(() => {
            setSelectedCategory(allProducts.filter(product => product.categoryName === category));
            setCategoryLoading(false);
        }, 300);
    };

    const handleAllProductsClick = () => {
        setActiveButton("all");
        setSelectedCategory([]);
    };

    const handleShowNextClick = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleShowPreviousClick = () => {
        setCurrentPage(currentPage - 1);
    };

    const categoriesPerPage = 5;
    const visibleCategories = categories.slice(currentPage * categoriesPerPage, (currentPage + 1) * categoriesPerPage);
    const hasMoreCategories = currentPage < Math.floor(categories.length / categoriesPerPage);

    if (loading) {
        return <Loading />;
    }
    const productsToDisplay = selectedCategory.length ? selectedCategory : limitedProducts;

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Section Header */}
            <div className="text-center mb-12 space-y-4">
                <div className="flex justify-center items-center gap-3">
                    {/* <FaFilter className="text-accentColor text-2xl" /> */}
                    <h1 className="text-3xl md:text-4xl font-extrabold text-lightText dark:text-darkText">
                        Explore Sports Categories
                    </h1>
                </div>
                <p className="max-w-2xl mx-auto text-subtitleText dark:text-gray-300 text-base md:text-lg">
                    Discover top-quality sports equipment tailored to elevate your performance across various disciplines.
                </p>
            </div>

            {/* Category Navigation */}
            <div className="flex flex-wrap justify-center items-center gap-2 mb-8">
                {/* All Products Button */}
                <button
                    className={`
                        px-4 py-2 rounded-full 
                        flex items-center gap-2
                        transition-all duration-300
                        text-sm md:text-base
                        ${activeButton === "all"
                            ? "bg-lightBtn text-white dark:bg-darkBtn dark:text-darkBtnText"
                            : "bg-gray-100 text-gray-700 dark:bg-darkCard dark:text-gray-300 hover:bg-gray-200"
                        }
                    `}
                    onClick={handleAllProductsClick}
                >
                    All Products
                </button>

                {/* Previous Page Button */}
                {currentPage > 0 && (
                    <button
                        className="p-2 rounded-full bg-gray-100 dark:bg-darkCard text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                        onClick={handleShowPreviousClick}
                    >
                        <FaChevronLeft />
                    </button>
                )}

                {/* Category Buttons */}
                {visibleCategories.map((category, index) => (
                    <button
                        key={index}
                        className={`
                            px-4 py-2 rounded-full 
                            transition-all duration-300
                            text-sm md:text-base
                            ${activeButton === category
                                ? "bg-lightBtn text-white dark:bg-darkBtn dark:text-darkBtnText"
                                : "bg-gray-100 text-gray-700 dark:bg-darkCard dark:text-gray-300 hover:bg-gray-200"
                            }
                        `}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </button>
                ))}

                {/* Next Page Button */}
                {hasMoreCategories && (
                    <button
                        className="p-2 rounded-full bg-gray-100 dark:bg-darkCard text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                        onClick={handleShowNextClick}
                    >
                        <FaChevronRight />
                    </button>
                )}
            </div>

            {/* Products Grid */}
            {categoryLoading ? (
                <div className="flex justify-center mt-8">
                    <Loading /> 
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {productsToDisplay.map((product) => (
                        <div 
                            key={product._id} 
                            className="bg-lightCard dark:bg-darkCard rounded-2xl shadow-lg overflow-hidden"
                        >
                            {/* Product Image */}
                            <div 
                                className="h-64 bg-contain bg-no-repeat bg-center"
                                style={{ backgroundImage: `url(${product.image})` }}
                            />

                            {/* Product Details */}
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-lightText dark:text-darkText mb-2 truncate">
                                    {product.itemName}
                                </h3>
                                <div className="flex justify-between items-center">
                                    <span className="text-priceText font-bold text-xl">
                                        ${product.price}
                                    </span>
                                    <button
                                        onClick={() => navigate(`/product/${product._id}`)}
                                        className="
                                            px-4 py-2 rounded-full 
                                            bg-lightBtn text-white 
                                            dark:bg-darkBtn dark:text-darkBtnText
                                            hover:bg-opacity-90 
                                            transition-all duration-300
                                        "
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* View All Products Button */}
            <div className="flex justify-center mt-12">
                <button 
                    onClick={() => navigate('/allSportsEquipment')}
                    className="
                        flex items-center gap-2 
                        px-6 py-3 
                        rounded-full 
                        bg-lightBtn text-white 
                        dark:bg-darkBtn dark:text-darkBtnText
                        hover:bg-opacity-90 
                        text-base md:text-lg font-bold 
                        transition-all duration-300
                    "
                >
                    View All Products
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
};

export default CategoryBtns;
