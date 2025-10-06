import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { mockDrivers, mockShipments } from '../../lib/mockData';
import { User, Phone, Award, Clock, CheckCircle, XCircle } from 'lucide-react';

export function DriversPage() {
  const getShipmentRoute = (shipmentId?: string) => {
    if (!shipmentId) return 'Available';
    const shipment = mockShipments.find((s) => s.id === shipmentId);
    return shipment ? `${shipment.originAddress} → ${shipment.destinationAddress}` : 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-brand">Drivers</h1>
        <p className="text-sm text-muted mt-1">Manage driver assignments and availability</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg border-b border-line">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Driver
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    License
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Current Assignment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Hours Today
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Documents
                  </th>
                </tr>
              </thead>
              <tbody className="bg-panel divide-y divide-line">
                {mockDrivers.map((driver) => (
                  <tr key={driver.id} className="hover:bg-bg transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center">
                          <User size={18} className="text-brand" />
                        </div>
                        <div className="text-sm font-medium text-ink">{driver.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="gray">{driver.licenseClass}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <Phone size={14} />
                        <span>{driver.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-ink max-w-xs truncate">
                      {getShipmentRoute(driver.currentShipmentId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-muted" />
                        <span className={`text-sm font-medium ${
                          driver.hoursOnDutyToday > 8 ? 'text-warning' : 'text-ink'
                        }`}>
                          {driver.hoursOnDutyToday.toFixed(1)}h
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Award size={14} className="text-warning" />
                        <span className="text-sm text-ink">{driver.rating.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {driver.documentsValid ? (
                        <div className="flex items-center gap-1 text-success">
                          <CheckCircle size={16} />
                          <span className="text-sm">Valid</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-danger">
                          <XCircle size={16} />
                          <span className="text-sm">Expired</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
