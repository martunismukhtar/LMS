"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./CartContext";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>{children}</CartProvider>
    </SessionProvider>
  );
}
