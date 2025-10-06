export type Role = 'sales' | 'logistics' | 'accountant' | 'manager' | 'admin';

export type ShipmentStatus = 'quote' | 'planned' | 'in_transit' | 'delivered' | 'cancelled' | 'delayed';
export type VehicleStatus = 'idle' | 'en_route' | 'maintenance';
export type VehicleType = 'tent' | 'refrigerated';
export type ApprovalStatus = 'pending' | 'approved' | 'declined';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  rating: number;
  totalShipments: number;
}

export interface Quote {
  id: string;
  customerId: string;
  cargoType: string;
  requirements: VehicleType[];
  dimensions: string;
  weight: number;
  pickupAddress: string;
  deliveryAddress: string;
  distanceKm: number;
  desiredPrice: number;
  suggestedVendorId?: string;
  vendorPrice?: number;
  margin?: number;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  createdAt: string;
  createdBy: string;
}

export interface CostLineItem {
  category: string;
  amount: number;
  description?: string;
}

export interface Shipment {
  id: string;
  customerId: string;
  status: ShipmentStatus;
  originAddress: string;
  destinationAddress: string;
  distanceKm: number;
  vehicleId?: string;
  driverId?: string;
  vendorId?: string;
  pickupDate: string;
  eta: string;
  customerPrice: number;
  costs: CostLineItem[];
  margin: number;
  marginPercent: number;
  cargoType: string;
  weight: number;
  requirements: VehicleType[];
  createdAt: string;
  updatedAt: string;
  timeline: TimelineEvent[];
}

export interface TimelineEvent {
  status: string;
  timestamp: string;
  user: string;
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  type: VehicleType;
  capacityKg: number;
  status: VehicleStatus;
  lastServiceDate: string;
  nextServiceDue: string;
  currentShipmentId?: string;
}

export interface Driver {
  id: string;
  name: string;
  licenseClass: string;
  phone: string;
  currentShipmentId?: string;
  hoursOnDutyToday: number;
  rating: number;
  documentsValid: boolean;
}

export interface Vendor {
  id: string;
  companyName: string;
  transportTypes: VehicleType[];
  averageRatePerKm: number;
  rating: number;
  insuranceValid: boolean;
  docsValid: boolean;
  preferredLanes: string[];
  settlementTerms: string;
  phone: string;
  email: string;
}

export interface Approval {
  id: string;
  type: 'price' | 'vendor' | 'margin';
  shipmentId: string;
  proposedBy: string;
  proposedPrice?: number;
  proposedCost?: number;
  proposedVendorId?: string;
  expectedMargin: number;
  riskNotes: string;
  status: ApprovalStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  comment?: string;
  createdAt: string;
}

export interface AuditEvent {
  id: string;
  userId: string;
  action: string;
  entity: string;
  entityId: string;
  changes: Record<string, any>;
  timestamp: string;
}

export interface Permission {
  module: string;
  canView: boolean;
  canEdit: boolean;
  canCreate: boolean;
  canDelete: boolean;
  canApprove: boolean;
}

export interface RolePermissions {
  role: Role;
  permissions: Record<string, Permission>;
}
