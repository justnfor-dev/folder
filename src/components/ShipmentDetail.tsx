import React from 'react';
import { ArrowLeft, MapPin, Package, DollarSign, User, Phone, Truck, Calendar, Clock } from 'lucide-react';
import { View } from '../App';
import { Shipment, Driver } from '../data/mockData';
import { StatusChip } from './StatusChip';

interface ShipmentDetailProps {
  shipmentId: string | null;
  onNavigate: (view: View, driverId?: string, shipmentId?: string) => void;
  shipments: Shipment[];
  drivers: Driver[];
}

export function ShipmentDetail({ shipmentId, onNavigate, shipments, drivers }: ShipmentDetailProps) {
  const shipment = shipments.find(s => s.id === shipmentId);
  const driver = shipment ? drivers.find(d => d.id === shipment.assignedDriverId) : null;

  if (!shipment) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Shipment not found</h2>
        <button
          onClick={() => onNavigate('shipments')}
          className="mt-4 text-blue-600 hover:text-blue-700"
        >
          Back to Shipments
        </button>
      </div>
    );
  }

  const timelineSteps = [
    { label: 'Created', timestamp: shipment.createdAt, completed: true },
    { label: 'Assigned', timestamp: shipment.assignedAt, completed: !!shipment.assignedAt },
    { label: 'Picked Up', timestamp: shipment.pickupAt, completed: !!shipment.pickupAt },
    { label: 'Delivered', timestamp: shipment.deliveredAt, completed: !!shipment.deliveredAt },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('shipments')}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Shipments
        </button>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Reassign Driver
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200">
            Update Status
          </button>
        </div>
      </div>

      {/* Shipment Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shipment #{shipment.id}</h1>
            <p className="text-gray-600">Created on {new Date(shipment.createdAt).toLocaleDateString()}</p>
          </div>
          <StatusChip status={shipment.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Client & Contact */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Client & Contact</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-900">{shipment.clientName}</span>
              </div>
            </div>
          </div>

          {/* Route Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Route Information</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-2 mr-4"></div>
                <div>
                  <p className="font-medium text-gray-900">Origin</p>
                  <p className="text-gray-600">{shipment.originCity}</p>
                </div>
              </div>
              <div className="ml-6 border-l-2 border-gray-200 h-8"></div>
              <div className="flex items-start">
                <div className="w-3 h-3 bg-red-500 rounded-full mt-2 mr-4"></div>
                <div>
                  <p className="font-medium text-gray-900">Destination</p>
                  <p className="text-gray-600">{shipment.destinationCity}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cargo Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cargo Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Package className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Weight</p>
                  <p className="font-medium text-gray-900">{shipment.weightTons}t</p>
                </div>
              </div>
              {shipment.volumeM3 && (
                <div className="flex items-center">
                  <Package className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Volume</p>
                    <p className="font-medium text-gray-900">{shipment.volumeM3}m³</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Financial Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Financial Information</h2>
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Price</p>
                <p className="font-medium text-gray-900 text-xl">${shipment.priceUsd.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Assigned Driver */}
          {driver && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Assigned Driver</h2>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{driver.name}</p>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-1" />
                    <span>{driver.phone}</span>
                  </div>
                </div>
              </div>
              {driver.vehiclePlate && (
                <div className="flex items-center text-gray-600">
                  <Truck className="w-4 h-4 mr-2" />
                  <span>Vehicle: {driver.vehiclePlate}</span>
                </div>
              )}
              <button
                onClick={() => onNavigate('driver-profile', driver.id)}
                className="mt-4 w-full text-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
              >
                View Driver Profile
              </button>
            </div>
          )}

          {/* Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Timeline</h2>
            <div className="space-y-4">
              {timelineSteps.map((step, index) => (
                <div key={step.label} className="flex items-start">
                  <div className={`w-3 h-3 rounded-full mt-2 mr-4 ${
                    step.completed ? 'bg-green-500' : 'bg-gray-300'
                  }`}></div>
                  <div className="flex-1">
                    <p className={`font-medium ${
                      step.completed ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.label}
                    </p>
                    {step.timestamp && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{new Date(step.timestamp).toLocaleDateString()}</span>
                        <Clock className="w-3 h-3 ml-2 mr-1" />
                        <span>{new Date(step.timestamp).toLocaleTimeString()}</span>
                      </div>
                    )}
                  </div>
                  {index < timelineSteps.length - 1 && (
                    <div className="absolute left-7 mt-6 w-px h-8 bg-gray-200"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}