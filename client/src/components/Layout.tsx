import React from 'react';
import { useLocation } from 'wouter';
import Header from './Header';
import BottomNavigation from './BottomNavigation';
import FloatingCart from './FloatingCart';
import { useCart } from '@/contexts/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const { cartItemCount } = useCart();
  const showFloatingCart = cartItemCount > 0 && location !== '/cart';

  return (
    <div className="mobile-app max-w-sm mx-auto bg-white min-h-screen shadow-xl relative">
      <Header />
      
      <main className="pt-20 pb-24 min-h-screen">
        {children}
      </main>

      {showFloatingCart && <FloatingCart />}
      <BottomNavigation />
    </div>
  );
}
