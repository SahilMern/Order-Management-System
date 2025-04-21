import { FiMenu, FiBell, FiUser, FiChevronDown } from 'react-icons/fi';

const Header = ({ isSidebarOpen, toggleSidebar, activeMenu }) => {
  const menuTitles = {
    dashboard: 'Dashboard',
    products: 'Products',
    orders: 'Orders',
    users: 'Users',
    reports: 'Reports',
    settings: 'Settings'
  };

  return (
    <header className="">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="p-2 mr-2 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <FiMenu className="text-xl text-gray-600" />
          </button>
          <h2 className="text-xl font-semibold text-gray-800">
            {menuTitles[activeMenu]}
          </h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 rounded-lg hover:bg-gray-100">
            <FiBell className="text-xl text-gray-600" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <FiUser className="text-gray-600" />
            </div>
            {isSidebarOpen && (
              <>
                <span className="text-gray-700">Admin</span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;