import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { FoodItem } from '../types';
import { foodDatabase } from '../data/foodDatabase';

interface AddFoodProps {
  onAddFood: (food: FoodItem, quantity: number, meal: string) => void;
}

const AddFood: React.FC<AddFoodProps> = ({ onAddFood }) => {
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [meal, setMeal] = useState('Breakfast');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const filteredFoods = foodDatabase.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFoodSelect = (food: FoodItem) => {
    setSelectedFood(food);
    setShowSearchResults(false);
    setSearchTerm(food.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFood && quantity > 0) {
      onAddFood(selectedFood, quantity, meal);
      setSelectedFood(null);
      setQuantity(1);
      setSearchTerm('');
    }
  };

  const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Food Entry</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Food Search */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search for Food
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSearchResults(true);
                if (e.target.value === '') {
                  setSelectedFood(null);
                }
              }}
              onFocus={() => setShowSearchResults(true)}
              placeholder="Type to search for food..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Search Results */}
          {showSearchResults && searchTerm && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredFoods.length > 0 ? (
                filteredFoods.map(food => (
                  <button
                    key={food.id}
                    type="button"
                    onClick={() => handleFoodSelect(food)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="font-medium text-gray-800">{food.name}</div>
                    <div className="text-sm text-gray-600">
                      {food.calories} cal per {food.servingSize} {food.servingUnit}
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500">No foods found</div>
              )}
            </div>
          )}
        </div>

        {/* Selected Food Info */}
        {selectedFood && (
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Selected Food</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Name:</span>
                <span className="ml-2 font-medium">{selectedFood.name}</span>
              </div>
              <div>
                <span className="text-gray-600">Calories:</span>
                <span className="ml-2 font-medium">{selectedFood.calories} per {selectedFood.servingSize} {selectedFood.servingUnit}</span>
              </div>
              {selectedFood.protein && (
                <div>
                  <span className="text-gray-600">Protein:</span>
                  <span className="ml-2 font-medium">{selectedFood.protein}g</span>
                </div>
              )}
              {selectedFood.carbs && (
                <div>
                  <span className="text-gray-600">Carbs:</span>
                  <span className="ml-2 font-medium">{selectedFood.carbs}g</span>
                </div>
              )}
              {selectedFood.fat && (
                <div>
                  <span className="text-gray-600">Fat:</span>
                  <span className="ml-2 font-medium">{selectedFood.fat}g</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(0.25, quantity - 0.25))}
              className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
              min="0.25"
              step="0.25"
              className="w-20 text-center border border-gray-300 rounded-lg py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setQuantity(quantity + 0.25)}
              className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors"
            >
              +
            </button>
            <span className="text-gray-600">
              {selectedFood ? `${selectedFood.servingUnit}${quantity > 1 ? 's' : ''}` : 'servings'}
            </span>
          </div>
        </div>

        {/* Meal Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meal
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {meals.map(mealOption => (
              <button
                key={mealOption}
                type="button"
                onClick={() => setMeal(mealOption)}
                className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                  meal === mealOption
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {mealOption}
              </button>
            ))}
          </div>
        </div>

        {/* Calories Preview */}
        {selectedFood && quantity > 0 && (
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700">
                {Math.round((selectedFood.calories * quantity) / selectedFood.servingSize)} calories
              </div>
              <div className="text-sm text-green-600">
                {quantity} {selectedFood.servingUnit}{quantity > 1 ? 's' : ''} of {selectedFood.name}
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!selectedFood || quantity <= 0}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Add to Food Log
        </button>
      </form>
    </div>
  );
};

export default AddFood;