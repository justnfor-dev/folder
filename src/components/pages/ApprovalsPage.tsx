import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { mockApprovals, mockVendors } from '../../lib/mockData';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { hasPermission } from '../../lib/permissions';

export function ApprovalsPage() {
  const { user } = useAuthStore();
  const canApprove = user ? hasPermission(user.role, 'approvals', 'canApprove') : false;

  const pendingApprovals = mockApprovals.filter((a) => a.status === 'pending');

  const getVendorName = (id?: string) => {
    if (!id) return 'N/A';
    return mockVendors.find((v) => v.id === id)?.companyName || 'Unknown';
  };

  const typeVariant = (type: string): 'orange' | 'blue' | 'amber' => {
    switch (type) {
      case 'price': return 'orange';
      case 'vendor': return 'blue';
      case 'margin': return 'amber';
      default: return 'amber';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-brand">Approvals</h1>
        <p className="text-sm text-muted mt-1">Review and approve pricing and vendor decisions</p>
      </div>

      {!canApprove && (
        <Card className="bg-amber-50 border-amber-100">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <AlertCircle size={20} className="text-amber-600" />
              <div className="text-sm text-ink">
                You don't have permission to approve items. Contact your manager.
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-6">
        {pendingApprovals.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <CheckCircle size={48} className="text-success mx-auto mb-4 opacity-50" />
              <div className="text-lg font-medium text-ink mb-2">All clear</div>
              <div className="text-sm text-muted">No pending approvals at this time</div>
            </CardContent>
          </Card>
        ) : (
          pendingApprovals.map((approval) => (
            <Card key={approval.id}>
              <CardContent className="py-6">
                <div className="flex gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant={typeVariant(approval.type)}>
                            {approval.type}
                          </Badge>
                          <span className="text-sm text-muted">Shipment {approval.shipmentId}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-ink capitalize mb-1">
                          {approval.type} Approval Required
                        </h3>
                        <div className="text-sm text-muted">
                          Proposed by {approval.proposedBy} on {new Date(approval.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 py-4 px-4 bg-bg rounded-lg">
                      {approval.proposedPrice && (
                        <div>
                          <div className="text-xs text-muted mb-1">Proposed Price</div>
                          <div className="text-sm font-semibold text-ink">
                            ₸{approval.proposedPrice.toLocaleString()}
                          </div>
                        </div>
                      )}
                      {approval.proposedCost && (
                        <div>
                          <div className="text-xs text-muted mb-1">Proposed Cost</div>
                          <div className="text-sm font-semibold text-ink">
                            ₸{approval.proposedCost.toLocaleString()}
                          </div>
                        </div>
                      )}
                      <div>
                        <div className="text-xs text-muted mb-1">Expected Margin</div>
                        <div className={`text-sm font-semibold ${
                          approval.expectedMargin < 20 ? 'text-warning' : 'text-success'
                        }`}>
                          {approval.expectedMargin.toFixed(1)}%
                        </div>
                      </div>
                      {approval.proposedVendorId && (
                        <div>
                          <div className="text-xs text-muted mb-1">Vendor</div>
                          <div className="text-sm font-medium text-ink">
                            {getVendorName(approval.proposedVendorId)}
                          </div>
                        </div>
                      )}
                    </div>

                    {approval.riskNotes && (
                      <div className="flex gap-3 p-4 bg-amber-50 border border-amber-100 rounded-lg">
                        <AlertCircle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-ink mb-1">Risk Assessment</div>
                          <div className="text-sm text-muted">{approval.riskNotes}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 pt-1">
                    <Button
                      variant="primary"
                      disabled={!canApprove}
                      className="whitespace-nowrap"
                      title={!canApprove ? "You don't have permission" : undefined}
                    >
                      <CheckCircle size={16} className="mr-2" />
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      disabled={!canApprove}
                      className="whitespace-nowrap"
                      title={!canApprove ? "You don't have permission" : undefined}
                    >
                      <XCircle size={16} className="mr-2" />
                      Decline
                    </Button>
                    <Button
                      variant="ghost"
                      disabled={!canApprove}
                      className="whitespace-nowrap"
                      title={!canApprove ? "You don't have permission" : undefined}
                    >
                      Request Changes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
