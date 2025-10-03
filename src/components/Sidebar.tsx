import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Truck, 
  Package, 
  Building2, 
  UserCheck,
  DollarSign,
  Settings,
  LogOut 
} from 'lucide-react';
import { View } from '../App';

interface SidebarProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

export function Sidebar({ currentView, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'shipments', label: 'Shipments', icon: Package },
    { id: 'customers', label: 'Customers', icon: Building2 },
    { id: 'vendors', label: 'Vendors', icon: UserCheck },
    { id: 'drivers', label: 'Drivers', icon: Users },
    { id: 'fleet', label: 'Fleet', icon: Truck },
    { id: 'finance', label: 'Finance', icon: DollarSign },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold">LogiPro</h1>
        <p className="text-slate-400 text-sm">Logistics Management</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id as View)}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                  currentView === item.id || 
                  (item.id === 'customers' && (currentView === 'customer-detail' || currentView === 'customer-form')) ||
                  (item.id === 'vendors' && (currentView === 'vendor-detail' || currentView === 'vendor-form')) ||
                  (item.id === 'drivers' && currentView === 'driver-profile') ||
                  (item.id === 'shipments' && currentView === 'shipment-detail')
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button className="w-full flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-all duration-200">
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  );
}