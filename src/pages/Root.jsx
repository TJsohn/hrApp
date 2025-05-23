import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Outlet } from 'react-router';

const Root = () => {

    return (
        <>
        <Header name="React HR App" />
        <main>
            <Outlet />
        </main>
        <Footer year={2025} />
        </>
    );
};

export default Root;