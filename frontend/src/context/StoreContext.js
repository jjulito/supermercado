import React, { createContext, useState } from "react";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex(item => item.id === product.id);
      if (index !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[index].quantity += 1;
        return updatedCart;
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

   const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex(item => item.id === productId);
      if (index !== -1) {
        const updatedCart = [...prevCart];
        if (updatedCart[index].quantity > 1) {
          updatedCart[index].quantity -= 1;
        } else {
          return updatedCart.filter(item => item.id !== productId);
        }
        return updatedCart;
      }
      return prevCart;
    });
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setHistory([]);
  };

  const checkout = () => {
    setHistory((prev) => [...prev, ...cart]);
    setCart([]);
  };

  return (
    <StoreContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      decreaseQuantity,
      user,
      setUser,
      logout,
      history,
      checkout
    }}>
      {children}
    </StoreContext.Provider>
  );
};