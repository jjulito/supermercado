import React, { useState, useContext } from "react";
import { StoreContext } from "../context/StoreContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser, logout, history } = useContext(StoreContext);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setUser({ email });
    } else {
      alert("Please fill in all fields");
    }
  };

  if (user) {
    return (
      <div className="container my-5">
        <h2>Welcome back, {user.email}!</h2>
        <button className="btn btn-danger my-3" onClick={logout}>Logout</button>
        <h4>Purchase History</h4>
        {history.length === 0 ? (
          <p>No purchases yet.</p>
        ) : (
          <ul className="list-group">
            {history.map((item, index) => (
              <li key={index} className="list-group-item">
                {item.title} - Qty: {item.quantity}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Login</h3>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}