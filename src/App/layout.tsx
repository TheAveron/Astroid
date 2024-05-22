import { Outlet } from "react-router-dom";

import Header from './components/common/header';
import Footer from './components/common/footer';
import Left_bar from "./components/common/left_bar";

function Layout() {
    return (
        <>
            <Header />
            <main>
                <Left_bar />
                <div id="content">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Layout;