import React from 'react';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Banner from '../components/Banner';

const HomeLayout = () => {
    return (
        <div>
            <header>
                <NavBar />
            </header>
            <main>
                <section>
                    <Banner/>
                </section>
                <Outlet />
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
};

export default HomeLayout;