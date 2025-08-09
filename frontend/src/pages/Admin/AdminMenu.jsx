import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        className={`fixed z-50 p-3 rounded-lg bg-[#1f1f1f] shadow-lg transition-all duration-300 ${
          isMenuOpen ? "top-3 right-3" : "top-5 right-5"
        }`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="white" size={20} />
        ) : (
          <>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
          </>
        )}
      </button>

      {/* Side Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-[#121212] shadow-2xl z-40 transform transition-transform duration-500 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
            Admin Panel
          </h2>
          <ul className="space-y-4">
            {[
              { to: "/admin/dashboard", label: "Dashboard" },
              { to: "/admin/categorylist", label: "Create Category" },
              { to: "/admin/productlist", label: "Create Product" },
              { to: "/admin/allproducts", label: "All Products" },
              { to: "/admin/userlist", label: "Manage Users" },
              { to: "/admin/orderlist", label: "Manage Orders" },
            ].map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `block py-3 px-4 rounded-lg text-lg font-medium transition-all ${
                      isActive
                        ? "text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg"
                        : "text-gray-300 hover:bg-[#1f1f1f] hover:text-pink-400"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
