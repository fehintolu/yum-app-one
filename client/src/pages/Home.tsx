import React, { useMemo } from 'react';
import PromoHero from '@/components/PromoHero';
import FoodCard from '@/components/FoodCard';
import { menuItems, categories } from '@/data/mockData';
import { useAppContext } from '@/contexts/AppContext';

export default function Home() {
  const { state, dispatch } = useAppContext();

  const filteredItems = useMemo(() => {
    let items = menuItems;

    // Filter by search query
    if (state.searchQuery) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        item.restaurant.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (state.activeCategory !== 'all') {
      const category = categories.find(cat => cat.slug === state.activeCategory);
      if (category) {
        items = items.filter(item => item.categoryId === category.id);
      }
    }

    return items;
  }, [state.searchQuery, state.activeCategory]);

  const featuredItems = menuItems.filter(item => item.isFeatured);
  const popularItems = menuItems.filter(item => item.isPopular);

  const handleCategoryChange = (slug: string) => {
    dispatch({ type: 'SET_ACTIVE_CATEGORY', payload: slug });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PromoHero />
      
      <div className="px-4 pb-6" id="menu-section">
        {/* Categories */}
        <div className="mb-4">
          <div className="flex space-x-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => handleCategoryChange(category.slug)}
                className={`flex-none px-3 py-1 rounded-full text-xs font-semibold transition-colors touch-feedback ${
                  state.activeCategory === category.slug
                    ? 'bg-primary-red text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Show filtered results if searching or category selected */}
        {(state.searchQuery || state.activeCategory !== 'all') && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-800">
                {state.searchQuery ? `Search Results` : 
                 categories.find(cat => cat.slug === state.activeCategory)?.name || 'Results'}
              </h3>
              <span className="text-xs text-gray-500">
                {filteredItems.length} items
              </span>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <FoodCard key={item.id} item={item} variant="large" />
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500 text-sm">No items found</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Popular Items */}
        {!state.searchQuery && state.activeCategory === 'all' && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-800">Popular Items</h3>
              <button 
                onClick={() => handleCategoryChange('popular')}
                className="text-primary-red text-sm font-semibold touch-feedback"
              >
                View all
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {popularItems.slice(0, 4).map((item) => (
                <FoodCard key={item.id} item={item} variant="small" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
