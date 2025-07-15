import React from 'react';

export default function PromoHero() {
  const handleOrderNow = () => {
    // Scroll to menu section or navigate to featured items
    const menuSection = document.getElementById('menu-section');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gradient-to-r from-red-600 to-primary-red rounded-2xl p-4 relative overflow-hidden mx-4 mt-4 mb-4 animate-fade-in">
      <div className="relative z-10">
        <p className="text-xs font-medium mb-1 text-white">Get special discount</p>
        <h2 className="text-lg font-bold leading-tight mb-3 text-white">
          The Fastest in<br />Delivery Food
        </h2>
        <button
          onClick={handleOrderNow}
          className="bg-black text-white px-4 py-2 rounded-full font-semibold text-xs hover:bg-gray-800 transition-colors touch-feedback"
        >
          Order Now
        </button>
      </div>
      
      {/* Scooter illustration */}
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <div className="relative">
          {/* Scooter body */}
          <div className="w-16 h-10 bg-red-700 rounded-lg relative">
            {/* Handlebar */}
            <div className="absolute -top-2 left-1 w-4 h-1 bg-gray-800 rounded"></div>
            {/* Seat */}
            <div className="absolute top-1 left-10 w-4 h-3 bg-gray-700 rounded-t-lg"></div>
            {/* Delivery box */}
            <div className="absolute -top-1 right-1 w-4 h-4 bg-yellow-accent rounded"></div>
          </div>
          {/* Wheels */}
          <div className="absolute -bottom-1 left-1 w-4 h-4 bg-gray-700 rounded-full border border-gray-300"></div>
          <div className="absolute -bottom-1 right-1 w-4 h-4 bg-gray-700 rounded-full border border-gray-300"></div>
        </div>
      </div>
    </div>
  );
}
