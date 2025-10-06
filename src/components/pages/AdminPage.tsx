import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Users, Shield, Settings as SettingsIcon, FileText } from 'lucide-react';

const mockUsers = [
  { id: 'u1', name: 'Alex Johnson', email: 'alex@akyol.kz', role: 'Manager', status: 'active' },
  { id: 'u2', name: 'Dana Murat', email: 'dana@akyol.kz', role: 'Logistics Coordinator', status: 'active' },
  { id: 'u3', name: 'Sara Kim', email: 'sara@akyol.kz', role: 'Sales Specialist', status: 'active' },
  { id: 'u4', name: 'Timur Orazov', email: 'timur@akyol.kz', role: 'Accountant', status: 'active' },
];

const modules = ['Shipments', 'Quotes', 'Fleet', 'Vendors', 'Finance', 'Approvals'];
const roles = ['Sales Specialist', 'Logistics Coordinator', 'Accountant', 'Manager'];

export function AdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-brand">Admin</h1>
        <p className="text-sm text-muted mt-1">Manage users, roles, and system settings</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="py-6 text-center">
            <Users size={32} className="text-brand mx-auto mb-3" />
            <div className="text-sm font-medium text-ink">Users</div>
            <div className="text-2xl font-semibold text-brand mt-1">{mockUsers.length}</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="py-6 text-center">
            <Shield size={32} className="text-brand mx-auto mb-3" />
            <div className="text-sm font-medium text-ink">Roles</div>
            <div className="text-2xl font-semibold text-brand mt-1">{roles.length}</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="py-6 text-center">
            <SettingsIcon size={32} className="text-brand mx-auto mb-3" />
            <div className="text-sm font-medium text-ink">Settings</div>
            <div className="text-sm text-muted mt-1">Configure</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="py-6 text-center">
            <FileText size={32} className="text-brand mx-auto mb-3" />
            <div className="text-sm font-medium text-ink">Audit Log</div>
            <div className="text-sm text-muted mt-1">View activity</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-ink">Users</h3>
            <Button size="sm">Invite User</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg border-b border-line">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-panel divide-y divide-line">
                {mockUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-bg transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-ink">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="blue">{user.role}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="green">{user.status}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-brand hover:underline mr-4">Edit</button>
                      <button className="text-danger hover:underline">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold text-ink">Role Permissions Matrix</h3>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-bg border-b border-line">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase">
                    Module
                  </th>
                  {roles.map((role) => (
                    <th key={role} className="px-6 py-3 text-center text-xs font-medium text-muted uppercase">
                      {role}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-panel divide-y divide-line">
                {modules.map((module) => (
                  <tr key={module} className="hover:bg-bg transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-ink">
                      {module}
                    </td>
                    {roles.map((role) => (
                      <td key={role} className="px-6 py-4 text-center">
                        <input
                          type="checkbox"
                          defaultChecked={Math.random() > 0.3}
                          className="rounded border-line text-brand"
                        />
                      </td>
                    ))}
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
