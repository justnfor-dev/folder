import {
  LayoutDashboard,
  Package,
  FileText,
  Truck,
  Users,
  DollarSign,
  CheckCircle,
  BarChart3,
  Settings,
  Building2,
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'shipments', label: 'Shipments', icon: Package },
  { id: 'quotes', label: 'Quotes', icon: FileText },
  { id: 'fleet', label: 'Fleet', icon: Truck },
  { id: 'drivers', label: 'Drivers', icon: Users },
  { id: 'vendors', label: 'Vendors', icon: Building2 },
  { id: 'finance', label: 'Finance', icon: DollarSign },
  { id: 'approvals', label: 'Approvals', icon: CheckCircle },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'admin', label: 'Admin', icon: Settings },
];

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <aside className="w-64 bg-panel border-r border-line h-screen sticky top-0 flex flex-col">
      <div className="px-6 py-6 border-b border-line">
        <h1 className="text-xl font-semibold text-brand">Ak-Yol Logistics</h1>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand text-white'
                  : 'text-ink hover:bg-bg'
              }`}
            >
              <Icon size={18} strokeWidth={2} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-line">
        <div className="text-xs text-muted px-3">v1.0.0</div>
      </div>
    </aside>
  );
}
