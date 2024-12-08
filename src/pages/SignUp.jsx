import { useContext, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
    const [isClicked, setIsClicked] = useState(true);
    const [error, setError] = useState("");
    const { createNewUser, updateUserProfile, signInWithGoogle, setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const sweetAlert = () => {
        Swal.fire({
            title: "Sign-Up Successful!",
            text: "You have successfully signed up. You will be redirected shortly, or click OK to proceed immediately.",
            icon: "success",
            confirmButtonText: "OK",
            timer: 3000,
            timerProgressBar: true,
        }).then((result) => {
            if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                navigate("/");
            }
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
                const newUser = { name: res.user.displayName, photo: res.user.photoURL, email: res.user.email };
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
            <div className="card bg-lightCard dark:bg-darkCard w-full max-w-xl mx-auto p-6 rounded-xl shadow-2xl">
                <form onSubmit={handleSignUp} className="card-body space-y-6">
                    <h2 className="text-2xl font-bold text-center text-lightText dark:text-darkText">
                        Create Your Account
                    </h2>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lightText dark:text-darkText">Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            className="input input-bordered w-full rounded-lg bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accentColor"
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
                            className="input input-bordered w-full rounded-lg bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accentColor"
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
                            className="input input-bordered w-full rounded-lg bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accentColor"
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
                            className="input input-bordered w-full rounded-lg bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accentColor"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setIsClicked(!isClicked)}
                            className="absolute right-5 top-[3rem] text-2xl text-lightText dark:text-darkText"
                        >
                            {isClicked ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                        </button>
                    </div>
                    {error && <p className="text-center text-red-600">{error}</p>}
                    <div className="form-control mt-6">
                        <button type="submit" className="btn bg-lightBtn dark:bg-darkBtn text-lightText  font-bold text-lg hover:bg-lightBtnHover dark:hover:bg-darkBtnHover rounded-xl">
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className="text-center mt-6 text-lightText dark:text-darkText">
                    <span>Already have an account?</span>{" "}
                    <Link to="/auth/signIn" className="link link-hover text-accentColor">
                        Log In
                    </Link>
                </div>
                <div className="w-full flex justify-center py-6">
                    <button
                        onClick={handleSignUpWithGoogle}
                        className="flex items-center gap-2 px-6 py-3 bg-lightCard dark:bg-darkCard text-lightText dark:text-darkText rounded-lg shadow hover:shadow-md transition-all duration-300 border border-cardBorder"
                    >
                        <FcGoogle size={24} />
                        <span className="text-lg font-medium">Sign Up with Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
