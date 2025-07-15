import React from 'react';
import { Heart } from 'lucide-react';
import FoodCard from '@/components/FoodCard';
import { useAppContext } from '@/contexts/AppContext';

export default function Saved() {
  const { state } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-4 py-6 border-b">
        <h1 className="text-2xl font-bold">Saved Items</h1>
        <p className="text-gray-500 mt-1">Your favorite foods</p>
      </div>

      <div className="px-4 py-6">
        {state.savedItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {state.savedItems.map((item) => (
              <FoodCard key={item.id} item={item} variant="large" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">No saved items</h2>
            <p className="text-gray-500 text-center mb-6">
              Save your favorite foods by tapping the heart icon
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
