import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { ShoppingCart, User, Menu } from "lucide-react";

export default function Navbar() {
  const { cart, user } = useContext(StoreContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-glass sticky-top shadow-sm">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold" to="/">
          Supermarket Demo
        </Link>

        {/* Toggler (hamburger button) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <Menu className="text-white" />
        </button>

        {/* Collapsible content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/beauty">
                Beauty
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/groceries">
                Groceries
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/furniture">
                Furniture
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto align-items-center">

            {user && (
              <li className="nav-item nav-link d-flex align-items-center">
                <User size={20} className="me-1" />
                Hello, {user.email}
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/cart">
                <ShoppingCart size={20} className="me-1" />
                Cart ({cart.length})
              </Link>
            </li>

            {!user && (
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center" to="/login">
                  <User size={20} className="me-1" />
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}