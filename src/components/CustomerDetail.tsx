import React, { useState } from 'react';
import { ArrowLeft, Building2, Phone, Mail, MapPin, CreditCard, Package, DollarSign, TrendingUp, CreditCard as Edit, Plus } from 'lucide-react';
import { View } from '../App';
import { Customer, Shipment } from '../data/mockData';
import { StatusChip } from './StatusChip';

interface CustomerDetailProps {
  customerId: string | null;
  onNavigate: (view: View, driverId?: string, shipmentId?: string, customerId?: string, vendorId?: string, editId?: string) => void;
  customers: Customer[];
  shipments: Shipment[];
}

export function CustomerDetail({ customerId, onNavigate, customers, shipments }: CustomerDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'contacts' | 'addresses' | 'billing' | 'shipments' | 'documents' | 'notes'>('overview');
  
  const customer = customers.find(c => c.id === customerId);
  const customerShipments = shipments.filter(s => s.clientName === customer?.name);

  if (!customer) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-slate-900">Customer not found</h2>
        <button
          onClick={() => onNavigate('customers')}
          className="mt-4 text-red-600 hover:text-red-700"
        >
          Back to Customers
        </button>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'contacts', label: 'Contacts' },
    { id: 'addresses', label: 'Addresses' },
    { id: 'billing', label: 'Billing Terms' },
    { id: 'shipments', label: 'Shipments' },
    { id: 'documents', label: 'Documents' },
    { id: 'notes', label: 'Notes & Activity' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('customers')}
          className="flex items-center text-slate-600 hover:text-slate-900 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Customers
        </button>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors duration-200 flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Create Shipment
          </button>
          <button
            onClick={() => onNavigate('customer-form', undefined, undefined, undefined, undefined, customer.id)}
            className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200 flex items-center"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Customer
          </button>
        </div>
      </div>

      {/* Customer Header Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center">
            <Building2 className="w-10 h-10 text-red-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl font-bold text-slate-900">{customer.name}</h1>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Active Customer
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {customer.industry}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center text-slate-600">
                <Phone className="w-5 h-5 mr-3" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center text-slate-600">
                <Mail className="w-5 h-5 mr-3" />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center text-slate-600">
                <MapPin className="w-5 h-5 mr-3" />
                <span>{customer.city}, {customer.country}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-1">{customer.totalShipments}</h3>
          <p className="text-slate-600 text-sm">Total Shipments</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-xl">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-1">${customer.totalRevenue.toLocaleString()}</h3>
          <p className="text-slate-600 text-sm">Total Revenue</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-xl">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-1">{customer.avgMargin}%</h3>
          <p className="text-slate-600 text-sm">Avg. Margin</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-50 rounded-xl">
              <CreditCard className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-1">98%</h3>
          <p className="text-slate-600 text-sm">On-time %</p>
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
                    ? 'border-red-500 text-red-600'
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
                    <span className="text-slate-900">{customer.primaryContact}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-slate-600 w-20">Phone:</span>
                    <span className="text-slate-900">{customer.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-slate-600 w-20">Email:</span>
                    <span className="text-slate-900">{customer.email}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Billing Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-slate-600 w-20">Terms:</span>
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                      {customer.billingTerms.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-slate-600 w-20">Currency:</span>
                    <span className="text-slate-900">USD</span>
                  </div>
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
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Charge</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {customerShipments.map((shipment) => (
                    <tr
                      key={shipment.id}
                      onClick={() => onNavigate('shipment-detail', undefined, shipment.id)}
                      className="hover:bg-slate-50 cursor-pointer transition-colors duration-150"
                    >
                      <td className="px-4 py-4 text-sm font-medium text-red-600">#{shipment.id}</td>
                      <td className="px-4 py-4 text-sm text-slate-900">{shipment.originCity} → {shipment.destinationCity}</td>
                      <td className="px-4 py-4"><StatusChip status={shipment.status} /></td>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900">${shipment.priceUsd.toLocaleString()}</td>
                      <td className="px-4 py-4 text-sm text-slate-500">{new Date(shipment.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab !== 'overview' && activeTab !== 'shipments' && (
            <div className="text-center py-12">
              <p className="text-slate-500">Content for {tabs.find(t => t.id === activeTab)?.label} tab coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}