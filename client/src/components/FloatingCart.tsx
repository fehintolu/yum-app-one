import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useLocation } from 'wouter';
import { useCart } from '@/contexts/AppContext';

export default function FloatingCart() {
  const [, setLocation] = useLocation();
  const { cartTotal, cartItemCount } = useCart();

  const handleCartClick = () => {
    setLocation('/cart');
  };

  if (cartItemCount === 0) return null;

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-20 animate-scale-in">
      <button
        onClick={handleCartClick}
        className="bg-primary-red text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 hover:bg-red-600 transition-all transform hover:scale-105 touch-feedback"
      >
        <ShoppingCart className="w-5 h-5" />
        <span className="font-semibold">Cart</span>
        <span className="font-bold">${cartTotal.toFixed(2)}</span>
      </button>
    </div>
  );
}
