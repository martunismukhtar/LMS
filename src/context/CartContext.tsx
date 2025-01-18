import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
// import axios from "axios";
import { useSession } from "next-auth/react";

interface CartItem {
  id: string;
  course_id: string;
  price: number;
  quantity: number;
  course?: {
    title:string;
    description:string;
  }
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const {data:session} = useSession()
//   const userId = session; // Replace with actual user ID from auth
  
  const loadCart = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart/${session?.id}` as string
      );
      const data = await response.json();          
      setCart(data[0].cartitem || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }, [session?.id]);

  // Fetch cart on initial load
  useEffect(() => {
    if (session) {    
    loadCart();
}
  }, [session, loadCart]);

  const saveCart = async (updatedCart: CartItem[]) => {
    // console.log(updatedCart)
    try {
        const res = fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart` as string, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id : session?.id,
                cartItems: updatedCart
            }),
        })
        .then((res) => res.json())
        .catch((err) => {
          return err;
        });
        // if(res.status === 200){
        //     setCart(updatedCart);
        // }
       
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  };

  const addToCart = (item: CartItem) => {        
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.course_id === item.course_id);
      const updatedCart = existingItem
        ? prev.map((cartItem) =>
            cartItem.course_id === item.course_id
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          )
        : [...prev, item];
      saveCart(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const updatedCart = prev.filter((item) => item.id !== id);
      saveCart(updatedCart);
      return updatedCart;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) => {
      const updatedCart = prev.map((item) => 
        item.id === id ? { ...item, quantity } : item
      );
      saveCart(updatedCart);
      return updatedCart;
    });    
  };

  const clearCart = () => {
    setCart([]);
    saveCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
