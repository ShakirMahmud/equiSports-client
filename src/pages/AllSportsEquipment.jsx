import React, { useEffect, useState } from "react";
import { FaSortAmountDown, FaSortAmountDownAlt } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const AllSportsEquipment = () => {
    const loadedProducts = useLoaderData() || [];
    const [products, setProducts] = useState(loadedProducts);
    const [isSortedDesc, setIsSortedDesc] = useState(false);
    const navigate = useNavigate();
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        fetch("https://equi-sports-server-shakir.vercel.app/users")
            .then((res) => res.json())
            .then((data) => {
                setAllUsers(data);
            });
    }, []);

    // Handle the sorting logic
    const handleSort = async () => {
        try {
            const sortedProducts = isSortedDesc
                ? products.sort((a, b) => a.price - b.price)
                : products.sort((a, b) => b.price - a.price);
            setProducts(sortedProducts);
            setIsSortedDesc(!isSortedDesc);
        } catch (error) {
            console.error("Error sorting products:", error);
        }
    };

    return (
        <div>
            {/* Navbar */}
            <div className="sticky top-0 z-50 backdrop-blur bg-white/80 transition-all duration-300">
                <NavBar />
            </div>

            {/* Main content */}
            <div className="w-11/12 md:w-4/5 mx-auto my-12">
                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                    <h2 className="text-2xl md:text-3xl font-medium">
                        Total Sports Equipment: {products.length}
                    </h2>
                    <button
                        onClick={handleSort}
                        className="btn bg-[#649191] flex items-center gap-2 text-white text-lg"
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
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Added By</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>
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
                                    <td>
                                        {product.categoryName}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">
                                            {product.customization}
                                        </span>
                                    </td>
                                    <td>{product.price}$</td>
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
                                        <div className="text-sm opacity-50">
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
                                            className="text-white bg-[#65b5b4] hover:bg-[#649191] focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-base px-5 py-2.5 text-center"
                                        >
                                            + View details
                                        </button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th></th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Added By</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Cards for mobile */}
                <div className="block md:hidden mt-6">
    {products.map((product) => (
        <div
            key={product._id}
            className="border rounded-lg p-4 mb-4 shadow-lg bg-white"
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
                    <h3 className="font-bold text-lg">{product.itemName}</h3>
                    <p className="text-sm text-gray-500">
                        Stock: {product.stockStatus}
                    </p>
                    <p className="mt-1">
                        <span className="font-medium">Category:</span>{" "}
                        {product.categoryName}
                    </p>
                    <p>
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
                    <span className="text-sm text-gray-500">
                        {allUsers.find(
                            (user) => user.email === product.userEmail
                        )?.email}
                    </span>
                </div>

                {/* Button on Next Line */}
                <div className="mt-3">
                    <button
                        onClick={() => navigate(`/product/${product._id}`)}
                        className="btn w-full bg-[#65b5b4] hover:bg-[#649191] text-white"
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
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default AllSportsEquipment;
