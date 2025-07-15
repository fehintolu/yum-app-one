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
    <div className="bg-gradient-to-r from-red-600 to-primary-red rounded-2xl p-6 relative overflow-hidden mx-4 mb-6 animate-fade-in">
      <div className="relative z-10">
        <p className="text-sm font-medium mb-2 text-white">Get special discount</p>
        <h2 className="text-2xl font-bold leading-tight mb-4 text-white">
          The Fastest in<br />Delivery Food
        </h2>
        <button
          onClick={handleOrderNow}
          className="bg-black text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors touch-feedback"
        >
          Order Now
        </button>
      </div>
      
      {/* Scooter illustration */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <div className="relative">
          {/* Scooter body */}
          <div className="w-20 h-12 bg-red-700 rounded-lg relative">
            {/* Handlebar */}
            <div className="absolute -top-3 left-2 w-6 h-2 bg-gray-800 rounded"></div>
            {/* Seat */}
            <div className="absolute top-1 left-12 w-6 h-4 bg-gray-700 rounded-t-lg"></div>
            {/* Delivery box */}
            <div className="absolute -top-2 right-2 w-6 h-6 bg-yellow-accent rounded"></div>
          </div>
          {/* Wheels */}
          <div className="absolute -bottom-2 left-2 w-6 h-6 bg-gray-700 rounded-full border-2 border-gray-300"></div>
          <div className="absolute -bottom-2 right-2 w-6 h-6 bg-gray-700 rounded-full border-2 border-gray-300"></div>
        </div>
      </div>
    </div>
  );
}
