import React from 'react';
import { ArrowLeft, Users, Phone, Truck, Star, Package, MapPin, DollarSign } from 'lucide-react';
import { View } from '../App';
import { Driver, Shipment } from '../data/mockData';
import { StatusChip } from './StatusChip';

interface DriverProfileProps {
  driverId: string | null;
  onNavigate: (view: View, driverId?: string, shipmentId?: string) => void;
  drivers: Driver[];
  shipments: Shipment[];
}

export function DriverProfile({ driverId, onNavigate, drivers, shipments }: DriverProfileProps) {
  const driver = drivers.find(d => d.id === driverId);
  const driverShipments = shipments.filter(s => s.assignedDriverId === driverId);

  if (!driver) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Driver not found</h2>
        <button
          onClick={() => onNavigate('drivers')}
          className="mt-4 text-blue-600 hover:text-blue-700"
        >
          Back to Drivers
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('drivers')}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Drivers
        </button>
      </div>

      {/* Driver Info Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <Users className="w-10 h-10 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{driver.name}</h1>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                driver.status === 'active' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {driver.status}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center text-gray-600">
                <Phone className="w-5 h-5 mr-3" />
                <span>{driver.phone}</span>
              </div>
              {driver.vehiclePlate && (
                <div className="flex items-center text-gray-600">
                  <Truck className="w-5 h-5 mr-3" />
                  <span>Vehicle: {driver.vehiclePlate}</span>
                </div>
              )}
              <div className="flex items-center text-gray-600">
                <Star className="w-5 h-5 mr-3 text-yellow-400 fill-current" />
                <span>4.8 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{driverShipments.length}</h3>
          <p className="text-gray-600 text-sm">Total Shipments</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-xl">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            ${driverShipments.reduce((sum, s) => sum + s.priceUsd, 0).toLocaleString()}
          </h3>
          <p className="text-gray-600 text-sm">Total Revenue</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-xl">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {driverShipments.filter(s => s.status === 'delivered').length}
          </h3>
          <p className="text-gray-600 text-sm">Completed Deliveries</p>
        </div>
      </div>

      {/* Past Shipments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Past Shipments</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipment ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {driverShipments.map((shipment) => (
                <tr
                  key={shipment.id}
                  onClick={() => onNavigate('shipment-detail', undefined, shipment.id)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    #{shipment.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {shipment.clientName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {shipment.destinationCity}
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {shipment.deliveredAt ? new Date(shipment.deliveredAt).toLocaleDateString() : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {driverShipments.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No shipments yet</h3>
            <p className="text-gray-600">This driver hasn't been assigned any shipments</p>
          </div>
        )}
      </div>
    </div>
  );
}