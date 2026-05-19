import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

/**
 * Custom hook to safely consume the Cart Context.
 * Ensures strict runtime checks across the luxury order state.
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};