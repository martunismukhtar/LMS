import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";

import { useSession } from "next-auth/react";
import axios from "axios";

interface CartItem {
  id: string;
  course_id: string;
  price: string;
  quantity: number;
  course?: {
    title: string;
    description: string;
  };
}

interface CartContextType {
  myclass: number;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [myclass, setMyclass] = useState<number>(0);
  const { data: session } = useSession();
  //   const userId = session; // Replace with actual user ID from auth

  const loadClass = useCallback(async () => {
    if (session?.id) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/myclass/${session?.id}` as string
        );
        const data = await response.json();
        setMyclass(data.length);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    }
  }, [session?.id]);

  useEffect(() => {
    if (session?.id) {
      loadClass();
    }
  }, [session?.id, loadClass]);

  const loadCart = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart/${session?.id}` as string
      );
      const data = await response.json();
      if (data.length > 0) {
        setCart(data[0].cartitem || []);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }, [session?.id]);

  // Fetch cart on initial load
  useEffect(() => {
    if (session?.id) {
      loadCart();
    }
  }, [session?.id, loadCart]);

  const simpanCart = useCallback(async () => {
    // console.log(cart)
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`, {
        user_id: session?.id,
        cartItems: cart,
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        console.error("Error saving cart:", error.response?.data.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  }, [cart, session?.id]);

  useEffect(() => {
    if (cart.length > 0) {
      simpanCart();
    }
  }, [cart, simpanCart]);
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (cartItem) => cartItem.course_id === item.course_id
      );
      const updatedCart = existingItem
        ? prev.map((cartItem) =>
            cartItem.course_id === item.course_id
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          )
        : [...prev, item];
      return updatedCart;
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const updatedCart = prev.filter((item) => item.id !== id);
      return updatedCart;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) => {
      const updatedCart = prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        myclass,
      }}
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
