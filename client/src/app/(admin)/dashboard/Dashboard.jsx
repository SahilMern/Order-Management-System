"use client"
import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import DashboardHome from './DashboardHome';
import Products from './Productssss/Products';
import Orders from './Orders';
import Users from './Users';
import Reports from './Reports';
import Settings from './Settings';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    switch(activeMenu) {
      case 'dashboard': return <DashboardHome />;
      case 'products': return <Products />;
      case 'orders': return <Orders />;
      case 'users': return <Users />;
      case 'reports': return <Reports />;
      case 'settings': return <Settings />;
      default: return <DashboardHome />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        isOpen={sidebarOpen} 
        toggle={toggleSidebar}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          isSidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          activeMenu={activeMenu}
        />
        
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;