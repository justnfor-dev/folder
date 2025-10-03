import React from 'react';

interface StatusChipProps {
  status: 'pending' | 'in-transit' | 'delivered';
}

export function StatusChip({ status }: StatusChipProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'in-transit':
        return 'bg-purple-100 text-purple-800 border border-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'in-transit':
        return 'In Transit';
      case 'delivered':
        return 'Delivered';
      default:
        return status;
    }
  };

  return (
    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
      {getStatusText(status)}
    </span>
  );
}