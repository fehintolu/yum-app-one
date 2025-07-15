import React from 'react';
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';
import { useCart } from '@/contexts/AppContext';

export default function Cart() {
  const [, setLocation] = useLocation();
  const { cartItems, cartTotal, cartItemCount, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleBack = () => {
    setLocation('/');
  };

  const handleCheckout = () => {
    // TODO: Implement checkout process
    alert('Checkout functionality will be implemented with payment integration');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white px-4 py-6 border-b">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-full touch-feedback"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">Your Cart</h1>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center px-4 py-20">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <Trash2 className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 text-center mb-6">
            Looks like you haven't added anything to your cart yet
          </p>
          <button
            onClick={handleBack}
            className="bg-primary-red text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600 transition-colors touch-feedback"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-full touch-feedback"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">Your Cart</h1>
          </div>
          <button
            onClick={clearCart}
            className="text-primary-red font-semibold touch-feedback"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Cart Items */}
      <div className="px-4 py-6">
        <div className="space-y-4 mb-6">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className="flex space-x-4">
                <img
                  src={item.menuItem.image || '/placeholder-food.jpg'}
                  alt={item.menuItem.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{item.menuItem.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{item.menuItem.restaurant}</p>
                  <p className="font-bold text-lg">${item.menuItem.price}</p>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors touch-feedback"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  
                  <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-2 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      className="p-1 hover:bg-white rounded-full transition-colors touch-feedback"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-semibold min-w-[24px] text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-white rounded-full transition-colors touch-feedback"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <h3 className="font-bold text-lg mb-4">Order Summary</h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal ({cartItemCount} items)</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>$3.50</span>
            </div>
            <div className="flex justify-between">
              <span>Service Fee</span>
              <span>$1.50</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${(cartTotal + 5).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          className="w-full bg-primary-red text-white py-4 rounded-2xl font-bold text-lg hover:bg-red-600 transition-colors touch-feedback"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
