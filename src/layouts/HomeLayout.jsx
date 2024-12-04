import React from 'react';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
    return (
        <div>
            <header>
                <NavBar/>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    );
};

export default HomeLayout;