import React from 'react';
import { TrendingUp, Users, Truck, Package, DollarSign, Phone } from 'lucide-react';
import { View } from '../App';
import { MockData } from '../data/mockData';
import { StatusChip } from './StatusChip';

interface DashboardProps {
  onNavigate: (view: View, driverId?: string, shipmentId?: string) => void;
  data: MockData;
}

export function Dashboard({ onNavigate, data }: DashboardProps) {
  const metrics = [
    {
      title: 'Active Drivers',
      value: data.drivers.filter(d => d.status === 'active').length,
      icon: Users,
      change: '+12%',
      positive: true
    },
    {
      title: 'Fleet Vehicles',
      value: data.vehicles.length,
      icon: Truck,
      change: '+3%',
      positive: true
    },
    {
      title: 'Total Shipments',
      value: data.shipments.length,
      icon: Package,
      change: '+18%',
      positive: true
    },
    {
      title: 'Monthly Revenue',
      value: `$${data.shipments.reduce((sum, s) => sum + s.priceUsd, 0).toLocaleString()}`,
      icon: DollarSign,
      change: '+24%',
      positive: true
    },
  ];

  const recentShipments = data.shipments.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of your logistics operations</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${metric.positive ? 'bg-blue-50' : 'bg-red-50'}`}>
                <metric.icon className={`w-6 h-6 ${metric.positive ? 'text-blue-600' : 'text-red-600'}`} />
              </div>
              <div className={`flex items-center text-sm font-medium ${
                metric.positive ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className="w-4 h-4 mr-1" />
                {metric.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
            <p className="text-gray-600 text-sm">{metric.title}</p>
          </div>
        ))}
      </div>

      {/* Recent Shipments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Recent Shipments</h2>
            <button
              onClick={() => onNavigate('shipments')}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              View All
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentShipments.map((shipment) => {
                const driver = data.drivers.find(d => d.id === shipment.assignedDriverId);
                return (
                  <tr 
                    key={shipment.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                    onClick={() => onNavigate('shipment-detail', undefined, shipment.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{shipment.clientName}</div>
                        <div className="text-sm text-gray-500">#{shipment.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{shipment.originCity} → {shipment.destinationCity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {shipment.weightTons}t
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${shipment.priceUsd.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusChip status={shipment.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {driver && (
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <Users className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{driver.name}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Phone className="w-3 h-3 mr-1" />
                              {driver.phone}
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}