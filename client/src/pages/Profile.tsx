import React from 'react';
import { User, MapPin, Phone, Mail, Settings, CreditCard, HelpCircle, LogOut, Edit } from 'lucide-react';
import { user } from '@/data/mockData';

const menuItems = [
  { icon: Edit, label: 'Edit Profile', action: 'edit_profile' },
  { icon: MapPin, label: 'Manage Addresses', action: 'addresses' },
  { icon: CreditCard, label: 'Payment Methods', action: 'payment' },
  { icon: Settings, label: 'Settings', action: 'settings' },
  { icon: HelpCircle, label: 'Help & Support', action: 'help' },
  { icon: LogOut, label: 'Sign Out', action: 'logout', danger: true },
];

export default function Profile() {
  const handleMenuAction = (action: string) => {
    switch (action) {
      case 'logout':
        // TODO: Implement logout functionality
        alert('Logout functionality will be implemented');
        break;
      default:
        // TODO: Implement other menu actions
        alert(`${action} functionality will be implemented`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-4 py-6 border-b">
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>

      {/* User Info */}
      <div className="bg-white mx-4 my-6 rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-primary-red rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">{user.fullName}</h2>
            <p className="text-gray-500">@{user.username}</p>
          </div>
          <button
            onClick={() => handleMenuAction('edit_profile')}
            className="p-2 text-gray-400 hover:text-primary-red transition-colors touch-feedback"
          >
            <Edit className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-gray-600">
            <Mail className="w-4 h-4" />
            <span className="text-sm">{user.email}</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600">
            <Phone className="w-4 h-4" />
            <span className="text-sm">{user.phone}</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{user.address}</span>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="mx-4 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === menuItems.length - 1;
            
            return (
              <button
                key={item.action}
                onClick={() => handleMenuAction(item.action)}
                className={`w-full flex items-center space-x-4 px-6 py-4 hover:bg-gray-50 transition-colors touch-feedback ${
                  !isLast ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className={`p-2 rounded-full ${
                  item.danger ? 'bg-red-50' : 'bg-gray-100'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    item.danger ? 'text-red-500' : 'text-gray-600'
                  }`} />
                </div>
                <span className={`flex-1 text-left font-medium ${
                  item.danger ? 'text-red-500' : 'text-gray-800'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* App Info */}
      <div className="mx-4 mb-6 text-center">
        <p className="text-gray-500 text-sm">Yum Delivery App</p>
        <p className="text-gray-400 text-xs">Version 1.0.0</p>
      </div>
    </div>
  );
}
