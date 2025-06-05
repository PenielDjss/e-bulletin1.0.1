import React, { useState } from "react";
import Input from "./Input";

const PeriodState = ({ initialCount = 0, onChange, className = "" }) => {
  const [duree, setDuree] = useState(initialCount);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(initialCount.toString());

  const updateValue = (newValue) => {
    setDuree(newValue);
    setInputValue(newValue.toString());
    if (onChange) onChange(newValue);
  };

  const increment = () => updateValue(duree + 1);

  const decrement = () => {
    if (duree > 0) updateValue(duree - 1);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setInputValue(value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    const finalValue = parseInt(inputValue, 10) || 0;
    updateValue(finalValue);
  };

  return (
    <div className={`flex flex-col ml-6 mb-2 ${className}`}>
      <label className="text-sm font-mediumblock font-medium text-gray-700 mb-1">Durée</label>
      <div className="flex gap-0 items-center justify-between p-1">
        <button
          className="w-6 h-6 bg-blue-500 text-white  flex items-center justify-center hover:bg-blue-600 focus:outline-none disabled:bg-gray-300"
          onClick={decrement}
          disabled={duree === 0}
        >
          <span className="text-sm">-</span>
        </button>

        <div className="flex-1 mx-2">
          {isEditing ? (
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onFocus={() => setIsEditing(true)}
              onKeyDown={(e) => e.key === "Enter" && handleInputBlur()}
              autoFocus
              className="w-full text-center py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          ) : (
            <div
              className="w-full text-center py-1 text-sm border border-gray-300 rounded-md cursor-text"
              onClick={() => setIsEditing(true)}
            >
              {duree}
            </div>
          )}
        </div>

        <button
          className="w-6 h-6 bg-blue-500 text-white  flex items-center justify-center hover:bg-blue-600 focus:outline-none"
          onClick={increment}
        >
          <span className="text-sm">+</span>
        </button>
      </div>
    </div>
  );
};

export default PeriodState;