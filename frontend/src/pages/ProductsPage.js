import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import { ShoppingBag } from "lucide-react";
import ProductModal from "../components/ProductModal";

export default function ProductsPage({ category }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [processingIds, setProcessingIds] = useState(new Set());
  const { addToCart } = useContext(StoreContext);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:5001/products?limit=0");
        const data = await res.json();

        let filtered = [];

        if (category === "beauty") {
          filtered = data.products.filter(p =>
            ["beauty", "fragrances", "skin-care"].includes(p.category.toLowerCase())
          );
        } else if (category === "groceries") {
          filtered = data.products.filter(p =>
            ["groceries", "kitchen-accessories"].includes(p.category.toLowerCase())
          );
        } else if (category === "furniture") {
          filtered = data.products.filter(p =>
            ["furniture", "home-decoration"].includes(p.category.toLowerCase())
          );
        }

        setProducts(filtered);
      } catch (err) {
        console.error(err);
        setProducts([
          {
            id: 1,
            title: "Demo Product 1",
            price: 19.99,
            category: category,
            thumbnail: "https://via.placeholder.com/150",
            description: "Demo description"
          },
          {
            id: 2,
            title: "Demo Product 2",
            price: 29.99,
            category: category,
            thumbnail: "https://via.placeholder.com/150",
            description: "Demo description"
          }
        ]);
        toast.error("API Error: Using demo data");
      }
    }

    fetchProducts();
  }, [category]);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();

    if (processingIds.has(product.id)) return;

    setProcessingIds(prev => new Set(prev).add(product.id));

    addToCart(product);
    toast.success("Product added to cart", {
      icon: <ShoppingBag size={20} />
    });

    setTimeout(() => {
      setProcessingIds(prev => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 500);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const getCategoryTitle = (cat) => {
    const titles = {
      beauty: "Beauty Products",
      groceries: "Groceries",
      furniture: "Furniture"
    };
    return titles[cat] || cat;
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-capitalize">
        {getCategoryTitle(category)}
      </h2>
      <div className="row">
        {products.length === 0 && <p className="text-muted">No products found.</p>}
        {products.map(p => (
          <div key={p.id} className="col-md-3 mb-4">
            <div
              className="card h-100 shadow-sm product-card"
              onClick={() => handleProductClick(p)}
              style={{ cursor: 'pointer' }}
            >
              <img src={p.thumbnail} alt={p.title} className="card-img-top" />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text text-muted">${p.price}</p>
                <button
                  className="btn btn-custom mt-auto"
                  onClick={(e) => handleAddToCart(e, p)}
                  style={{
                    opacity: processingIds.has(p.id) ? 0.7 : 1,
                    cursor: processingIds.has(p.id) ? 'not-allowed' : 'pointer'
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProductModal
        show={showModal}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </div>
  );
}