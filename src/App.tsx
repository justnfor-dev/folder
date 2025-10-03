import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Drivers } from './components/Drivers';
import { DriverProfile } from './components/DriverProfile';
import { Fleet } from './components/Fleet';
import { Shipments } from './components/Shipments';
import { ShipmentDetail } from './components/ShipmentDetail';
import { Customers } from './components/Customers';
import { CustomerDetail } from './components/CustomerDetail';
import { CustomerForm } from './components/CustomerForm';
import { Vendors } from './components/Vendors';
import { VendorDetail } from './components/VendorDetail';
import { VendorForm } from './components/VendorForm';
import { Sidebar } from './components/Sidebar';
import { mockData } from './data/mockData';

export type View = 'dashboard' | 'drivers' | 'driver-profile' | 'fleet' | 'shipments' | 'shipment-detail' | 'customers' | 'customer-detail' | 'customer-form' | 'vendors' | 'vendor-detail' | 'vendor-form';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);
  const [editingCustomerId, setEditingCustomerId] = useState<string | null>(null);
  const [editingVendorId, setEditingVendorId] = useState<string | null>(null);

  const navigate = (view: View, driverId?: string, shipmentId?: string, customerId?: string, vendorId?: string, editId?: string) => {
    setCurrentView(view);
    if (driverId) setSelectedDriverId(driverId);
    if (shipmentId) setSelectedShipmentId(shipmentId);
    if (customerId) setSelectedCustomerId(customerId);
    if (vendorId) setSelectedVendorId(vendorId);
    if (editId && view === 'customer-form') setEditingCustomerId(editId);
    if (editId && view === 'vendor-form') setEditingVendorId(editId);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={navigate} data={mockData} />;
      case 'drivers':
        return <Drivers onNavigate={navigate} drivers={mockData.drivers} />;
      case 'driver-profile':
        return (
          <DriverProfile
            driverId={selectedDriverId}
            onNavigate={navigate}
            drivers={mockData.drivers}
            shipments={mockData.shipments}
          />
        );
      case 'fleet':
        return <Fleet vehicles={mockData.vehicles} />;
      case 'shipments':
        return <Shipments onNavigate={navigate} shipments={mockData.shipments} drivers={mockData.drivers} />;
      case 'shipment-detail':
        return (
          <ShipmentDetail
            shipmentId={selectedShipmentId}
            onNavigate={navigate}
            shipments={mockData.shipments}
            drivers={mockData.drivers}
          />
        );
      case 'customers':
        return <Customers customers={mockData.customers} />;
      case 'customer-detail':
        return (
          <CustomerDetail
            customerId={selectedCustomerId}
            onNavigate={navigate}
            customers={mockData.customers}
            shipments={mockData.shipments}
          />
        );
      case 'customer-form':
        return (
          <CustomerForm
            customerId={editingCustomerId}
            onNavigate={navigate}
            customers={mockData.customers}
          />
        );
      case 'vendors':
        return <Vendors onNavigate={navigate} vendors={mockData.vendors} />;
      case 'vendor-detail':
        return (
          <VendorDetail
            vendorId={selectedVendorId}
            onNavigate={navigate}
            vendors={mockData.vendors}
            shipments={mockData.shipments}
          />
        );
      case 'vendor-form':
        return (
          <VendorForm
            vendorId={editingVendorId}
            onNavigate={navigate}
            vendors={mockData.vendors}
          />
        );
      default:
        return <Dashboard onNavigate={navigate} data={mockData} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar currentView={currentView} onNavigate={navigate} />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {renderCurrentView()}
        </div>
      </main>
    </div>
  );
}

export default App;