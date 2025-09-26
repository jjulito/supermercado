import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../context/StoreContext";

export default function ProductsPage({ category }) {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(StoreContext);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://supermercado-demo-1.onrender.com/products?limit=100");
        const data = await res.json();

        let filtered = [];

        if (category === "beauty") {
          filtered = data.products.filter(p =>
            ["beauty", "fragrances"].includes(p.category.toLowerCase())
          );
        } else if (category === "groceries") {
          filtered = data.products.filter(p =>
            ["groceries"].includes(p.category.toLowerCase())
          );
        } else if (category === "furniture") {
          filtered = data.products.filter(p =>
            ["furniture"].includes(p.category.toLowerCase())
          );
        }

        setProducts(filtered);
      } catch (err) {
        console.error(err);
      }
    }

    fetchProducts();
  }, [category]);

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-capitalize">{category} Products</h2>
      <div className="row">
        {products.length === 0 && <p className="text-muted">No products found.</p>}
        {products.map(p => (
          <div key={p.id} className="col-md-3 mb-4">
            <div className="card h-100 shadow-sm">
              <img src={p.thumbnail} alt={p.title} className="card-img-top" />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text text-muted">${p.price}</p>
                <button
                  className="btn btn-success mt-auto"
                  onClick={() => addToCart(p)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}