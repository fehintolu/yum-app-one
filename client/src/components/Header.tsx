import React, { useState } from 'react';
import { Search, MapPin, Bell, ShoppingCart } from 'lucide-react';
import { useLocation } from 'wouter';
import { useAppContext, useCart } from '@/contexts/AppContext';

export default function Header() {
  const [, setLocation] = useLocation();
  const { state, dispatch } = useAppContext();
  const { cartItemCount, toggleCart } = useCart();
  const [searchValue, setSearchValue] = useState(state.searchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    dispatch({ type: 'SET_SEARCH_QUERY', payload: value });
  };

  const handleCartClick = () => {
    if (cartItemCount > 0) {
      setLocation('/cart');
    }
  };

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-primary-red text-white px-3 py-2 z-30 safe-area-top">
      {/* Location and Notifications */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-1">
          <MapPin className="w-4 h-4 text-white" />
          <span className="font-medium text-sm">{state.location}</span>
        </div>
        <div className="relative">
          <Bell className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 bg-yellow-accent text-xs rounded-full h-4 w-4 flex items-center justify-center text-gray-800 font-semibold text-xs">
            3
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="bg-white rounded-full px-3 py-2 flex items-center space-x-2">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
            className="flex-1 outline-none text-gray-700 text-sm"
          />
          <button
            onClick={handleCartClick}
            className="relative touch-feedback"
          >
            <ShoppingCart className="w-5 h-5 text-primary-red" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary-red text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-semibold text-xs">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
