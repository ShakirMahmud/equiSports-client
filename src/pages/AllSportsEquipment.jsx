import React, { useEffect, useState } from "react";
import { FaSortAmountDown, FaSortAmountDownAlt } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Loading from "../pages/Loading"; // Import Loading component
import { Helmet } from "react-helmet-async";

const AllSportsEquipment = () => {
    const loadedProducts = useLoaderData() || [];
    const [products, setProducts] = useState(loadedProducts);
    const [isSortedDesc, setIsSortedDesc] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch users and set loading to false once data is fetched
        fetch("https://equi-sports-server-shakir.vercel.app/users")
            .then((res) => res.json())
            .then((data) => {
                setAllUsers(data);
                setLoading(false); // Set loading to false once users data is fetched
            })
            .catch(() => setLoading(false)); // Handle error and set loading to false
    }, []);

    useEffect(() => {
        // Set products data once it's loaded from loader
        setProducts(loadedProducts);
    }, [loadedProducts]);

    // Handle the sorting logic from server
    const handleSort = () => {
        // using server side sorting
        fetch(`https://equi-sports-server-shakir.vercel.app/products/sort/${isSortedDesc ? "asc" : "desc"}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setIsSortedDesc(!isSortedDesc);
            })
    };

    if (loading) {
        return <Loading />; // Render loading screen while fetching data
    }

    return (
        <div className="bg-lightBg dark:bg-darkBg">
            <Helmet>
                <title>All Sports Equipment - EquiSports</title>
            </Helmet>
            {/* Navbar */}
            <header className="sticky top-0 z-50 backdrop-blur bg-navLightBg dark:bg-navDarkBg transition-all duration-300">
                <NavBar />
            </header>

            {/* Main content */}
            <div className="w-11/12 md:w-4/5 mx-auto my-12">
                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                    <h2 className="text-2xl md:text-3xl font-medium text-lightText dark:text-darkText">
                        Total Sports Equipment: {products.length}
                    </h2>
                    <button
                        onClick={handleSort}
                        className="btn bg-lightBtn dark:bg-darkBtn flex items-center gap-2 text-black text-lg hover:bg-lightBtnHover dark:hover:bg-darkBtnHover  "
                    >
                        Sort by Price{" "}
                        {!isSortedDesc ? <FaSortAmountDown /> : <FaSortAmountDownAlt />}
                    </button>
                </div>

                {/* Table for desktop and cards for mobile */}
                <div className="overflow-x-auto hidden md:block mt-6">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className="text-lightText dark:text-darkText">Name</th>
                                <th className="text-lightText dark:text-darkText">Category</th>
                                <th className="text-lightText dark:text-darkText">Price</th>
                                <th className="text-lightText dark:text-darkText">Added By</th>
                                <th className="text-lightText dark:text-darkText"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id} className="border-b border-cardBorder dark:border-cardBorder">
                                    <td className="text-lightText dark:text-darkText">
                                        <div className="flex items-center gap-8">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-24 w-24">
                                                    <img
                                                        src={product.image}
                                                        alt={product.itemName}
                                                        className="object-contain"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-xl">{product.itemName}</div>
                                                <div className="text-sm opacity-50">
                                                    Stock: {product.stockStatus}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-lightText dark:text-darkText">
                                        {product.categoryName}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">
                                            {product.customization}
                                        </span>
                                    </td>
                                    <td className="text-lightText dark:text-darkText">{product.price}$</td>
                                    <td className="flex flex-col">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12 rounded-full">
                                                <img
                                                    src={
                                                        allUsers.find(
                                                            (user) => user.email === product.userEmail
                                                        )?.photo
                                                    }
                                                    title={
                                                        allUsers.find(
                                                            (user) => user.email === product.userEmail
                                                        )?.name
                                                    }
                                                    className="object-contain"
                                                />
                                            </div>
                                        </div>
                                        <div className="text-sm opacity-50 dark:text-white">
                                            {allUsers.find(
                                                (user) => user.email === product.userEmail
                                            )?.email}
                                        </div>
                                    </td>
                                    <th>
                                        <button
                                            onClick={() =>
                                                navigate(`/product/${product._id}`)
                                            }
                                            className="text-black bg-lightBtn dark:bg-darkBtn hover:bg-lightBtnHover dark:hover:bg-darkBtnHover focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-base px-5 py-2.5 text-center"
                                        >
                                            + View details
                                        </button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Cards for mobile */}
                <div className="block md:hidden mt-6">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="border rounded-lg p-4 mb-4 shadow-lg bg-lightCard dark:bg-darkCard"
                        >
                            <div className="flex gap-4">
                                {/* Product Image */}
                                <div className="w-24 h-24">
                                    <img
                                        src={product.image}
                                        alt={product.itemName}
                                        className="w-full h-full object-cover rounded"
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg text-lightText dark:text-darkText">{product.itemName}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">
                                        Stock: {product.stockStatus}
                                    </p>
                                    <p className="mt-1 dark:text-white">
                                        <span className="font-medium ">Category:</span>{" "}
                                        {product.categoryName}
                                    </p>
                                    <p className=" dark:text-white">
                                        <span className="font-medium">Price:</span> ${product.price}
                                    </p>
                                </div>
                            </div>

                            {/* User Info and Button */}
                            <div className="mt-4">
                                <div className="flex items-center gap-2">
                                    {/* User Avatar */}
                                    <div className="w-10 h-10 rounded-full overflow-hidden">
                                        <img
                                            src={
                                                allUsers.find(
                                                    (user) => user.email === product.userEmail
                                                )?.photo
                                            }
                                            alt="User"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {/* User Email */}
                                    <span className="text-sm text-gray-500 dark:text-gray-100">
                                        {allUsers.find(
                                            (user) => user.email === product.userEmail
                                        )?.email}
                                    </span>
                                </div>

                                {/* Button on Next Line */}
                                <div className="mt-3">
                                    <button
                                        onClick={() => navigate(`/product/${product._id}`)}
                                        className="btn w-full bg-lightBtn dark:bg-darkBtn text-black hover:bg-lightBtnHover dark:hover:bg-darkBtnHover"
                                    >
                                        + View Details
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

export default AllSportsEquipment;
