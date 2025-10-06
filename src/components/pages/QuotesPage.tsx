import { useState } from 'react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { mockQuotes, mockCustomers } from '../../lib/mockData';
import { X, Send } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { hasPermission } from '../../lib/permissions';

export function QuotesPage() {
  const { user } = useAuthStore();
  const [showNewForm, setShowNewForm] = useState(false);

  const canCreate = user ? hasPermission(user.role, 'quotes', 'canCreate') : false;

  const getCustomerName = (id: string) => mockCustomers.find((c) => c.id === id)?.name || 'Unknown';

  const statusVariant = (status: string): 'gray' | 'blue' | 'green' | 'red' => {
    switch (status) {
      case 'draft': return 'gray';
      case 'submitted': return 'blue';
      case 'approved': return 'green';
      case 'rejected': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-brand">Quotes</h1>
          <p className="text-sm text-muted mt-1">Manage customer quotes and proposals</p>
        </div>
        <Button
          onClick={() => canCreate ? setShowNewForm(true) : null}
          disabled={!canCreate}
          title={!canCreate ? "You don't have permission" : undefined}
        >
          Create Quote
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg border-b border-line">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Cargo Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Route
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Distance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="bg-panel divide-y divide-line">
                {mockQuotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-bg transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand">
                      {quote.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-ink">
                      {getCustomerName(quote.customerId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-ink">
                      {quote.cargoType}
                    </td>
                    <td className="px-6 py-4 text-sm text-ink max-w-xs truncate">
                      {quote.pickupAddress} → {quote.deliveryAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-ink">
                      {quote.distanceKm} km
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-ink font-medium">
                      ₸{quote.desiredPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={statusVariant(quote.status)}>
                        {quote.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">
                      {new Date(quote.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {showNewForm && (
        <>
          <div className="fixed inset-0 bg-ink/20 z-40" onClick={() => setShowNewForm(false)} />
          <div className="fixed right-0 top-0 h-full w-[600px] bg-panel shadow-xl z-50 overflow-y-auto">
            <div className="sticky top-0 bg-panel border-b border-line px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-brand">New Quote</h2>
              <button onClick={() => setShowNewForm(false)} className="p-2 hover:bg-bg rounded-lg">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <Select label="Customer">
                <option value="">Select customer</option>
                {mockCustomers.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </Select>

              <Input label="Cargo Type" placeholder="e.g., Industrial equipment" />

              <div>
                <label className="block text-sm font-medium text-ink mb-2">Requirements</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-line" />
                    <span className="text-sm text-ink">Tent</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-line" />
                    <span className="text-sm text-ink">Refrigerated</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input label="Weight (kg)" type="number" placeholder="15000" />
                <Input label="Dimensions" placeholder="6m × 2.4m × 2.4m" />
              </div>

              <Input label="Pickup Address" placeholder="Almaty, District" />
              <Input label="Delivery Address" placeholder="Shymkent, District" />

              <div className="grid grid-cols-2 gap-4">
                <Input label="Distance (km)" type="number" placeholder="970" />
                <Input label="Desired Price (₸)" type="number" placeholder="485000" />
              </div>

              <div className="border-t border-line pt-6">
                <div className="text-sm font-medium text-ink mb-4">Vendor Option (Optional)</div>
                <Select label="Suggested Vendor">
                  <option value="">None - use internal fleet</option>
                  <option value="v1">TransKZ Logistics</option>
                  <option value="v2">SteppeFreight</option>
                </Select>
                <Input label="Vendor Price (₸)" type="number" placeholder="400000" className="mt-4" />
              </div>

              <div className="flex gap-3 pt-6 border-t border-line">
                <Button variant="secondary" onClick={() => setShowNewForm(false)} className="flex-1">
                  Save as Draft
                </Button>
                <Button onClick={() => setShowNewForm(false)} className="flex-1">
                  <Send size={16} className="mr-2" />
                  Submit to Logistics
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
