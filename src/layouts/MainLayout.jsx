import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { motion, AnimatePresence } from 'framer-motion';

export default function MainLayout({ children, userInitial = 'U' }) {
    // État pour mobile/tablette uniquement
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Fermer le menu mobile quand on redimensionne vers desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) { // lg breakpoint
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Overlay sombre quand le menu mobile est ouvert */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black lg:hidden z-20"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Desktop - Toujours visible sur desktop */}
            <aside className="hidden lg:block fixed top-0 left-0 h-full w-[190px] bg-white shadow-lg z-30">
                <NavBar userInitial={userInitial} variant="sidebar" />
            </aside>

            {/* Sidebar Mobile - Animée seulement sur mobile/tablette */}
            <motion.aside
                initial={false}
                animate={{ 
                    x: isMobileMenuOpen ? 0 : '-100%'
                }}
                className="lg:hidden fixed top-0 left-0 h-full w-[190px] bg-white shadow-lg z-30"
                transition={{ type: "tween", duration: 0.3 }}
            >
                <NavBar 
                    userInitial={userInitial} 
                    variant="sidebar" 
                    onCloseMobile={() => setIsMobileMenuOpen(false)}
                    showCloseButton={true}
                />
            </motion.aside>

            {/* Main content area */}
            <div className="lg:pl-[190px]">
                {/* Topbar */}
                <header className="fixed top-0 right-0 left-0 lg:left-[190px] h-14 bg-white shadow-sm z-20">
                    <NavBar 
                        userInitial={userInitial} 
                        variant="topbar"
                        isMobileMenuOpen={isMobileMenuOpen}
                        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    />
                </header>

                {/* Main content */}
                <main className="pt-14">
                    <div className="p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}