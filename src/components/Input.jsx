import React from 'react';

export default function Input({
    label,
    type = 'text',
    placeholder = '',
    value,
    onChange,
    error = null,
    name,
    required = false,
    icon = null,
    // Nouvelles props
    onBlur,
    onFocus,
    onKeyDown,
    autoFocus,
    className = '',
    inputMode,
    pattern,
    // Pour permettre d'autres attributs HTML standards
    ...restProps
}) {
    return (
        <div className="mb-4">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onKeyDown={onKeyDown}
                    autoFocus={autoFocus}
                    inputMode={inputMode}
                    pattern={pattern}
                    className={`w-full py-2 px-4 ${icon ? 'pl-10' : ''} border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                        error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                    } ${className}`}
                    {...restProps}
                />
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}