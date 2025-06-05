import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const CongeSelector = () => {
  const [joursCongeDemandes, setJoursCongeDemandes] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("0");

  const incrementJours = () => {
    const newValue = joursCongeDemandes + 1;
    setJoursCongeDemandes(newValue);
    setInputValue(newValue.toString());
  };

  const decrementJours = () => {
    if (joursCongeDemandes > 0) {
      const newValue = joursCongeDemandes - 1;
      setJoursCongeDemandes(newValue);
      setInputValue(newValue.toString());
    }
  };



  const handleInputChange = (e) => {
    const value = e.target.value;
    // Accepter uniquement les nombres
    if (/^\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    // Convertir en nombre et mettre à jour l'état
    const numValue = parseInt(inputValue) || 0;
    setJoursCongeDemandes(numValue);
    setInputValue(numValue.toString());
  };

  const handleInputFocus = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Demande de congé</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nombre de jours de congé souhaités
        </label>
        
        <div className="flex items-center justify-between">
          <button 
            onClick={decrementJours}
            disabled={joursCongeDemandes === 0}
            className={`flex items-center justify-center w-10 h-10 rounded-full 
              ${joursCongeDemandes === 0 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}
          > 
            <Minus size={20} />
          </button>
          
          <div 
            className="flex-1 mx-4"
            onClick={() => setIsEditing(true)}
          >
            {isEditing ? (
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onKeyDown={handleKeyDown}
                autoFocus
                className="w-full text-center py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="w-full text-center py-2 border border-gray-300 rounded-md cursor-text">
                {joursCongeDemandes}
              </div>
            )}
          </div>
          
          <button 
            onClick={incrementJours}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
      
      <div className="mt-8">
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Soumettre la demande
        </button>
      </div>
    </div>
  );
};

export default CongeSelector;