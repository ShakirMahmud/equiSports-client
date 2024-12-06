import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryBtns = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]); // Empty array by default
    const [activeButton, setActiveButton] = useState("all"); // Track the active button
    const [currentPage, setCurrentPage] = useState(0); // Track which set of 5 categories to display
    const navigate = useNavigate();

    // Fetch all products
    useEffect(() => {
        fetch('https://equi-sports-server-shakir.vercel.app/products')
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    // Fetch all categories
    useEffect(() => {
        fetch('https://equi-sports-server-shakir.vercel.app/categories')
            .then((res) => res.json())
            .then((data) => setCategories(data));
    }, []);

    // Handle category click
    const handleCategoryClick = (category) => {
        setActiveButton(category); // Mark the clicked category as active
        setSelectedCategory(products.filter((product) => product.categoryName === category));
    };

    // Handle "All Products" button click
    const handleAllProductsClick = () => {
        setActiveButton("all"); // Mark "All Products" as active
        setSelectedCategory(products); // Show all products
    };

    // Handle "Show Next" button click (>)
    const handleShowNextClick = () => {
        setCurrentPage(currentPage + 1);
    };

    // Handle "Show Previous" button click (<)
    const handleShowPreviousClick = () => {
        setCurrentPage(currentPage - 1);
    };

    // Calculate the categories to display based on currentPage
    const categoriesPerPage = 5;
    const visibleCategories = categories.slice(currentPage * categoriesPerPage, (currentPage + 1) * categoriesPerPage);

    // Determine if there are more categories to show
    const hasMoreCategories = currentPage < Math.floor(categories.length / categoriesPerPage);

    return (
        <div className="my-12">
            <div className="flex gap-3">
                {/* Show All Products button */}
                <button
                    className={`bg-white px-3 py-2 border-2 ${activeButton === "all" ? "border-blue-500" : "border-gray-500"}`}
                    onClick={handleAllProductsClick}
                >
                    All Products
                </button>

                {/* Show Previous button (<) if currentPage is not 0 */}
                {currentPage > 0 && (
                    <button
                        className="bg-white px-3 py-2 border-2 border-gray-500"
                        onClick={handleShowPreviousClick}
                    >
                        {" < "}
                    </button>
                )}

                {/* Show categories based on the current page */}
                {visibleCategories.map((category, index) => (
                    <button
                        className={`bg-white px-3 py-2 border-2 ${activeButton === category ? "border-blue-500" : "border-gray-500"}`}
                        key={index}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </button>
                ))}

                {/* Show Next button (>) only if there are more categories to show */}
                {hasMoreCategories && (
                    <button
                        className="bg-white px-3 py-2 border-2 border-gray-500"
                        onClick={handleShowNextClick}
                    >
                        {" >"}
                    </button>
                )}
            </div>

            {/* Display the filtered or all products */}
            <div className="grid grid-cols-4 gap-4 my-8">
                {
                    selectedCategory.length
                        ? selectedCategory.map((product) => (
                            <div key={product._id} className="flex flex-col items-center justify-center w-full mx-auto">
                                {/* Dynamically set the background image for each product */}
                                <div
                                    className="w-full h-64 bg-[#ececec] bg-center bg-contain bg-no-repeat rounded-lg shadow-md"
                                    style={{ backgroundImage: `url(${product.image})` }}
                                ></div>

                                <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 ">
                                    <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase ">
                                        {product.itemName}
                                    </h3>

                                    <div className="flex items-center justify-between px-3 py-2 bg-gray-200 ">
                                        <span className="font-bold text-gray-800 ">
                                            ${product.price}
                                        </span>
                                        <button
                                            onClick={() => navigate(`/allSportsEquipment/${product._id}`)}
                                            className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 focus:bg-gray-700 focus:outline-none"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                        : products.map((product) => (
                            <div key={product._id} className="flex flex-col items-center justify-center w-full mx-auto">
                                {/* Dynamically set the background image for each product */}
                                <div
                                    className="w-full h-64 bg-[#ececec] bg-center bg-contain bg-no-repeat rounded-lg shadow-md"
                                    style={{ backgroundImage: `url(${product.image})` }}
                                ></div>

                                <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 ">
                                    <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase ">
                                        {product.itemName}
                                    </h3>

                                    <div className="flex items-center justify-between px-3 py-2 bg-gray-200 ">
                                        <span className="font-bold text-gray-800 ">
                                            ${product.price}
                                        </span>
                                        <button
                                            onClick={() => navigate(`/allSportsEquipment/${product._id}`)}
                                            className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 focus:bg-gray-700 focus:outline-none"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                }
            </div>
        </div>
    );
};

export default CategoryBtns;
