import React from 'react';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import CategoryBtns from '../components/CategoryBtns';
import Testimonials from '../components/Testimonials';
import StoreLocationMap from '../components/StoreLocationMap';

const HomeLayout = () => {
    return (
        <div className="bg-lightBg dark:bg-darkBg transition-colors duration-300">
            {/* Header */}
            <header className="sticky top-0 z-50 backdrop-blur bg-navLightBg dark:bg-navDarkBg transition-all duration-300">
                <NavBar />
            </header>

            {/* Main Content */}
            <main className="transition-all duration-300">
                <section>
                    <Banner />
                </section>

                {/* Category Buttons Section */}
                <section className="w-4/5 mx-auto">
                    <CategoryBtns />
                </section>

                {/* Testimonials Section */}
                <section className="">
                    <Testimonials />
                </section>

                {/* Store Location Map Section */}
                <section>
                    <StoreLocationMap />
                </section>

                {/* Outlet for nested routes */}
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-footerLightBg dark:bg-footerDarkBg transition-all duration-300">
                <Footer />
            </footer>
        </div>
    );
};

export default HomeLayout;
