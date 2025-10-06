import { Card, CardHeader, CardContent } from '../ui/Card';
import { Package, Truck, FileText, AlertCircle, TrendingUp } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { mockShipments, mockVehicles, mockQuotes, mockApprovals } from '../../lib/mockData';

const marginData = [
  { day: 1, margin: 42 },
  { day: 2, margin: 45 },
  { day: 3, margin: 48 },
  { day: 4, margin: 44 },
  { day: 5, margin: 46 },
  { day: 6, margin: 49 },
];

export function DashboardPage() {
  const activeShipments = mockShipments.filter((s) => s.status === 'in_transit').length;
  const idleVehicles = mockVehicles.filter((v) => v.status === 'idle').length;
  const pendingQuotes = mockQuotes.filter((q) => q.status === 'submitted').length;
  const todayPickups = mockShipments.filter((s) => {
    const pickup = new Date(s.pickupDate);
    const today = new Date();
    return pickup.toDateString() === today.toDateString();
  }).length;

  const avgMargin = 46;
  const needsAttention = mockApprovals.filter((a) => a.status === 'pending');

  const kpiCards = [
    { label: 'Active Shipments', value: activeShipments, icon: Package, color: 'text-info' },
    { label: 'Idle Vehicles', value: idleVehicles, icon: Truck, color: 'text-muted' },
    { label: 'Quotes Awaiting', value: pendingQuotes, icon: FileText, color: 'text-warning' },
    { label: "Today's Pickups", value: todayPickups, icon: Package, color: 'text-success' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-brand">Dashboard</h1>
        <p className="text-sm text-muted mt-1">Overview of operations and key metrics</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label}>
              <CardContent className="py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted mb-1">{kpi.label}</div>
                    <div className="text-3xl font-semibold text-ink">{kpi.value}</div>
                  </div>
                  <div className={`${kpi.color}`}>
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-ink">Margin Trend</h3>
              <div className="flex items-center gap-2 text-success text-sm">
                <TrendingUp size={16} />
                <span className="font-medium">+3.2% MTD</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="text-3xl font-semibold text-ink">{avgMargin}%</div>
              <div className="text-sm text-muted">Average margin last 6 days</div>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <AreaChart data={marginData}>
                <defs>
                  <linearGradient id="marginGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#16A34A" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#16A34A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="margin"
                  stroke="#16A34A"
                  strokeWidth={2}
                  fill="url(#marginGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="font-semibold text-ink">Needs Attention</h3>
          </CardHeader>
          <CardContent>
            {needsAttention.length === 0 ? (
              <div className="py-8 text-center text-muted text-sm">
                All clear. No items need attention.
              </div>
            ) : (
              <div className="space-y-3">
                {needsAttention.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 border border-amber-100"
                  >
                    <AlertCircle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-ink capitalize">
                        {item.type} Approval Required
                      </div>
                      <div className="text-xs text-muted mt-0.5 line-clamp-2">
                        {item.riskNotes}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h3 className="font-semibold text-ink">Recent Activity</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockShipments.slice(0, 4).map((shipment) => {
              const lastEvent = shipment.timeline[shipment.timeline.length - 1];
              return (
                <div key={shipment.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand" />
                    <div>
                      <div className="text-sm font-medium text-ink">Shipment {shipment.id}</div>
                      <div className="text-xs text-muted">
                        {shipment.originAddress} → {shipment.destinationAddress}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-ink">{lastEvent.status}</div>
                    <div className="text-xs text-muted">
                      {new Date(lastEvent.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
