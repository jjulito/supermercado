import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import { StoreProvider } from "./context/StoreContext";

export default function App() {
  return (
    <StoreProvider>
      <Router>
        <div className="app-root">  
          <NavBar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/beauty" element={<ProductsPage category="beauty" />} />
              <Route path="/groceries" element={<ProductsPage category="groceries" />} />
              <Route path="/furniture" element={<ProductsPage category="furniture" />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </StoreProvider>
  );
}
