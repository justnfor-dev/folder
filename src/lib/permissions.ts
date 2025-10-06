import { Role, Permission } from '../types';

export const rolePermissions: Record<Role, Record<string, Permission>> = {
  sales: {
    quotes: { module: 'quotes', canView: true, canEdit: true, canCreate: true, canDelete: false, canApprove: false },
    shipments: { module: 'shipments', canView: true, canEdit: false, canCreate: false, canDelete: false, canApprove: false },
    finance: { module: 'finance', canView: false, canEdit: false, canCreate: false, canDelete: false, canApprove: false },
    approvals: { module: 'approvals', canView: false, canEdit: false, canCreate: false, canDelete: false, canApprove: false },
    fleet: { module: 'fleet', canView: true, canEdit: false, canCreate: false, canDelete: false, canApprove: false },
    vendors: { module: 'vendors', canView: true, canEdit: false, canCreate: false, canDelete: false, canApprove: false },
  },
  logistics: {
    quotes: { module: 'quotes', canView: true, canEdit: true, canCreate: true, canDelete: false, canApprove: false },
    shipments: { module: 'shipments', canView: true, canEdit: true, canCreate: true, canDelete: false, canApprove: false },
    finance: { module: 'finance', canView: true, canEdit: false, canCreate: false, canDelete: false, canApprove: false },
    approvals: { module: 'approvals', canView: true, canEdit: false, canCreate: true, canDelete: false, canApprove: false },
    fleet: { module: 'fleet', canView: true, canEdit: true, canCreate: false, canDelete: false, canApprove: false },
    vendors: { module: 'vendors', canView: true, canEdit: true, canCreate: true, canDelete: false, canApprove: false },
  },
  accountant: {
    quotes: { module: 'quotes', canView: true, canEdit: false, canCreate: false, canDelete: false, canApprove: false },
    shipments: { module: 'shipments', canView: true, canEdit: false, canCreate: false, canDelete: false, canApprove: false },
    finance: { module: 'finance', canView: true, canEdit: true, canCreate: true, canDelete: false, canApprove: false },
    approvals: { module: 'approvals', canView: false, canEdit: false, canCreate: false, canDelete: false, canApprove: false },
    fleet: { module: 'fleet', canView: true, canEdit: false, canCreate: false, canDelete: false, canApprove: false },
    vendors: { module: 'vendors', canView: true, canEdit: false, canCreate: false, canDelete: false, canApprove: false },
  },
  manager: {
    quotes: { module: 'quotes', canView: true, canEdit: true, canCreate: true, canDelete: true, canApprove: true },
    shipments: { module: 'shipments', canView: true, canEdit: true, canCreate: true, canDelete: true, canApprove: true },
    finance: { module: 'finance', canView: true, canEdit: true, canCreate: true, canDelete: false, canApprove: true },
    approvals: { module: 'approvals', canView: true, canEdit: true, canCreate: false, canDelete: false, canApprove: true },
    fleet: { module: 'fleet', canView: true, canEdit: true, canCreate: true, canDelete: true, canApprove: false },
    vendors: { module: 'vendors', canView: true, canEdit: true, canCreate: true, canDelete: true, canApprove: false },
  },
  admin: {
    quotes: { module: 'quotes', canView: true, canEdit: true, canCreate: true, canDelete: true, canApprove: true },
    shipments: { module: 'shipments', canView: true, canEdit: true, canCreate: true, canDelete: true, canApprove: true },
    finance: { module: 'finance', canView: true, canEdit: true, canCreate: true, canDelete: true, canApprove: true },
    approvals: { module: 'approvals', canView: true, canEdit: true, canCreate: true, canDelete: true, canApprove: true },
    fleet: { module: 'fleet', canView: true, canEdit: true, canCreate: true, canDelete: true, canApprove: true },
    vendors: { module: 'vendors', canView: true, canEdit: true, canCreate: true, canDelete: true, canApprove: true },
  },
};

export function hasPermission(role: Role, module: string, action: keyof Omit<Permission, 'module'>): boolean {
  const modulePermissions = rolePermissions[role]?.[module];
  return modulePermissions ? modulePermissions[action] : false;
}
