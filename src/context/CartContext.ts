// src/context/CartContext.ts
import { createContext } from 'react';
import type { MenuItem } from '../config/menuData';

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  decrementQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
}

// Pure object export - NO components here, Fast Refresh is safe
export const CartContext = createContext<CartContextType | undefined>(undefined);