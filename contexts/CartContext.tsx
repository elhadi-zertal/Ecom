"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface CartContextType {
  cartCount: number;
  setCartCount: (count: number) => void;
  activeProductId: string | null;
  setActiveProductId: (id: string | null) => void;
  activeProductSlug: string | null;
  setActiveProductSlug: (slug: string | null) => void;
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  setCartCount: () => {},
  activeProductId: null,
  setActiveProductId: () => {},
  activeProductSlug: null,
  setActiveProductSlug: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartCount, setCartCount] = useState<number>(0);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [activeProductSlug, setActiveProductSlug] = useState<string | null>(null);

  // Sync with localStorage if appropriate, or keep simple client state
  useEffect(() => {
    const savedCount = localStorage.getItem("cartCount");
    if (savedCount) {
      setCartCount(parseInt(savedCount) || 0);
    }
  }, []);

  const updateCartCount = (count: number) => {
    setCartCount(count);
    localStorage.setItem("cartCount", count.toString());
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        setCartCount: updateCartCount,
        activeProductId,
        setActiveProductId,
        activeProductSlug,
        setActiveProductSlug,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
