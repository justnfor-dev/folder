import { Badge } from './Badge';
import { ShipmentStatus, VehicleStatus } from '../../types';

interface StatusBadgeProps {
  status: ShipmentStatus | VehicleStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig: Record<string, { label: string; variant: 'gray' | 'blue' | 'green' | 'red' | 'amber' }> = {
    quote: { label: 'Quote', variant: 'gray' },
    planned: { label: 'Planned', variant: 'gray' },
    in_transit: { label: 'In Transit', variant: 'blue' },
    delivered: { label: 'Delivered', variant: 'green' },
    cancelled: { label: 'Cancelled', variant: 'red' },
    delayed: { label: 'Delayed', variant: 'amber' },
    idle: { label: 'Idle', variant: 'gray' },
    en_route: { label: 'En Route', variant: 'blue' },
    maintenance: { label: 'Maintenance', variant: 'amber' },
  };

  const config = statusConfig[status] || { label: status, variant: 'gray' };

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
