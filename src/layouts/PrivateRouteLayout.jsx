import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const PrivateRouteLayout = () => {
    return (
        <div>
            <div className='sticky top-0 z-50 backdrop-blur bg-white/80 transition-all duration-300'>
                <NavBar />
            </div>
            <section>
                <Outlet/>
            </section>
            <section>
                <Footer/>
            </section>
        </div>
    );
};

export default PrivateRouteLayout;