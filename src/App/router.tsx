import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout"
import Home from "./pages/home"

export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/Astroid' element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }