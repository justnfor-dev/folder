export interface Driver {
  id: string;
  name: string;
  phone: string;
  vehiclePlate?: string;
  avatarUrl?: string;
  status: 'active' | 'inactive';
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  model: string;
  capacityTons: number;
  status: 'available' | 'in-use' | 'maintenance';
  mileage: number;
  lastService: string;
}

export interface Shipment {
  id: string;
  clientName: string;
  originCity: string;
  destinationCity: string;
  weightTons: number;
  volumeM3?: number;
  priceUsd: number;
  status: 'pending' | 'in-transit' | 'delivered';
  createdAt: string;
  assignedAt?: string;
  pickupAt?: string;
  deliveredAt?: string;
  assignedDriverId?: string;
  vendorId?: string;
}

export interface Customer {
  id: string;
  name: string;
  primaryContact: string;
  phone: string;
  email: string;
  city: string;
  country: string;
  industry: string;
  billingTerms: string;
  totalShipments: number;
  totalRevenue: number;
  avgMargin: number;
  lastShipmentDate?: string;
}

export interface Vendor {
  id: string;
  name: string;
  primaryContact: string;
  phone: string;
  email: string;
  city: string;
  country: string;
  licenseNumber: string;
  mcNumber: string;
  insuranceValid: boolean;
  equipmentTypes: string[];
  serviceRegions: string[];
  onTimePercentage: number;
  totalCost: number;
  shipmentsServed: number;
  lastUsed?: string;
}

export interface MockData {
  drivers: Driver[];
  vehicles: Vehicle[];
  shipments: Shipment[];
  customers: Customer[];
  vendors: Vendor[];
}

