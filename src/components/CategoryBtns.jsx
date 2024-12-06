import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryBtns = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [activeButton, setActiveButton] = useState("all");
    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://equi-sports-server-shakir.vercel.app/products')
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    useEffect(() => {
        fetch('https://equi-sports-server-shakir.vercel.app/categories')
            .then((res) => res.json())
            .then((data) => setCategories(data));
    }, []);

    const handleCategoryClick = (category) => {
        setActiveButton(category);
        setSelectedCategory(products.filter((product) => product.categoryName === category));
    };

    const handleAllProductsClick = () => {
        setActiveButton("all");
        setSelectedCategory(products);
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

    return (
        <div className="my-12">
            {/* Title and subtitle */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">Explore Our Categories</h1>
                <p className="mt-2 text-lg text-gray-600 sm:text-xl">
                    Discover a wide range of products tailored for your sports needs.
                </p>
            </div>

            {/* Buttons for categories */}
            <div className="flex flex-wrap gap-3 justify-center">
                <button
                    className={`px-4 py-2 rounded-lg text-sm sm:text-base ${
                        activeButton === "all" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={handleAllProductsClick}
                >
                    All Products
                </button>

                {currentPage > 0 && (
                    <button
                        className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 text-sm sm:text-base"
                        onClick={handleShowPreviousClick}
                    >
                        {"<"}
                    </button>
                )}

                {visibleCategories.map((category, index) => (
                    <button
                        className={`px-4 py-2 rounded-lg text-sm sm:text-base ${
                            activeButton === category ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                        }`}
                        key={index}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </button>
                ))}

                {hasMoreCategories && (
                    <button
                        className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 text-sm sm:text-base"
                        onClick={handleShowNextClick}
                    >
                        {">"}
                    </button>
                )}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-4">
                {(selectedCategory.length ? selectedCategory : products).map((product) => (
                    <div
                        key={product._id}
                        className="flex flex-col items-center justify-center w-full mx-auto"
                    >
                        <div
                            className="w-full h-64 bg-[#ececec] bg-center bg-contain bg-no-repeat rounded-lg shadow-md"
                            style={{ backgroundImage: `url(${product.image})` }}
                        ></div>

                        <div className="w-4/5 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg">
                            <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase">
                                {product.itemName}
                            </h3>

                            <div className="flex items-center justify-between px-3 py-2 bg-gray-200">
                                <span className="font-bold text-orange-600">${product.price}</span>
                                <button
                                    onClick={() => navigate(`/allSportsEquipment/${product._id}`)}
                                    className="px-3 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 focus:bg-gray-700 focus:outline-none"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryBtns;
