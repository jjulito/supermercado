import React, { useContext, useState } from 'react';
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import { ShoppingBag, X } from "lucide-react";

export default function ProductModal({ show, onClose, product }) {
    const { addToCart } = useContext(StoreContext);
    const [isAdding, setIsAdding] = useState(false);

    if (!show || !product) {
        return null;
    }

    const handleAddToCart = () => {
        if (isAdding) return;
        setIsAdding(true);
        addToCart(product);
        toast.success("Product added to cart", {
            icon: <ShoppingBag size={20} />
        });
        setTimeout(() => {
            setIsAdding(false);
        }, 500);
    };

    return (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content shadow rounded-4 overflow-hidden border-0">
                    <div className="position-relative">
                        <button
                            type="button"
                            className="btn btn-link position-absolute top-0 end-0 m-3 text-dark mb-4"
                            onClick={onClose}
                            style={{ zIndex: 10, padding: '10px', background: 'rgba(255,255,255,0.8)', borderRadius: '50%' }}
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <div className="modal-body pt-5">
                        <div className="row g-4">
                            <div className="col-md-6">
                                <img
                                    src={product.images ? product.images[0] : product.thumbnail}
                                    alt={product.title}
                                    className="img-fluid rounded-3 w-100 object-fit-cover"
                                    style={{ maxHeight: '400px' }}
                                />
                            </div>
                            <div className="col-md-6 d-flex flex-column">
                                <h2 className="fw-bold mb-2 text-dark">{product.title}</h2>
                                <span className="badge bg-secondary mb-3 align-self-start text-uppercase" style={{ fontSize: '0.8rem' }}>
                                    {product.category}
                                </span>

                                <h3 className="text-primary fw-bold mb-3" style={{ color: 'var(--deep-teal) !important' }}>
                                    ${product.price}
                                </h3>

                                <p className="text-muted mb-4" style={{ lineHeight: '1.6' }}>
                                    {product.description}
                                </p>

                                <div className="mt-auto">
                                    <button
                                        className="btn btn-custom w-100 py-3 d-flex align-items-center justify-content-center fw-bold text-uppercase"
                                        onClick={handleAddToCart}
                                        style={{
                                            letterSpacing: '1px',
                                            opacity: isAdding ? 0.7 : 1,
                                            cursor: isAdding ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        <ShoppingBag size={20} className="me-2" />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
