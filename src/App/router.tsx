import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout"
import Home from "./pages/home"
import Game from "./pages/play";
import Credit from "./pages/credit";
import Dashboard from "./pages/dashboard";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/Astroid' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="credit" element={<Credit />} />

                </Route>
                <Route path="/Astroid/play" element={<Game />} />
            </Routes>
        </BrowserRouter>
    );
}