import React, { useState } from "react";
import {
  Menu as MenuIcon,
  X,
  Settings,
  LogOut,
  ScrollText,
  Calendar,
  Bell,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProfileIcon from "./ProfileIcon";

export default function NavBar({
  userInitial = "U",
  variant = "sidebar",
  isMenuOpen,
  onToggleMenu,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const currentPage = location.pathname.split("/").pop() || "bulletins";

  // Render sidebar content
  if (variant === "sidebar") {
    return (
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-center h-14 p-4 border-b border-gray-200">
          <p className="font-bold text-lg bg-gradient-to-r from-sky-800 via-blue-400 to-indigo-900 bg-clip-text text-transparent">
            e-Bulletin
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-1 py-4">
          <button
            onClick={() => navigate("/bulletins")}
            className={`w-full text-left text-sm flex items-center px-2 py-1 rounded-lg mb-1 ${
              currentPage === "bulletins"
                ? "bg-blue-50 text-blue-700"
                : "text-gray-800 hover:bg-gray-100"
            }`}
          >
            <ScrollText size={18} className="mr-3" />
            Mes Bulletins
          </button>

          <button
            onClick={() => navigate("/conges")}
            className={`w-full text-left text-sm flex items-center px-2 py-1 rounded-lg mb-1 ${
              currentPage === "conges"
                ? "bg-blue-50 text-blue-700"
                : "text-gray-800 hover:bg-gray-100"
            }`}
          >
            <Calendar size={18} className="mr-3" />
            Congés
          </button>

          <button
            onClick={() => navigate("/settings")}
            className={`w-full text-left text-sm flex items-center px-2 py-1 rounded-lg mb-1 ${
              currentPage === "settings"
                ? "bg-blue-50 text-blue-700"
                : "text-gray-800 hover:bg-gray-100"
            }`}
          >
            <Settings size={18} className="mr-3" />
            Paramètres
          </button>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={logout}
            className="w-full text-left text-sm flex items-center px-2 py-1 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogOut size={18} className="mr-3" />
            Se déconnecter
          </button>
        </div>
      </div>
    );
  }

  // Render topbar content
  if (variant === "topbar") {
    return (
      <>
        <div className="flex items-center justify-between h-full px-6">
          {/* Left section - Toggle Menu */}
          <div className="flex items-center">
            <button
              onClick={onToggleMenu}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden"
            >
              {isMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </button>

            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="ml-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100 flex items-center gap-2"
            >
              <Search size={20} />
              <span className="text-sm hidden md:inline">Rechercher...</span>
            </button>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <Bell size={20} />
            </button>
            <ProfileIcon initial={userInitial} size="sm" />
          </div>
        </div>

        {/* Search Modal */}
        <AnimatePresence>
          {isSearchOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-50"
                onClick={() => setIsSearchOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="fixed top-4 inset-x-4 md:inset-x-auto md:left-1/2 md:right-auto md:w-full md:max-w-2xl md:-translate-x-1/2 bg-white rounded-lg shadow-xl z-50"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                      Recherche
                    </h2>
                    <button
                      onClick={() => setIsSearchOpen(false)}
                      className="p-2 text-gray-500 hover:text-gray-700 rounded-lg"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Rechercher un bulletin, un congé..."
                      autoFocus
                    />
                  </div>

                  <div className="mt-4">
                    <div className="text-sm text-gray-500 mb-2">
                      Recherches récentes
                    </div>
                    <div className="space-y-2">
                      {/* Vous pouvez ajouter ici des recherches récentes animées */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                      >
                        Bulletins de Mars 2025
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                      >
                        Congés été 2025
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }
}
