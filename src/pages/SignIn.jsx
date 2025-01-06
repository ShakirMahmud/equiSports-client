import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import LoginAnimation from '../assets/login-animation.json';
import Lottie from "lottie-react";

const SignIn = () => {
    const [isClicked, setIsClicked] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const { userSignIn, setUser, signInWithGoogle } = useContext(AuthContext);

    const handleSignIn = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const email = form.get("email");
        const password = form.get("password");

        userSignIn(email, password)
            .then((res) => {
                setUser(res.user);
                Swal.fire({
                    title: "Log In Successful!",
                    text: "You have successfully logged in.",
                    icon: "success",
                    confirmButtonText: "OK",
                    timer: 3000,
                    timerProgressBar: true,
                }).then(() => {
                    navigate(location?.state ? location.state : "/");
                });
            })
            .catch(() => {
                Swal.fire({
                    title: "Login Failed!",
                    text: "Wrong Email or Password!!!",
                    icon: "error",
                    confirmButtonText: "Try Again",
                });
            });
    };

    const handleSignInWithGoogle = () => {
        signInWithGoogle()
            .then((res) => {
                setUser(res.user);
                Swal.fire({
                    title: "Google Sign In Successful!",
                    text: "You have successfully signed in with Google.",
                    icon: "success",
                    confirmButtonText: "OK",
                    timer: 3000,
                    timerProgressBar: true,
                }).then(() => {
                    navigate(location?.state ? location.state : "/");
                });
            })
            .catch(() => {
                Swal.fire({
                    title: "Google Sign In Failed!",
                    text: "An error occurred while signing in with Google.",
                    icon: "error",
                    confirmButtonText: "Try Again",
                });
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-lightBg dark:bg-darkBg">
            <Helmet>
                <title>Sign In - EquiSports</title>
            </Helmet>

            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Side: Login Form */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-lightCard dark:bg-darkCard p-8 rounded-2xl shadow-xl"
                >
                    <h2 className="text-3xl font-bold text-center text-lightText dark:text-darkText mb-6">
                        Welcome Back!
                    </h2>

                    <form onSubmit={handleSignIn} className="space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lightText dark:text-darkText">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full rounded-lg bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-accentColor"
                                required
                            />
                        </div>

                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text text-lightText dark:text-darkText">Password</span>
                            </label>
                            <input
                                type={isClicked ? "password" : "text"}
                                name="password"
                                placeholder="Enter your password"
                                className="input input-bordered w-full rounded-lg bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-accentColor"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setIsClicked(!isClicked)}
                                className="absolute right-3 top-3/4 transform -translate-y-1/2 text-2xl text-lightText dark:text-darkText"
                            >
                                {isClicked ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                            </button>
                        </div>

                        <div className="text-right">
                            <Link
                                to="/auth/forgetPassword"
                                className="text-sm text-accentColor hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full btn bg-lightBtn dark:bg-darkBtn text-white rounded-lg hover:bg-lightBtnHover dark:hover:bg-darkBtnHover transition-all"
                        >
                            Login
                        </button>
                    </form>

                    <div className="divider dark:text-darkText dark:divider">OR</div>

                    <button
                        onClick={handleSignInWithGoogle}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-darkBg text-gray-600 dark:text-gray-200 rounded-lg shadow border border-gray-300 dark:border-gray-700 hover:shadow-md transition-all"
                    >
                        <FcGoogle size={24} />
                        <span>Log In with Google</span>
                    </button>

                    <div className="text-center mt-6">
                        <p className="text-lightText dark:text-darkText">
                            Don't have an account?{" "}
                            <Link
                                to="/auth/signUp"
                                className="text-accentColor hover:underline"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </motion.div>

                {/* Right Side: Animated Illustration */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="hidden lg:flex justify-center items-center"
                >
                    <Lottie
                        animationData={LoginAnimation}
                        loop={true}
                        className="max-w-full h-auto w-full"
                        style={{ maxWidth: '500px' }}
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default SignIn;