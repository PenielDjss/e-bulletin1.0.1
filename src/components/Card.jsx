import React from 'react';

export default function Card({
                                 children,
                                 title = null,
                                 footer = null,
                                 onClick = null,
                                 className = ""
                             }) {
    return (
        <div
            className={`bg-white rounded-lg shadow-md overflow-hidden ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''} ${className}`}
            onClick={onClick}
        >
            {title && (
                <div className="px-4 py-3 border-b border-gray-200">
                    <h3 className="font-medium text-gray-800">{title}</h3>
                </div>
            )}
            <div className="p-4">
                {children}
            </div>
            {footer && (
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                    {footer}
                </div>
            )}
        </div>
    );
}