import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MdOutlineDeleteOutline } from "react-icons/md";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import Loading from "./Loading";

const MyEquipmentList = () => {
    const allProducts = useLoaderData() || [];
    const { user } = useContext(AuthContext);
    const [addByThisUser, setAddByThisUser] = useState([]);
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();

    useEffect(() => {
        const matchByEmail = allProducts.filter(
            (product) => product.userEmail === user?.email
        );
        setAddByThisUser(matchByEmail);
        setLoading(false); 
    }, [allProducts, user?.email]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://equi-sports-server-shakir.vercel.app/products/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                            });
                            setAddByThisUser(prev => prev.filter(product => product._id !== id));
                        }
                    });
            }
        });
    };

    if (loading) {
        return (
            <Loading/>
        );
    }

    return (
        <div className="bg-lightBg dark:bg-darkBg">
          <Helmet>
            <title>My Equipment - EquiSports</title>
          </Helmet>
          {/* Navbar */}
          <header className="sticky top-0 z-50 backdrop-blur bg-navLightBg dark:bg-navDarkBg transition-all duration-300">
            <NavBar />
          </header>
      
          <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-semibold text-lightText dark:text-darkText mb-6 text-center">
                You added {addByThisUser.length} products
              </h2>
      
              {/* Card Grid Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {addByThisUser.map((product) => (
                  <div
                    key={product._id}
                    className="p-4 bg-lightCard dark:bg-darkCard rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    {/* Product Image */}
                    <div className="h-48 w-full rounded-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.itemName}
                        className="w-full h-full object-contain"
                      />
                    </div>
      
                    {/* Product Info */}
                    <div className="mt-4">
                      <h3 className="font-semibold text-lg text-lightText dark:text-darkText truncate">
                        {product.itemName}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-subtitleText mt-1">
                        Stock: {product.stockStatus}
                      </p>
                      <p className="text-lightText dark:text-darkText mt-2">
                        <span className="font-semibold">Category:</span>{" "}
                        {product.categoryName}
                      </p>
                      <p className="text-priceText mt-1 font-medium">
                        ${product.price}
                      </p>
                    </div>
      
                    {/* Buttons */}
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => navigate(`/product/${product._id}`)}
                        className="btn bg-lightBtn dark:bg-darkBtn hover:bg-lightBtnHover dark:hover:bg-darkBtnHover text-black text-sm px-3 py-1 rounded"
                      >
                        View
                      </button>
                      <button
                        onClick={() => navigate(`/products/${product._id}`)}
                        className="btn bg-lightBtn dark:bg-darkBtn hover:bg-lightBtnHover dark:hover:bg-darkBtnHover text-black text-sm px-3 py-1 rounded"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded flex items-center gap-1"
                      >
                        <MdOutlineDeleteOutline className="text-base" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
      
          {/* Footer */}
          <footer className="bg-footerLightBg dark:bg-footerDarkBg transition-all duration-300">
            <Footer />
          </footer>
        </div>
      );
      
};

export default MyEquipmentList;
