import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout"
import Home from "./components/home/home"

export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }