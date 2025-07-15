import React from 'react';
import { Home, Receipt, Heart, User } from 'lucide-react';
import { useLocation, Link } from 'wouter';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/orders', icon: Receipt, label: 'My Order' },
  { path: '/saved', icon: Heart, label: 'Saved' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNavigation() {
  const [location] = useLocation();

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 z-10 safe-area-bottom">
      <div className="flex items-center justify-around py-3">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location === path;
          
          return (
            <Link
              key={path}
              href={path}
              className={`flex flex-col items-center space-y-1 transition-colors touch-feedback ${
                isActive ? 'text-primary-red' : 'text-gray-400 hover:text-primary-red'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className={`text-xs ${isActive ? 'font-semibold' : 'font-medium'}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
