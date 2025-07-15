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
    <div className="bg-primary-red text-white px-4 py-3 rounded-b-3xl safe-area-top">
      {/* Location and Notifications */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-white" />
          <span className="font-medium text-lg">{state.location}</span>
        </div>
        <div className="relative">
          <Bell className="w-6 h-6 text-white" />
          <span className="absolute -top-2 -right-2 bg-yellow-accent text-xs rounded-full h-5 w-5 flex items-center justify-center text-gray-800 font-semibold">
            3
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="bg-white rounded-full px-4 py-3 flex items-center space-x-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
            className="flex-1 outline-none text-gray-700 font-medium"
          />
          <button
            onClick={handleCartClick}
            className="relative touch-feedback"
          >
            <ShoppingCart className="w-6 h-6 text-primary-red" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
