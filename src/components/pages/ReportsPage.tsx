import { Card, CardContent } from '../ui/Card';
import { BarChart3, TrendingUp, Package, Users, Calendar } from 'lucide-react';

const savedReports = [
  {
    id: 'r1',
    title: 'Customer Profitability QTD',
    description: 'Revenue and margin analysis by customer',
    icon: TrendingUp,
    lastRun: '2025-10-05',
  },
  {
    id: 'r2',
    title: 'On-Time Delivery Rate',
    description: 'Percentage of shipments delivered on schedule',
    icon: Package,
    lastRun: '2025-10-06',
  },
  {
    id: 'r3',
    title: 'Vehicle Utilization',
    description: 'Fleet usage and idle time analysis',
    icon: BarChart3,
    lastRun: '2025-10-04',
  },
  {
    id: 'r4',
    title: 'Driver Performance',
    description: 'Hours, ratings, and efficiency metrics',
    icon: Users,
    lastRun: '2025-10-03',
  },
  {
    id: 'r5',
    title: 'Monthly Trends',
    description: 'Shipment volume and revenue over time',
    icon: Calendar,
    lastRun: '2025-10-01',
  },
];

export function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-brand">Reports</h1>
        <p className="text-sm text-muted mt-1">Analyze performance and trends</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {savedReports.map((report) => {
          const Icon = report.icon;
          return (
            <Card key={report.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="py-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={24} className="text-brand" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-ink mb-1">{report.title}</h3>
                    <p className="text-sm text-muted mb-3">{report.description}</p>
                    <div className="text-xs text-muted">
                      Last run: {new Date(report.lastRun).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
