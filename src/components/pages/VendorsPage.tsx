import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { mockVendors } from '../../lib/mockData';
import { Building2, Mail, Phone, Award, CheckCircle, XCircle, TrendingUp } from 'lucide-react';

export function VendorsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-brand">Vendors</h1>
        <p className="text-sm text-muted mt-1">Manage external carrier partnerships</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg border-b border-line">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Transport Types
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Avg Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Documents
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Settlement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Contact
                  </th>
                </tr>
              </thead>
              <tbody className="bg-panel divide-y divide-line">
                {mockVendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-bg transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center">
                          <Building2 size={18} className="text-brand" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-ink">{vendor.companyName}</div>
                          <div className="text-xs text-muted">{vendor.preferredLanes.slice(0, 2).join(', ')}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1.5">
                        {vendor.transportTypes.map((type) => (
                          <Badge key={type} variant="gray">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <TrendingUp size={14} className="text-muted" />
                        <span className="text-sm font-medium text-ink">
                          ₸{vendor.averageRatePerKm}/km
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Award size={14} className="text-warning" />
                        <span className="text-sm text-ink">{vendor.rating.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          {vendor.insuranceValid ? (
                            <CheckCircle size={14} className="text-success" />
                          ) : (
                            <XCircle size={14} className="text-danger" />
                          )}
                          <span className="text-xs text-muted">Insurance</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {vendor.docsValid ? (
                            <CheckCircle size={14} className="text-success" />
                          ) : (
                            <XCircle size={14} className="text-danger" />
                          )}
                          <span className="text-xs text-muted">Docs</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="blue">{vendor.settlementTerms}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-muted">
                          <Mail size={12} />
                          <span>{vendor.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted">
                          <Phone size={12} />
                          <span>{vendor.phone}</span>
                        </div>
                      </div>
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