export const mockData: MockData = {
  drivers: [
    {
      id: 'DRV-001',
      name: 'John Smith',
      phone: '+1 (555) 123-4567',
      vehiclePlate: 'ABC-123',
      status: 'active'
    },
    {
      id: 'DRV-002',
      name: 'Maria Garcia',
      phone: '+1 (555) 234-5678',
      vehiclePlate: 'XYZ-789',
      status: 'active'
    },
    {
      id: 'DRV-003',
      name: 'David Johnson',
      phone: '+1 (555) 345-6789',
      vehiclePlate: 'DEF-456',
      status: 'active'
    },
    {
      id: 'DRV-004',
      name: 'Sarah Wilson',
      phone: '+1 (555) 456-7890',
      status: 'inactive'
    },
    {
      id: 'DRV-005',
      name: 'Michael Brown',
      phone: '+1 (555) 567-8901',
      vehiclePlate: 'GHI-789',
      status: 'active'
    }
  ],
  vehicles: [
    {
      id: 'VEH-001',
      plateNumber: 'ABC-123',
      model: 'Volvo FH16',
      capacityTons: 40,
      status: 'in-use',
      mileage: 125000,
      lastService: '2024-01-15'
    },
    {
      id: 'VEH-002',
      plateNumber: 'XYZ-789',
      model: 'Mercedes Actros',
      capacityTons: 35,
      status: 'available',
      mileage: 89000,
      lastService: '2024-01-20'
    },
    {
      id: 'VEH-003',
      plateNumber: 'DEF-456',
      model: 'Scania R500',
      capacityTons: 45,
      status: 'in-use',
      mileage: 156000,
      lastService: '2024-01-10'
    },
    {
      id: 'VEH-004',
      plateNumber: 'GHI-789',
      model: 'DAF XF',
      capacityTons: 38,
      status: 'maintenance',
      mileage: 203000,
      lastService: '2024-01-05'
    },
    {
      id: 'VEH-005',
      plateNumber: 'JKL-012',
      model: 'MAN TGX',
      capacityTons: 42,
      status: 'available',
      mileage: 67000,
      lastService: '2024-01-25'
    }
  ],
  shipments: [
    {
      id: 'SHP-2024-001',
      clientName: 'Acme Corporation',
      originCity: 'Los Angeles, CA',
      destinationCity: 'Phoenix, AZ',
      weightTons: 25,
      volumeM3: 45,
      priceUsd: 3500,
      status: 'delivered',
      createdAt: '2024-01-15T08:00:00Z',
      assignedAt: '2024-01-15T09:30:00Z',
      pickupAt: '2024-01-16T10:00:00Z',
      deliveredAt: '2024-01-17T14:30:00Z',
      assignedDriverId: 'DRV-001'
    },
    {
      id: 'SHP-2024-002',
      clientName: 'TechFlow Inc.',
      originCity: 'Seattle, WA',
      destinationCity: 'Denver, CO',
      weightTons: 18,
      volumeM3: 32,
      priceUsd: 4200,
      status: 'in-transit',
      createdAt: '2024-01-18T10:00:00Z',
      assignedAt: '2024-01-18T11:00:00Z',
      pickupAt: '2024-01-19T08:00:00Z',
      assignedDriverId: 'DRV-002'
    },
    {
      id: 'SHP-2024-003',
      clientName: 'Global Supplies Ltd.',
      originCity: 'Miami, FL',
      destinationCity: 'Atlanta, GA',
      weightTons: 30,
      priceUsd: 2800,
      status: 'pending',
      createdAt: '2024-01-20T14:00:00Z',
      assignedDriverId: 'DRV-003'
    },
    {
      id: 'SHP-2024-004',
      clientName: 'Manufacturing Pro',
      originCity: 'Chicago, IL',
      destinationCity: 'Detroit, MI',
      weightTons: 22,
      volumeM3: 28,
      priceUsd: 1950,
      status: 'delivered',
      createdAt: '2024-01-12T12:00:00Z',
      assignedAt: '2024-01-12T13:30:00Z',
      pickupAt: '2024-01-13T09:00:00Z',
      deliveredAt: '2024-01-13T15:45:00Z',
      assignedDriverId: 'DRV-001'
    },
    {
      id: 'SHP-2024-005',
      clientName: 'Pacific Trading',
      originCity: 'San Francisco, CA',
      destinationCity: 'Las Vegas, NV',
      weightTons: 35,
      volumeM3: 55,
      priceUsd: 3800,
      status: 'in-transit',
      createdAt: '2024-01-19T16:00:00Z',
      assignedAt: '2024-01-19T17:00:00Z',
      pickupAt: '2024-01-20T07:00:00Z',
      assignedDriverId: 'DRV-005'
    },
    {
      id: 'SHP-2024-006',
      clientName: 'RetailMax Corp',
      originCity: 'Houston, TX',
      destinationCity: 'Dallas, TX',
      weightTons: 15,
      priceUsd: 1200,
      status: 'pending',
      createdAt: '2024-01-21T11:00:00Z'
    }
  ],
  customers: [
    {
      id: 'CUST-001',
      name: 'Acme Corporation',
      primaryContact: 'John Smith',
      phone: '+1 (555) 111-2222',
      email: 'contact@acme-corp.com',
      city: 'Los Angeles',
      country: 'USA',
      industry: 'manufacturing',
      billingTerms: 'net-30',
      totalShipments: 45,
      totalRevenue: 125000,
      avgMargin: 18.5,
      lastShipmentDate: '2024-01-20'
    },
    {
      id: 'CUST-002',
      name: 'TechFlow Inc.',
      primaryContact: 'Sarah Johnson',
      phone: '+1 (555) 222-3333',
      email: 'logistics@techflow.com',
      city: 'Seattle',
      country: 'USA',
      industry: 'technology',
      billingTerms: 'prepaid',
      totalShipments: 32,
      totalRevenue: 89500,
      avgMargin: 22.3,
      lastShipmentDate: '2024-01-18'
    },
    {
      id: 'CUST-003',
      name: 'Global Supplies Ltd.',
      primaryContact: 'Michael Chen',
      phone: '+1 (555) 333-4444',
      email: 'shipping@globalsupplies.com',
      city: 'Miami',
      country: 'USA',
      industry: 'retail',
      billingTerms: 'net-14',
      totalShipments: 28,
      totalRevenue: 76200,
      avgMargin: 15.8,
      lastShipmentDate: '2024-01-15'
    },
    {
      id: 'CUST-004',
      name: 'Manufacturing Pro',
      primaryContact: 'Lisa Rodriguez',
      phone: '+1 (555) 444-5555',
      email: 'orders@mfgpro.com',
      city: 'Chicago',
      country: 'USA',
      industry: 'manufacturing',
      billingTerms: 'collect',
      totalShipments: 18,
      totalRevenue: 52300,
      avgMargin: 20.1,
      lastShipmentDate: '2024-01-12'
    },
    {
      id: 'CUST-005',
      name: 'RetailMax Corp',
      primaryContact: 'David Wilson',
      phone: '+1 (555) 555-6666',
      email: 'logistics@retailmax.com',
      city: 'Houston',
      country: 'USA',
      industry: 'retail',
      billingTerms: 'net-7',
      totalShipments: 38,
      totalRevenue: 95800,
      avgMargin: 16.7,
      lastShipmentDate: '2024-01-21'
    },
    {
      id: 'CUST-006',
      name: 'AutoParts Direct',
      primaryContact: 'Jennifer Lee',
      phone: '+1 (555) 666-7777',
      email: 'shipping@autopartsdirect.com',
      city: 'Detroit',
      country: 'USA',
      industry: 'automotive',
      billingTerms: 'net-30',
      totalShipments: 25,
      totalRevenue: 67400,
      avgMargin: 19.2,
      lastShipmentDate: '2024-01-19'
    }
  ],
  vendors: [
    {
      id: 'VEN-001',
      name: 'Swift Logistics LLC',
      primaryContact: 'Robert Martinez',
      phone: '+1 (555) 777-8888',
      email: 'dispatch@swiftlogistics.com',
      city: 'Dallas',
      country: 'USA',
      licenseNumber: 'TX-12345',
      mcNumber: 'MC-123456',
      insuranceValid: true,
      equipmentTypes: ['dry-van', 'reefer'],
      serviceRegions: ['north-america'],
      onTimePercentage: 96,
      totalCost: 245000,
      shipmentsServed: 42,
      lastUsed: '2024-01-20'
    },
    {
      id: 'VEN-002',
      name: 'Mountain Express Carriers',
      primaryContact: 'Amanda Thompson',
      phone: '+1 (555) 888-9999',
      email: 'ops@mountainexpress.com',
      city: 'Denver',
      country: 'USA',
      licenseNumber: 'CO-67890',
      mcNumber: 'MC-789012',
      insuranceValid: true,
      equipmentTypes: ['flatbed', 'hazmat'],
      serviceRegions: ['north-america'],
      onTimePercentage: 92,
      totalCost: 189000,
      shipmentsServed: 35,
      lastUsed: '2024-01-18'
    },
    {
      id: 'VEN-003',
      name: 'Coastal Freight Solutions',
      primaryContact: 'Mark Johnson',
      phone: '+1 (555) 999-0000',
      email: 'booking@coastalfreight.com',
      city: 'Long Beach',
      country: 'USA',
      licenseNumber: 'CA-54321',
      mcNumber: 'MC-345678',
      insuranceValid: false,
      equipmentTypes: ['dry-van', 'reefer', 'flatbed'],
      serviceRegions: ['north-america'],
      onTimePercentage: 88,
      totalCost: 156000,
      shipmentsServed: 28,
      lastUsed: '2024-01-15'
    },
    {
      id: 'VEN-004',
      name: 'Midwest Transport Group',
      primaryContact: 'Patricia Davis',
      phone: '+1 (555) 000-1111',
      email: 'dispatch@midwesttransport.com',
      city: 'Kansas City',
      country: 'USA',
      licenseNumber: 'MO-98765',
      mcNumber: 'MC-901234',
      insuranceValid: true,
      equipmentTypes: ['dry-van', 'tanker'],
      serviceRegions: ['north-america'],
      onTimePercentage: 94,
      totalCost: 198000,
      shipmentsServed: 31,
      lastUsed: '2024-01-17'
    },
    {
      id: 'VEN-005',
      name: 'Atlantic Shipping Co',
      primaryContact: 'Thomas Brown',
      phone: '+1 (555) 111-2222',
      email: 'operations@atlanticshipping.com',
      city: 'Atlanta',
      country: 'USA',
      licenseNumber: 'GA-13579',
      mcNumber: 'MC-567890',
      insuranceValid: true,
      equipmentTypes: ['reefer', 'hazmat'],
      serviceRegions: ['north-america'],
      onTimePercentage: 97,
      totalCost: 267000,
      shipmentsServed: 48,
      lastUsed: '2024-01-19'
    }
  ]
};