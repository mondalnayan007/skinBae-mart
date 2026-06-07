import React from 'react';
import Navbar from '../../Components/Header/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Components/Footer/Footer';
import MenuBar from '../../Components/Header/MenuBar';


const MainLayout = () => {
    return (
        <div>
            <header className='sticky top-0 z-100'>
                <Navbar></Navbar>
                <MenuBar></MenuBar>
                
            </header>
            <main>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
             

        </div>
    );
};

export default MainLayout;