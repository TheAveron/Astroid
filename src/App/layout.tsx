import { Outlet } from "react-router-dom";

import Header from './components/common/header';
import Footer from './components/common/footer';


function Layout() {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}
  
export default Layout;
  
      