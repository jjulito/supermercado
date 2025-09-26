import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../context/StoreContext";

export default function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(StoreContext);

  const categories = ["beauty", "groceries", "furniture"];

  useEffect(() => {
    const fetchAllProducts = async () => {
      let allProducts = [];
      for (let category of categories) {
        const res = await fetch(`https://supermercado-demo-1.onrender.com/products/category/${category}`);
        const data = await res.json();
        allProducts = allProducts.concat(data.products);
      }
      setProducts(allProducts);
    };
    fetchAllProducts();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="mb-4">All Products</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
            <div className="card mb-4 shadow-sm h-100">
              <img src={product.thumbnail} className="card-img-top" alt={product.title} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">${product.price}</p>
                <button className="btn btn-primary mt-auto" onClick={() => addToCart(product)}>
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