import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../pages/Loading"; 

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
        <div className="my-12">
            {/* Title and subtitle */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-lightText dark:text-darkText sm:text-4xl">
                    Explore Our Categories
                </h1>
                <p className="mt-2 text-lg text-subtitleText dark:text-darkText sm:text-xl">
                    Discover a wide range of products tailored for your sports needs.
                </p>
            </div>

            {/* Buttons for categories */}
            <div className="flex flex-wrap gap-3 justify-center">
                <button
                    className={`px-4 py-2 rounded-lg text-lg font-medium sm:text-base transition-all ${activeButton === "all"
                        ? "bg-lightBtn hover:bg-lightBtnHover text-white dark:bg-darkBtn dark:hover:bg-darkBtnHover dark:text-darkBtnText"
                        : "bg-gray-200 text-gray-700 dark:bg-darkCard dark:text-darkText"
                        }`}
                    onClick={handleAllProductsClick}
                >
                    All Products
                </button>

                {currentPage > 0 && (
                    <button
                        className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 text-lg font-medium sm:text-base dark:bg-darkCard dark:text-darkText"
                        onClick={handleShowPreviousClick}
                    >
                        {"<"}
                    </button>
                )}

                {visibleCategories.map((category, index) => (
                    <button
                        className={`px-4 py-2 rounded-lg text-lg font-medium sm:text-base transition-all ${activeButton === category
                            ? "bg-lightBtn hover:bg-lightBtnHover text-white dark:bg-darkBtn dark:hover:bg-darkBtnHover dark:text-darkBtnText"
                            : "bg-gray-200 text-gray-700 dark:bg-darkCard dark:text-darkText"
                            }`}
                        key={index}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </button>
                ))}

                {hasMoreCategories && (
                    <button
                        className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 text-lg font-medium sm:text-base dark:bg-darkCard dark:text-darkText"
                        onClick={handleShowNextClick}
                    >
                        {">"}
                    </button>
                )}
            </div>

            {/* Products Grid */}
            {categoryLoading ? (
                <div className="flex justify-center mt-8">
                    <Loading /> 
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
                    {productsToDisplay.map((product) => (
                        <div key={product._id} className="flex flex-col items-center justify-center w-full mx-auto transition-all hover:scale-105">
                            <div
                                className="w-full h-64 bg-lightCard dark:bg-darkCard bg-center bg-contain bg-no-repeat rounded-lg shadow-md"
                                style={{ backgroundImage: `url(${product.image})` }}
                            ></div>

                            <div className="w-4/5 -mt-10 overflow-hidden bg-base-200 dark:bg-darkCard/90 rounded-lg shadow-lg ">
                                <h3 className="py-2 font-bold tracking-wide text-center text-lightText dark:text-darkText uppercase">
                                    {product.itemName}
                                </h3>

                                <div className="flex items-center justify-between px-3 py-2 bg-lightBg dark:bg-darkBg">
                                    <span className="font-bold text-priceText">${product.price}</span>
                                    <button
                                        onClick={() => navigate(`/allSportsEquipment/${product._id}`)}
                                        className="px-3 py-1 text-xs font-semibold text-black/80 uppercase transition-colors duration-300 transform bg-lightBtn hover:bg-lightBtnHover dark:bg-darkBtn dark:hover:bg-darkBtnHover focus:outline-none rounded"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="lg:col-span-3 md:col-span-2 flex justify-center">
                    <button onClick={() => navigate('/allSportsEquipment')} className=" flex justify-center mt-8 px-6 py-2 rounded-lg bg-lightBtn hover:bg-lightBtnHover text-black font-bold text-xl dark:bg-darkBtn dark:hover:bg-darkBtnHover dark:text-darkBtnText">View all Products</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryBtns;
