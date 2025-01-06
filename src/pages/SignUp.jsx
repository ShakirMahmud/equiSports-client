import { useContext, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import SignUpAnimation from '../assets/signup-animation.json'; // Adjust the path as needed

const SignUp = () => {
    const [isClicked, setIsClicked] = useState(true);
    const [error, setError] = useState("");
    const { createNewUser, updateUserProfile, signInWithGoogle, setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const sweetAlert = () => {
        Swal.fire({
            title: "Sign-Up Successful!",
            text: "You have successfully signed up.",
            icon: "success",
            confirmButtonText: "OK",
            timer: 3000,
            timerProgressBar: true,
        }).then(() => {
            navigate("/");
        });
    };

    const postToDB = (newUser) => {
        fetch("https://equi-sports-server-shakir.vercel.app/users", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    console.log("User created successfully at db");
                }
            });
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const name = form.get("name");
        const photo = form.get("photo");
        const email = form.get("email");
        const password = form.get("password");

        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const isValidLength = password.length >= 6;

        if (!hasUppercase) {
            setError("Password must contain at least one uppercase letter.");
            return;
        }
        if (!hasLowercase) {
            setError("Password must contain at least one lowercase letter.");
            return;
        }
        if (!isValidLength) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        createNewUser(email, password)
            .then((res) => {
                setUser(res.user);
                setError("");
                const newUser = { name, photo, email };
                postToDB(newUser);

                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {
                        sweetAlert();
                    })
                    .catch((err) => {
                        console.error(err.code);
                        setError("Failed to update profile.");
                    });
            })
            .catch((err) => {
                console.error(err.code);
                setError("Failed to sign up.");
            });
    };

    const handleSignUpWithGoogle = () => {
        signInWithGoogle()
            .then((res) => {
                setUser(res.user);
                const newUser = {
                    name: res.user.displayName,
                    photo: res.user.photoURL,
                    email: res.user.email
                };
                postToDB(newUser);
                sweetAlert();
            })
            .catch((err) => {
                console.error(err.code);
                setError("Failed to sign up with Google.");
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-lightBg dark:bg-darkBg">
            <Helmet>
                <title>Sign Up - EquiSports</title>
            </Helmet>

            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Side: Animated Illustration */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="hidden lg:flex justify-center items-center"
                >
                    <Lottie
                        animationData={SignUpAnimation}
                        loop={true}
                        className="max-w-full h-auto w-full"
                        style={{ maxWidth: '500px' }}
                    />
                </motion.div>

                {/* Right Side: Signup Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-lightCard dark:bg-darkCard p-8 rounded-2xl shadow-xl"
                >
                    <h2 className="text-3xl font-bold text-center text-lightText dark:text-darkText mb-6">
                        Create Your Account
                    </h2>

                    <form onSubmit={handleSignUp} className="space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lightText dark:text-darkText">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                className="input input-bordered w-full rounded-lg bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-accentColor"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lightText dark:text-darkText">Photo URL</span>
                            </label>
                            <input
                                type="text"
                                name="photo"
                                placeholder="Your Photo URL"
                                className="input input-bordered w-full rounded-lg bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-accentColor"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lightText dark:text-darkText">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
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
                                placeholder="Your Password"
                                className="input input-bordered w-full rounded-lg bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-accentColor"
                                required
                                // Password validation attributes
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                                title="Must contain at least one number, one uppercase and lowercase letter, and be at least 6 characters long"
                            />
                            <button
                                type="button"
                                onClick={() => setIsClicked(!isClicked)}
                                className="absolute right-3 top-3/4 transform -translate-y-1/2 text-2xl text-lightText dark:text-darkText"
                            >
                                {isClicked ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                            </button>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="text-center text-red-500 text-sm">
                                <p>{error}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full btn bg-lightBtn dark:bg-darkBtn text-white rounded-lg hover:bg-lightBtnHover dark:hover:bg-darkBtnHover transition-all"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="text-center mt-6">
                        <p className="text-lightText dark:text-darkText">
                            Already have an account?{" "}
                            <Link
                                to="/auth/signIn"
                                className="text-accentColor hover:underline"
                            >
                                Log In
                            </Link>
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="divider text-subtitleText">OR</div>

                    {/* Google Sign Up */}
                    <button
                        onClick={handleSignUpWithGoogle}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-darkBg text-gray-600 dark:text-gray-200 rounded-lg shadow border border-gray-300 dark:border-gray-700 hover:shadow-md transition-all"
                    >
                        <FcGoogle size={24} />
                        <span>Sign Up with Google</span>
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default SignUp;