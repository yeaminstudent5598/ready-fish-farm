import Navbar from '../shared/navbar/Navbar';
import Footer from '../shared/footer/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <div><Navbar/></div>
            <div className=''>
                <Outlet/>
            </div>
           <div> <Footer/></div>
        </div>
    );
};

export default MainLayout;