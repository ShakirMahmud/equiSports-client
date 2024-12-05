import React from 'react';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const HomeLayout = () => {
    return (
        <div>
            <header>
                <NavBar />
            </header>
            <main>
                <section>
                    
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