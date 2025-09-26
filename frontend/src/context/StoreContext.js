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