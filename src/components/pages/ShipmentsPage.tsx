import { useState } from 'react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';
import { mockShipments, mockCustomers, mockVehicles, mockDrivers, mockVendors } from '../../lib/mockData';
import { Shipment } from '../../types';
import { ArrowRight, MapPin, Clock, DollarSign, X, Package } from 'lucide-react';

export function ShipmentsPage() {
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);

  const getCustomerName = (id: string) => mockCustomers.find((c) => c.id === id)?.name || 'Unknown';
  const getVehiclePlate = (id?: string) => id ? mockVehicles.find((v) => v.id === id)?.plateNumber : '-';
  const getDriverName = (id?: string) => id ? mockDrivers.find((d) => d.id === id)?.name : '-';
  const getVendorName = (id?: string) => id ? mockVendors.find((v) => v.id === id)?.companyName : '-';

  const totalCost = (costs: any[]) => costs.reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-brand">Shipments</h1>
          <p className="text-sm text-muted mt-1">Manage all shipments and deliveries</p>
        </div>
        <Button>Create Shipment</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg border-b border-line sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Route
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Distance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Assignment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Pickup
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Margin
                  </th>
                </tr>
              </thead>
              <tbody className="bg-panel divide-y divide-line">
                {mockShipments.map((shipment) => (
                  <tr
                    key={shipment.id}
                    onClick={() => setSelectedShipment(shipment)}
                    className="hover:bg-bg cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand">
                      {shipment.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-ink">
                      {getCustomerName(shipment.customerId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={shipment.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-ink max-w-xs truncate">
                      {shipment.originAddress} → {shipment.destinationAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-ink">
                      {shipment.distanceKm} km
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-ink">
                      {shipment.vehicleId ? getVehiclePlate(shipment.vehicleId) : getVendorName(shipment.vendorId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">
                      {new Date(shipment.pickupDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-ink font-medium">
                      ₸{shipment.customerPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-success">
                        {shipment.marginPercent}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {selectedShipment && (
        <>
          <div className="fixed inset-0 bg-ink/20 z-40" onClick={() => setSelectedShipment(null)} />
          <div className="fixed right-0 top-0 h-full w-[600px] bg-panel shadow-xl z-50 overflow-y-auto">
            <div className="sticky top-0 bg-panel border-b border-line px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-brand">Shipment {selectedShipment.id}</h2>
                <p className="text-sm text-muted mt-0.5">{getCustomerName(selectedShipment.customerId)}</p>
              </div>
              <button onClick={() => setSelectedShipment(null)} className="p-2 hover:bg-bg rounded-lg">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <StatusBadge status={selectedShipment.status} />
              </div>

              <Card>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-muted mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-ink mb-1">Route</div>
                      <div className="text-sm text-muted">
                        <div>{selectedShipment.originAddress}</div>
                        <div className="flex items-center gap-2 my-2">
                          <ArrowRight size={16} />
                          <span className="text-xs">{selectedShipment.distanceKm} km</span>
                        </div>
                        <div>{selectedShipment.destinationAddress}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-muted mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-ink mb-1">Timeline</div>
                      <div className="space-y-2">
                        {selectedShipment.timeline.map((event, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-muted">{event.status}</span>
                            <span className="text-ink">{new Date(event.timestamp).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Package size={18} className="text-muted mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-ink mb-1">Cargo Details</div>
                      <div className="text-sm text-muted space-y-1">
                        <div>Type: {selectedShipment.cargoType}</div>
                        <div>Weight: {selectedShipment.weight.toLocaleString()} kg</div>
                        <div>Requirements: {selectedShipment.requirements.join(', ')}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="space-y-4">
                  <div className="text-sm font-medium text-ink">Assignment</div>
                  {selectedShipment.vehicleId ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted">Vehicle</span>
                        <span className="text-ink font-medium">{getVehiclePlate(selectedShipment.vehicleId)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted">Driver</span>
                        <span className="text-ink font-medium">{getDriverName(selectedShipment.driverId)}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Vendor</span>
                      <span className="text-ink font-medium">{getVendorName(selectedShipment.vendorId)}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <DollarSign size={18} className="text-muted mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-ink mb-3">Finance</div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted">Customer Price</span>
                          <span className="text-ink font-semibold">₸{selectedShipment.customerPrice.toLocaleString()}</span>
                        </div>
                        <div className="border-t border-line pt-2 space-y-1">
                          <div className="text-xs text-muted mb-1">Cost Breakdown</div>
                          {selectedShipment.costs.map((cost, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span className="text-muted">{cost.category}</span>
                              <span className="text-ink">₸{cost.amount.toLocaleString()}</span>
                            </div>
                          ))}
                          <div className="flex justify-between text-sm font-medium pt-1 border-t border-line">
                            <span className="text-muted">Total Cost</span>
                            <span className="text-ink">₸{totalCost(selectedShipment.costs).toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm pt-2 border-t border-line">
                          <span className="text-ink font-medium">Margin</span>
                          <span className="text-success font-semibold">
                            {selectedShipment.marginPercent}% (₸{selectedShipment.margin.toLocaleString()})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
