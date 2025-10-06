import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { DashboardPage } from './components/pages/DashboardPage';
import { ShipmentsPage } from './components/pages/ShipmentsPage';
import { QuotesPage } from './components/pages/QuotesPage';
import { FleetPage } from './components/pages/FleetPage';
import { DriversPage } from './components/pages/DriversPage';
import { VendorsPage } from './components/pages/VendorsPage';
import { FinancePage } from './components/pages/FinancePage';
import { ApprovalsPage } from './components/pages/ApprovalsPage';
import { ReportsPage } from './components/pages/ReportsPage';
import { AdminPage } from './components/pages/AdminPage';

type Page = 'dashboard' | 'shipments' | 'quotes' | 'fleet' | 'drivers' | 'vendors' | 'finance' | 'approvals' | 'reports' | 'admin';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [showNewModal, setShowNewModal] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'shipments':
        return <ShipmentsPage />;
      case 'quotes':
        return <QuotesPage />;
      case 'fleet':
        return <FleetPage />;
      case 'drivers':
        return <DriversPage />;
      case 'vendors':
        return <VendorsPage />;
      case 'finance':
        return <FinancePage />;
      case 'approvals':
        return <ApprovalsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen bg-bg">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onNewClick={() => setShowNewModal(true)} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1600px] mx-auto px-8 py-8">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;