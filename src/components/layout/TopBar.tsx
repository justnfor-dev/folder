import { Search, Plus, User, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Role } from '../../types';
import { useState } from 'react';

interface TopBarProps {
  onNewClick: () => void;
}

export function TopBar({ onNewClick }: TopBarProps) {
  const { user, setRole } = useAuthStore();
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const roles: { value: Role; label: string }[] = [
    { value: 'manager', label: 'Manager' },
    { value: 'logistics', label: 'Logistics Coordinator' },
    { value: 'sales', label: 'Sales Specialist' },
    { value: 'accountant', label: 'Accountant' },
    { value: 'admin', label: 'Admin' },
  ];

  const currentRoleLabel = roles.find((r) => r.value === user?.role)?.label || 'Unknown';

  return (
    <header className="h-16 bg-panel border-b border-line sticky top-0 z-10">
      <div className="h-full px-6 flex items-center justify-between gap-6">
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input
              type="text"
              placeholder="Search shipments, quotes, vehicles..."
              className="w-full pl-10 pr-4 py-2 bg-bg border border-line rounded-lg text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onNewClick}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand/90 transition-colors"
          >
            <Plus size={18} />
            <span>New</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-bg transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-sm font-medium">
                <User size={18} />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-ink">{user?.name}</div>
                <div className="text-xs text-muted">{currentRoleLabel}</div>
              </div>
              <ChevronDown size={16} className="text-muted" />
            </button>

            {showRoleMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowRoleMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-panel rounded-lg border border-line shadow-lg z-20">
                  <div className="px-3 py-2 border-b border-line">
                    <div className="text-xs font-medium text-muted">Switch Role</div>
                  </div>
                  <div className="py-1">
                    {roles.map((role) => (
                      <button
                        key={role.value}
                        onClick={() => {
                          setRole(role.value);
                          setShowRoleMenu(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-bg transition-colors ${
                          user?.role === role.value ? 'text-brand font-medium' : 'text-ink'
                        }`}
                      >
                        {role.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
