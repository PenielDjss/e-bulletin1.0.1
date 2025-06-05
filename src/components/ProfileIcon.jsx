import React from 'react';

export default function ProfileIcon({ initial = 'U', size = 'md' }) {
    const sizes = {
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg'
    };

    return (
        <div className={`${sizes[size]} flex items-center justify-center rounded-full bg-blue-600 text-white font-medium`}>
            {initial.toUpperCase()}
        </div>
    );
}