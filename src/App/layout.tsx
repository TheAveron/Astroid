import { Outlet } from "react-router-dom";

import Header from './components/common/header';
import Footer from './components/common/footer';
import Left_bar from "./components/common/left_bar";

function Layout() {
    return (
        <>
            <Header />
            <div id="content">
                <Left_bar />
                <main>
                    <Outlet/>
                </main>
            </div>
            <Footer />
        </>
    );
}
  
export default Layout;
  
      