import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";

export default function CartPage() {
  const { cart, checkout, removeFromCart, decreaseQuantity, addToCart, clearCart } = useContext(StoreContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container my-5">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-muted">Your cart is empty</p>
      ) : (
        <>
          <div className="row">
            {cart.map((product, index) => (
              <div key={index} className="col-md-4">
                <div className="card mb-4 shadow-sm product-card">
                  <img src={product.thumbnail} className="card-img-top" alt={product.title} />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">${product.price}</p>
                    <p className="card-text">Quantity: {product.quantity}</p>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <div className="btn-group">

                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => decreaseQuantity(product.id)}
                        >
                          -
                        </button>


                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => removeFromCart(product.id)}
                        >
                          Remove
                        </button>


                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => addToCart(product)}
                        >
                          +
                        </button>
                      </div>
                    </div>


                    <div className="mt-2">
                      <strong>Subtotal: ${(product.price * product.quantity).toFixed(2)}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-light rounded">
            <h4>Total: ${total.toFixed(2)}</h4>
            <button className="btn btn-success me-2" onClick={checkout}>
              Checkout
            </button>

            <button
              className="btn btn-outline-danger"
              onClick={() => {
                clearCart();
                toast.info("Cart cleared");
              }}
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}