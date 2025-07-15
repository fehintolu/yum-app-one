import React from 'react';
import { Star, Clock, Plus, Heart } from 'lucide-react';
import { MenuItem } from '@shared/schema';
import { useCart, useAppContext } from '@/contexts/AppContext';

interface FoodCardProps {
  item: MenuItem;
  variant?: 'large' | 'small';
}

export default function FoodCard({ item, variant = 'large' }: FoodCardProps) {
  const { addToCart } = useCart();
  const { state, dispatch } = useAppContext();
  
  const isSaved = state.savedItems.some(savedItem => savedItem.id === item.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(item);
  };

  const handleToggleSaved = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'TOGGLE_SAVED_ITEM', payload: item });
  };

  if (variant === 'small') {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
        <div className="p-3">
          <div className="relative">
            <img
              src={item.image || '/placeholder-food.jpg'}
              alt={item.name}
              className="w-full h-24 rounded-xl object-cover mb-3"
              loading="lazy"
            />
            <button
              onClick={handleToggleSaved}
              className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                isSaved ? 'bg-primary-red text-white' : 'bg-white text-gray-400'
              }`}
            >
              <Heart className="w-3 h-3" fill={isSaved ? 'currentColor' : 'none'} />
            </button>
          </div>
          
          <div className="flex items-center space-x-1 mb-1">
            <Star className="w-3 h-3 text-yellow-400" fill="currentColor" />
            <span className="font-semibold text-xs">{item.rating}</span>
          </div>
          
          <h5 className="font-bold text-xs mb-1 line-clamp-1">{item.name}</h5>
          <p className="text-gray-500 text-xs mb-2 line-clamp-1">{item.restaurant}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold">${item.price}</span>
            <button
              onClick={handleAddToCart}
              className="bg-primary-red text-white w-5 h-5 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors touch-feedback"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
      <div className="flex p-4">
        <div className="flex-1">
          <div className="relative">
            <img
              src={item.image || '/placeholder-food.jpg'}
              alt={item.name}
              className="w-20 h-20 rounded-xl object-cover"
              loading="lazy"
            />
            <button
              onClick={handleToggleSaved}
              className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                isSaved ? 'bg-primary-red text-white' : 'bg-white text-gray-400 shadow-sm'
              }`}
            >
              <Heart className="w-3 h-3" fill={isSaved ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
        
        <div className="flex-2 ml-4">
          <div className="flex items-center space-x-2 mb-1">
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-400" fill="currentColor" />
              <span className="font-semibold text-xs">{item.rating}</span>
            </div>
          </div>
          
          <h4 className="font-bold text-sm mb-1">{item.name}</h4>
          <p className="text-gray-500 text-xs mb-1">{item.restaurant}</p>
          
          <div className="flex items-center space-x-3 text-gray-500 text-xs mb-2">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{item.preparationTime} min</span>
            </div>
            <span>{item.calories} Kcal</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">${item.price}</span>
            <button
              onClick={handleAddToCart}
              className="bg-primary-red text-white w-7 h-7 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors touch-feedback"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
