import React from 'react';

export default function Button({ children, onClick, variant = 'primary', disabled = false, fullWidth = false, icon = null }) {
    const baseClasses = "flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 px-2 py-1";

    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm",
        secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
        outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
        danger: "bg-red-600 hover:bg-red-700 text-white",
        success: "bg-green-600 hover:bg-green-700 text-white",
    };

    const classes = `${baseClasses} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`;

    return (
        <button
            className={classes}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && <span className="flex-shrink-0">{icon}</span>}
            {children}
        </button>
    );
}

