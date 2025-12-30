import React, { createContext, useState, useContext } from 'react';

const translations = {
  es: {
    navbar: {
      brand: "Supermercado Demo",
      beauty: "Belleza",
      groceries: "Abarrotes",
      furniture: "Muebles",
      greeting: "Hola",
      cart: "Carrito",
      login: "Iniciar Sesión"
    },
    products: {
      beauty: "Productos de Belleza",
      groceries: "Abarrotes",
      furniture: "Muebles",
      addToCart: "Agregar al Carrito",
      price: "$",
      notFound: "No se encontraron productos.",
      description: "Descripción"
    },
    cart: {
      title: "Tu Carrito",
      empty: "Tu carrito está vacío",
      total: "Total",
      checkout: "Pagar",
      shopNow: "Comprar Ahora",
      quantity: "Cantidad",
      remove: "Eliminar",
      subtotal: "Subtotal",
      clear: "Vaciar Carrito",
      confirmClear: "¿Estás seguro de que deseas vaciar el carrito?"
    },
    notifications: {
      addedToCart: "Producto agregado al carrito"
    }
  },
  en: {
    navbar: {
      brand: "Supermarket Demo",
      beauty: "Beauty",
      groceries: "Groceries",
      furniture: "Furniture",
      greeting: "Hello",
      cart: "Cart",
      login: "Login"
    },
    products: {
      beauty: "Beauty Products",
      groceries: "Groceries",
      furniture: "Furniture",
      addToCart: "Add to Cart",
      price: "$",
      notFound: "No products found.",
      description: "Description"
    },
    cart: {
      title: "Your Cart",
      empty: "Your cart is empty",
      total: "Total",
      checkout: "Checkout",
      shopNow: "Shop Now",
      quantity: "Quantity",
      remove: "Remove",
      subtotal: "Subtotal",
      clear: "Clear Cart",
      confirmClear: "Are you sure you want to clear the cart?"
    },
    notifications: {
      addedToCart: "Product added to cart"
    }
  }
};

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es'); // Default to Spanish

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (let k of keys) {
      value = value ? value[k] : null;
    }
    return value || key;
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
