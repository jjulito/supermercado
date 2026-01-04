import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import ProductModal from "../components/ProductModal";
import { toast } from "react-toastify";
import { ShoppingBag, Utensils, Armchair, EyeClosed, ArrowRight } from "lucide-react";

export default function MainPage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [processingIds, setProcessingIds] = useState(new Set());
  const { addToCart } = useContext(StoreContext);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch("https://supermercado-w42d.onrender.com/products?limit=0");
        const data = await res.json();

        const shuffled = data.products.sort(() => 0.5 - Math.random());

        setFeaturedProducts(shuffled.slice(0, 4));
      } catch (err) {
        console.error("Error fetching featured products", err);
      }
    };
    fetchFeatured();
  }, []);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();

    if (processingIds.has(product.id)) return;

    // Add to processing set
    setProcessingIds(prev => new Set(prev).add(product.id));

    addToCart(product);
    toast.success("Product added to cart", {
      icon: <ShoppingBag size={20} />
    });

    // Remove from processing set after 500ms
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

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Hero Section */}
      <section className="bg-dark text-white text-center py-5" style={{ background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3) no-repeat center center/cover' }}>
        <div className="container py-5">
          <h1 className="display-4 fw-bold mb-3">Freshness delivered daily</h1>
          <p className="lead mb-4">Premium quality groceries, furniture, and beauty products at your fingertips.</p>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold text-dark">Shop by Category</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <Link to="/beauty" className="text-decoration-none">
                <div className="card h-100 border-0 shadow-sm category-card text-center py-5 transition-hover">
                  <div className="card-body">
                    <EyeClosed size={48} className="text-primary mb-3" />
                    <h3 className="h4 text-dark">Beauty</h3>
                    <p className="text-muted">Skincare, makeup, and fragrances</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-4">
              <Link to="/groceries" className="text-decoration-none">
                <div className="card h-100 border-0 shadow-sm category-card text-center py-5 transition-hover">
                  <div className="card-body">
                    <Utensils size={48} className="text-success mb-3" />
                    <h3 className="h4 text-dark">Groceries</h3>
                    <p className="text-muted">Fresh produce and kitchen essentials</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-4">
              <Link to="/furniture" className="text-decoration-none">
                <div className="card h-100 border-0 shadow-sm category-card text-center py-5 transition-hover">
                  <div className="card-body">
                    <Armchair size={48} className="text-warning mb-3" />
                    <h3 className="h4 text-dark">Furniture</h3>
                    <p className="text-muted">Stylish decor for your home</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0">Featured Products</h2>

          </div>
          <div className="row">
            {featuredProducts.length === 0 ? (
              <p className="text-center text-muted">Loading featured products...</p>
            ) : (
              featuredProducts.map((product) => (
                <div key={product.id} className="col-sm-6 col-md-3 mb-4">
                  <div
                    className="card h-100 shadow-sm border-0 product-card"
                    onClick={() => handleProductClick(product)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="position-relative">
                      <img
                        src={product.thumbnail}
                        className="card-img-top object-fit-cover"
                        alt={product.title}
                        style={{ height: '200px' }}
                      />
                      <span className="position-absolute top-0 start-0 badge bg-danger m-2">HOT</span>
                    </div>
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title text-truncate" title={product.title}>{product.title}</h5>
                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <span className="fw-bold text-dark fs-5">${product.price}</span>
                        <button
                          className="btn btn-sm btn-custom rounded-circle p-2"
                          onClick={(e) => handleAddToCart(e, product)}
                          style={{
                            opacity: processingIds.has(product.id) ? 0.7 : 1,
                            cursor: processingIds.has(product.id) ? 'not-allowed' : 'pointer'
                          }}
                          title="Add to Cart"
                        >
                          <ShoppingBag size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <ProductModal
        show={showModal}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </div>
  );
}