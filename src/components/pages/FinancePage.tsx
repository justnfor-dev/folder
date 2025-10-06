import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { mockShipments, mockCustomers } from '../../lib/mockData';
import { DollarSign, TrendingUp, FileText, Download } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { hasPermission } from '../../lib/permissions';

export function FinancePage() {
  const { user } = useAuthStore();
  const canEdit = user ? hasPermission(user.role, 'finance', 'canEdit') : false;

  const completedShipments = mockShipments.filter(
    (s) => s.status === 'delivered' || s.status === 'in_transit'
  );

  const totalRevenue = completedShipments.reduce((sum, s) => sum + s.customerPrice, 0);
  const totalCost = completedShipments.reduce((sum, s) => sum + s.costs.reduce((c, cost) => c + cost.amount, 0), 0);
  const totalMargin = totalRevenue - totalCost;
  const avgMarginPercent = completedShipments.length > 0
    ? (totalMargin / totalRevenue * 100).toFixed(1)
    : 0;

  const getCustomerName = (id: string) => mockCustomers.find((c) => c.id === id)?.name || 'Unknown';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-brand">Finance</h1>
          <p className="text-sm text-muted mt-1">Monitor margins and financial performance</p>
        </div>
        <Button variant="secondary" disabled={!canEdit}>
          <Download size={16} className="mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted mb-1">Gross Revenue</div>
                <div className="text-2xl font-semibold text-ink">
                  ₸{(totalRevenue / 1000000).toFixed(1)}M
                </div>
              </div>
              <DollarSign size={24} className="text-info" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted mb-1">Total Cost</div>
                <div className="text-2xl font-semibold text-ink">
                  ₸{(totalCost / 1000000).toFixed(1)}M
                </div>
              </div>
              <FileText size={24} className="text-muted" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted mb-1">Total Margin</div>
                <div className="text-2xl font-semibold text-success">
                  ₸{(totalMargin / 1000000).toFixed(1)}M
                </div>
              </div>
              <TrendingUp size={24} className="text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted mb-1">Avg Margin %</div>
                <div className="text-2xl font-semibold text-success">{avgMarginPercent}%</div>
              </div>
              <TrendingUp size={24} className="text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-ink">Shipment Margins</h3>
            <div className="text-sm text-muted">{completedShipments.length} shipments</div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg border-b border-line">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Shipment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Cost
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Margin
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Margin %
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-panel divide-y divide-line">
                {completedShipments.map((shipment) => {
                  const cost = shipment.costs.reduce((sum, c) => sum + c.amount, 0);
                  return (
                    <tr key={shipment.id} className="hover:bg-bg transition-colors group cursor-pointer">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand">
                        {shipment.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-ink">
                        {getCustomerName(shipment.customerId)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-ink font-medium">
                        ₸{shipment.customerPrice.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-ink">
                        ₸{cost.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-success">
                        ₸{shipment.margin.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-semibold ${
                          shipment.marginPercent < 20 ? 'text-warning' : 'text-success'
                        }`}>
                          {shipment.marginPercent}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted capitalize">
                        {shipment.status.replace('_', ' ')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
