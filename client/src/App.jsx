import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Notices from "./pages/Notices";
import Gallery from "./pages/Gallery";
import Feedback from "./pages/Feedback";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/notices" element={<Notices />} />

        <Route path="/gallery" element={<Gallery />} />

        <Route path="/feedback" element={<Feedback />} />

        <Route path="/admin-login" element={<AdminLogin />} />

        <Route path="/admin" element={<Admin />} />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;