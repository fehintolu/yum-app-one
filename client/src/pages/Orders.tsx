import React from 'react';
import { Clock, CheckCircle, Truck, Package } from 'lucide-react';

const mockOrders = [
  {
    id: 1,
    status: 'delivered',
    total: 35.50,
    items: ['Yam fries', 'Fried rice and turkey'],
    restaurant: 'Iya Oyo',
    date: '2024-01-15',
    estimatedTime: 0,
  },
  {
    id: 2,
    status: 'out_for_delivery',
    total: 25.00,
    items: ['Classic Burger'],
    restaurant: 'Burger Palace',
    date: '2024-01-15',
    estimatedTime: 15,
  },
  {
    id: 3,
    status: 'preparing',
    total: 22.00,
    items: ['Creamy Pasta'],
    restaurant: 'Italian Corner',
    date: '2024-01-15',
    estimatedTime: 20,
  },
];

const statusConfig = {
  pending: { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-50', label: 'Order Placed' },
  confirmed: { icon: CheckCircle, color: 'text-blue-500', bg: 'bg-blue-50', label: 'Confirmed' },
  preparing: { icon: Package, color: 'text-orange-500', bg: 'bg-orange-50', label: 'Preparing' },
  out_for_delivery: { icon: Truck, color: 'text-purple-500', bg: 'bg-purple-50', label: 'Out for Delivery' },
  delivered: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50', label: 'Delivered' },
};

export default function Orders() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-4 py-6 border-b">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <p className="text-gray-500 mt-1">Track your recent orders</p>
      </div>

      <div className="px-4 py-6">
        {mockOrders.length > 0 ? (
          <div className="space-y-4">
            {mockOrders.map((order) => {
              const config = statusConfig[order.status as keyof typeof statusConfig];
              const Icon = config.icon;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 animate-fade-in"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg">Order #{order.id}</h3>
                      <p className="text-gray-500 text-sm">{order.restaurant}</p>
                    </div>
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${config.bg}`}>
                      <Icon className={`w-4 h-4 ${config.color}`} />
                      <span className={`text-sm font-medium ${config.color}`}>
                        {config.label}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-gray-600 text-sm">
                      {order.items.join(', ')}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                      <p className="text-gray-500 text-sm">{order.date}</p>
                    </div>
                    
                    {order.estimatedTime > 0 && (
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Estimated delivery</p>
                        <p className="font-semibold text-primary-red">
                          {order.estimatedTime} minutes
                        </p>
                      </div>
                    )}
                  </div>

                  {order.status === 'delivered' && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-primary-red text-white py-2 px-4 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors touch-feedback">
                          Reorder
                        </button>
                        <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors touch-feedback">
                          Rate Order
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">No orders yet</h2>
            <p className="text-gray-500 text-center mb-6">
              When you place your first order, it will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
