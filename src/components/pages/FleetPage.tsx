import { Card, CardHeader, CardContent } from '../ui/Card';
import { StatusBadge } from '../ui/StatusBadge';
import { mockVehicles, mockShipments } from '../../lib/mockData';
import { Truck, Calendar, Package } from 'lucide-react';
import { VehicleStatus } from '../../types';

export function FleetPage() {
  const vehiclesByStatus: Record<VehicleStatus, typeof mockVehicles> = {
    idle: mockVehicles.filter((v) => v.status === 'idle'),
    en_route: mockVehicles.filter((v) => v.status === 'en_route'),
    maintenance: mockVehicles.filter((v) => v.status === 'maintenance'),
  };

  const getShipmentRoute = (shipmentId?: string) => {
    if (!shipmentId) return null;
    const shipment = mockShipments.find((s) => s.id === shipmentId);
    return shipment ? `${shipment.originAddress} → ${shipment.destinationAddress}` : null;
  };

  const columns: { title: string; status: VehicleStatus; color: string }[] = [
    { title: 'Idle', status: 'idle', color: 'bg-gray-50' },
    { title: 'En Route', status: 'en_route', color: 'bg-blue-50' },
    { title: 'Maintenance', status: 'maintenance', color: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-brand">Fleet</h1>
        <p className="text-sm text-muted mt-1">Manage vehicles and track status</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column.status}>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-ink">{column.title}</h3>
                <span className="text-xs text-muted">
                  {vehiclesByStatus[column.status].length} vehicles
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {vehiclesByStatus[column.status].map((vehicle) => (
                <Card key={vehicle.id} className={column.color}>
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Truck size={18} className="text-muted" />
                        <div>
                          <div className="text-sm font-semibold text-ink">{vehicle.plateNumber}</div>
                          <div className="text-xs text-muted capitalize">{vehicle.type}</div>
                        </div>
                      </div>
                      <StatusBadge status={vehicle.status} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted">
                        <Package size={14} />
                        <span>Capacity: {vehicle.capacityKg.toLocaleString()} kg</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted">
                        <Calendar size={14} />
                        <span>Next service: {new Date(vehicle.nextServiceDue).toLocaleDateString()}</span>
                      </div>

                      {vehicle.currentShipmentId && (
                        <div className="mt-3 pt-3 border-t border-line">
                          <div className="text-xs font-medium text-ink mb-1">Current Shipment</div>
                          <div className="text-xs text-muted line-clamp-2">
                            {getShipmentRoute(vehicle.currentShipmentId)}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {vehiclesByStatus[column.status].length === 0 && (
                <Card className="border-dashed">
                  <CardContent className="py-8 text-center">
                    <div className="text-sm text-muted">No vehicles</div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
