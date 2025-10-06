export type Role = 'sales' | 'logistics' | 'accountant' | 'manager';

export type QuoteStatus = 'incoming' | 'proposed' | 'accepted' | 'declined' | 'expired' | 'superseded';
export type ShipmentStatus = 'planned' | 'in_transit' | 'delivered' | 'cancelled';
export type VehicleStatus = 'idle' | 'en_route' | 'maintenance';
export type VehicleType = 'tent' | 'refrigerated';
export type AssignmentMode = 'internal' | 'vendor';

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
  quoteSetId: string;
  customerId: string;
  cargoType: string;
  requirements: VehicleType[];
  dimensions: string;
  weight: number;
  originAddress: string;
  destinationAddress: string;
  distanceKm: number;
  customerOfferedPrice?: number;
  mode: AssignmentMode;
  vehicleId?: string;
  driverId?: string;
  driverPayPerKm?: number;
  vendorId?: string;
  vendorFee?: number;
  fuel: number;
  tolls: number;
  misc: number;
  proposedCustomerPrice: number;
  eta: string;
  note?: string;
  status: QuoteStatus;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
}

export interface QuotePricing {
  pricePerKm: number;
  totalCost: number;
  costPerKm: number;
  marginAmt: number;
  marginPct: number;
}

export interface CostLineItem {
  category: string;
  amount: number;
  description?: string;
}

export interface Shipment {
  id: string;
  quoteId: string;
  customerId: string;
  status: ShipmentStatus;
  originAddress: string;
  destinationAddress: string;
  distanceKm: number;
  mode: AssignmentMode;
  vehicleId?: string;
  driverId?: string;
  driverPayPerKm?: number;
  vendorId?: string;
  vendorFee?: number;
  fuel: number;
  tolls: number;
  misc: number;
  customerPrice: number;
  pickupDate: string;
  eta: string;
  deliveredAt?: string;
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
  capacityTons: number;
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
  payPerKm: number;
  currentShipmentId?: string;
  distanceToday: number;
  distanceMTD: number;
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

export interface SystemSettings {
  minMarginPercentForApproval: number;
  currency: string;
  distanceUnit: string;
}
