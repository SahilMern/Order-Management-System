"use client";
import {
  FiHome,
  FiShoppingBag,
  FiUsers,
  FiFileText,
  FiSettings,
  FiPieChart,
  FiMenu,
  FiX,
  FiList,
} from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ isOpen, toggle }) => {
  const pathname = usePathname();

  const menuItems = [
    {
      id: "dashboard",
      path: "/dashboard",
      icon: <FiHome className="text-lg" />,
      label: "Dashboard",
    },
    {
      id: "products",
      path: "/dashboard/products",
      icon: <FiShoppingBag className="text-lg" />,
      label: "Products",
    },
    {
      id: "addproducts",
      path: "/dashboard/addproducts",
      icon: <FiFileText className="text-lg" />,
      label: "Add Product",
    },
    {
      id: "orders",
      path: "/dashboard/orders",
      icon: <FiList className="text-lg" />,
      label: "Orders",
    },
  ];

  // Function to determine if a menu item is active
  const isActive = (path) => {
    if (path === "/dashboard") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <div
      className={`bg-gray-800 text-white transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isOpen && <h1 className="text-xl font-bold">Admin</h1>}
        <button onClick={toggle} className="p-1 rounded-lg hover:bg-gray-700">
          {isOpen ? (
            <FiX className="text-xl" />
          ) : (
            <FiMenu className="text-xl" />
          )}
        </button>
      </div>

      <nav className="p-2">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.path}
                className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-700 text-gray-300"
                }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {isOpen && <span className="ml-3">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
