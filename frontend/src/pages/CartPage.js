import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

export default function CartPage() {
  const { cart, checkout } = useContext(StoreContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container my-5">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-muted">Your cart is empty.</p>
      ) : (
        <>
          <div className="row">
            {cart.map((product, index) => (
              <div key={index} className="col-md-4">
                <div className="card mb-4 shadow-sm">
                  <img src={product.thumbnail} className="card-img-top" alt={product.title} />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">${product.price}</p>
                    <p className="card-text">Quantity: {product.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h4>Total: ${total.toFixed(2)}</h4>
          <button className="btn btn-success" onClick={checkout}>Checkout</button>
        </>
      )}
    </div>
  );
}