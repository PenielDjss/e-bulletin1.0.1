import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { motion, AnimatePresence } from 'framer-motion';

export default function MainLayout({ children, userInitial = 'U' }) {
     const [isMenuOpen, setIsMenuOpen] = useState(() => {
        const saved = localStorage.getItem('sidebarOpen');
        return saved !== null ? JSON.parse(saved) : false;
    });

    // Sauvegarder l'état dans localStorage à chaque changement
    useEffect(() => {
        localStorage.setItem('sidebarOpen', JSON.stringify(isMenuOpen));
    }, [isMenuOpen]);


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Overlay sombre quand le menu est ouvert sur mobile */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black lg:hidden z-20"
                        onClick={() => setIsMenuOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar avec position absolute/fixed */}
            <motion.aside
                initial={false}
                animate={{ 
                    x: isMenuOpen ? 0 : '-100%'
                }}
                className="fixed top-0 left-0 h-full w-[190px] bg-white shadow-lg z-30"
                transition={{ type: "tween", duration: 0.3 }}
            >
                <NavBar userInitial={userInitial} variant="sidebar" />
            </motion.aside>

            {/* Main content area - toujours à la même position */}
            <div className="lg:pl-[190px]"> {/* Marge fixe sur desktop uniquement */}
                {/* Topbar - fixed */}
                <header className="fixed top-0 right-0 left-0 lg:left-[190px] h-14 bg-white shadow-sm z-20">
                    <NavBar 
                        userInitial={userInitial} 
                        variant="topbar"
                        isMenuOpen={isMenuOpen}
                        onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
                    />
                </header>

                {/* Main content - scrollable */}
                <main className="pt-14"> {/* Ajusté pour la hauteur de la topbar */}
                    <div className="p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );

}