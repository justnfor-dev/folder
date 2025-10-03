import React, { useState } from 'react';
import { ArrowLeft, UserCheck, Phone, Mail, MapPin, Award, Package, DollarSign, TrendingUp, CreditCard as Edit, Plus, Truck } from 'lucide-react';
import { View } from '../App';
import { Vendor, Shipment } from '../data/mockData';
import { StatusChip } from './StatusChip';

interface VendorDetailProps {
  vendorId: string | null;
  onNavigate: (view: View, driverId?: string, shipmentId?: string, customerId?: string, vendorId?: string, editId?: string) => void;
  vendors: Vendor[];
  shipments: Shipment[];
}

export function VendorDetail({ vendorId, onNavigate, vendors, shipments }: VendorDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'capabilities' | 'rates' | 'performance' | 'shipments' | 'compliance' | 'notes'>('overview');
  
  const vendor = vendors.find(v => v.id === vendorId);
  const vendorShipments = shipments.filter(s => s.vendorId === vendor?.id);

  if (!vendor) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-slate-900">Vendor not found</h2>
        <button
          onClick={() => onNavigate('vendors')}
          className="mt-4 text-orange-600 hover:text-orange-700"
        >
          Back to Vendors
        </button>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'rates', label: 'Rates' },
    { id: 'performance', label: 'Performance' },
    { id: 'shipments', label: 'Shipments' },
    { id: 'compliance', label: 'Compliance' },
    { id: 'notes', label: 'Notes & Activity' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('vendors')}
          className="flex items-center text-slate-600 hover:text-slate-900 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Vendors
        </button>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors duration-200 flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Assign to Shipment
          </button>
          <button
            onClick={() => onNavigate('vendor-form', undefined, undefined, undefined, undefined, vendor.id)}
            className="px-4 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors duration-200 flex items-center"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Vendor
          </button>
        </div>
      </div>

      {/* Vendor Header Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center">
            <UserCheck className="w-10 h-10 text-orange-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl font-bold text-slate-900">{vendor.name}</h1>
              {vendor.insuranceValid && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center">
                  <Award className="w-4 h-4 mr-1" />
                  Insured
                </span>
              )}
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Carrier
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center text-slate-600">
                <Phone className="w-5 h-5 mr-3" />
                <span>{vendor.phone}</span>
              </div>
              <div className="flex items-center text-slate-600">
                <Mail className="w-5 h-5 mr-3" />
                <span>{vendor.email}</span>
              </div>
              <div className="flex items-center text-slate-600">
                <MapPin className="w-5 h-5 mr-3" />
                <span>{vendor.city}, {vendor.country}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-xl">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-1">{vendor.onTimePercentage}%</h3>
          <p className="text-slate-600 text-sm">On-time Performance</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-50 rounded-xl">
              <DollarSign className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-1">${vendor.totalCost.toLocaleString()}</h3>
          <p className="text-slate-600 text-sm">Total Cost</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-1">{vendor.shipmentsServed}</h3>
          <p className="text-slate-600 text-sm">Shipments Served</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-xl">
              <Truck className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-1">$2.45</h3>
          <p className="text-slate-600 text-sm">Avg. Cost per Mile</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="border-b border-slate-100">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Primary Contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-slate-600 w-20">Name:</span>
                    <span className="text-slate-900">{vendor.primaryContact}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-slate-600 w-20">Phone:</span>
                    <span className="text-slate-900">{vendor.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-slate-600 w-20">Email:</span>
                    <span className="text-slate-900">{vendor.email}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">License Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-slate-600 w-20">License:</span>
                    <span className="text-slate-900">{vendor.licenseNumber}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-slate-600 w-20">MC Number:</span>
                    <span className="text-slate-900">{vendor.mcNumber}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-slate-600 w-20">Insurance:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      vendor.insuranceValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {vendor.insuranceValid ? 'Valid' : 'Expired'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'capabilities' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Equipment Types</h3>
                <div className="flex flex-wrap gap-2">
                  {vendor.equipmentTypes.map((type) => (
                    <span key={type} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {type.replace('-', ' ').toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Service Regions</h3>
                <div className="flex flex-wrap gap-2">
                  {vendor.serviceRegions.map((region) => (
                    <span key={region} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {region.replace('-', ' ').toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shipments' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Shipment ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Route</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Vendor Cost</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {vendorShipments.map((shipment) => (
                    <tr
                      key={shipment.id}
                      onClick={() => onNavigate('shipment-detail', undefined, shipment.id)}
                      className="hover:bg-slate-50 cursor-pointer transition-colors duration-150"
                    >
                      <td className="px-4 py-4 text-sm font-medium text-orange-600">#{shipment.id}</td>
                      <td className="px-4 py-4 text-sm text-slate-900">{shipment.originCity} → {shipment.destinationCity}</td>
                      <td className="px-4 py-4"><StatusChip status={shipment.status} /></td>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900">${(shipment.priceUsd * 0.8).toLocaleString()}</td>
                      <td className="px-4 py-4 text-sm text-slate-500">{new Date(shipment.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab !== 'overview' && activeTab !== 'capabilities' && activeTab !== 'shipments' && (
            <div className="text-center py-12">
              <p className="text-slate-500">Content for {tabs.find(t => t.id === activeTab)?.label} tab coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}