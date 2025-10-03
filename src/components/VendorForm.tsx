import React, { useState } from 'react';
import { ArrowLeft, Save, X } from 'lucide-react';
import { View } from '../App';
import { Vendor } from '../data/mockData';

interface VendorFormProps {
  vendorId: string | null;
  onNavigate: (view: View) => void;
  vendors: Vendor[];
}

export function VendorForm({ vendorId, onNavigate, vendors }: VendorFormProps) {
  const isEditing = !!vendorId;
  const vendor = isEditing ? vendors.find(v => v.id === vendorId) : null;

  const [formData, setFormData] = useState({
    name: vendor?.name || '',
    primaryContact: vendor?.primaryContact || '',
    phone: vendor?.phone || '',
    email: vendor?.email || '',
    city: vendor?.city || '',
    country: vendor?.country || '',
    licenseNumber: vendor?.licenseNumber || '',
    mcNumber: vendor?.mcNumber || '',
    insuranceExpiry: '',
    equipmentTypes: vendor?.equipmentTypes || [],
    serviceRegions: vendor?.serviceRegions || [],
    paymentTerms: 'net-30',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    onNavigate('vendors');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleMultiSelect = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name as keyof typeof prev].includes(value)
        ? (prev[name as keyof typeof prev] as string[]).filter(item => item !== value)
        : [...(prev[name as keyof typeof prev] as string[]), value]
    }));
  };

  const equipmentOptions = ['dry-van', 'reefer', 'flatbed', 'hazmat', 'tanker'];
  const regionOptions = ['north-america', 'europe', 'asia', 'south-america'];

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
          <button
            onClick={() => onNavigate('vendors')}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors duration-200 flex items-center"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors duration-200 flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            {isEditing ? 'Update Vendor' : 'Create Vendor'}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-2xl font-bold text-slate-900">
            {isEditing ? 'Edit Vendor' : 'Add New Vendor'}
          </h1>
          <p className="text-slate-600">
            {isEditing ? 'Update vendor information and capabilities' : 'Enter vendor information and capabilities'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Primary Contact *
                </label>
                <input
                  type="text"
                  name="primaryContact"
                  value={formData.primaryContact}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Contact person name"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="contact@company.com"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="City"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Country"
                />
              </div>
            </div>
          </div>

          {/* License & Compliance */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">License & Compliance</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  License Number
                </label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="License number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  MC Number
                </label>
                <input
                  type="text"
                  name="mcNumber"
                  value={formData.mcNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="MC number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Insurance Expiry
                </label>
                <input
                  type="date"
                  name="insuranceExpiry"
                  value={formData.insuranceExpiry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Equipment Types */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Equipment Types</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {equipmentOptions.map((equipment) => (
                <label key={equipment} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.equipmentTypes.includes(equipment)}
                    onChange={() => handleMultiSelect('equipmentTypes', equipment)}
                    className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="ml-2 text-sm text-slate-700">
                    {equipment.replace('-', ' ').toUpperCase()}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Service Regions */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Service Regions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {regionOptions.map((region) => (
                <label key={region} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.serviceRegions.includes(region)}
                    onChange={() => handleMultiSelect('serviceRegions', region)}
                    className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="ml-2 text-sm text-slate-700">
                    {region.replace('-', ' ').toUpperCase()}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Payment Terms */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Payment Terms</h3>
            <select
              name="paymentTerms"
              value={formData.paymentTerms}
              onChange={handleChange}
              className="w-full md:w-1/3 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="net-7">Net 7</option>
              <option value="net-14">Net 14</option>
              <option value="net-30">Net 30</option>
              <option value="net-60">Net 60</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Additional notes about this vendor..."
            />
          </div>
        </form>
      </div>
    </div>
  );
}