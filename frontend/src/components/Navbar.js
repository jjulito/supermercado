import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

export default function Navbar() {
  const { cart, user } = useContext(StoreContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
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
          <span className="navbar-toggler-icon"></span>
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
          <ul className="navbar-nav ms-auto">
            {user && (
              <li className="nav-item nav-link">Hello, {user.email}</li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart ({cart.length})
              </Link>
            </li>
            {!user && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
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