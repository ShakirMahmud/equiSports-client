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
        <div>
            <header>
                <NavBar />
            </header>
            <main >
                <section>
                    <Banner/>
                </section>
                <section className='w-4/5 mx-auto'>
                    <CategoryBtns/>
                </section>
                <section className='w-11/12 mx-auto'>
                    <Testimonials/>
                </section>
                <section>
                    <StoreLocationMap/>
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