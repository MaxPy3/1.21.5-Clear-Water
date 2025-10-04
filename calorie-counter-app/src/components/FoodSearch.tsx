import React, { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { FoodItem } from '../types';
import { foodDatabase } from '../data/foodDatabase';

interface FoodSearchProps {
  onAddFood: (food: FoodItem, quantity: number, meal: string) => void;
}

const FoodSearch: React.FC<FoodSearchProps> = ({ onAddFood }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [meal, setMeal] = useState('Breakfast');

  const categories = [
    'All',
    'Fruits',
    'Vegetables', 
    'Proteins',
    'Grains',
    'Dairy',
    'Nuts & Seeds',
    'Common Foods'
  ];

  const getFoodCategory = (food: FoodItem): string => {
    const name = food.name.toLowerCase();
    if (['apple', 'banana', 'orange', 'strawberries'].some(f => name.includes(f))) return 'Fruits';
    if (['broccoli', 'carrot', 'spinach'].some(f => name.includes(f))) return 'Vegetables';
    if (['chicken', 'salmon', 'eggs', 'yogurt'].some(f => name.includes(f))) return 'Proteins';
    if (['rice', 'quinoa', 'oats'].some(f => name.includes(f))) return 'Grains';
    if (['milk', 'cheese'].some(f => name.includes(f))) return 'Dairy';
    if (['almonds', 'peanut'].some(f => name.includes(f))) return 'Nuts & Seeds';
    return 'Common Foods';
  };

  const filteredFoods = foodDatabase.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || getFoodCategory(food) === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddFood = (food: FoodItem) => {
    onAddFood(food, quantity, meal);
    setSelectedFood(null);
    setQuantity(1);
  };

  const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Food Database</h2>
      
      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for food..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFoods.map(food => (
          <div key={food.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-gray-800">{food.name}</h3>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {getFoodCategory(food)}
              </span>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex justify-between">
                <span>Calories:</span>
                <span className="font-medium">{food.calories} cal</span>
              </div>
              <div className="flex justify-between">
                <span>Serving:</span>
                <span className="font-medium">{food.servingSize} {food.servingUnit}</span>
              </div>
              {food.protein && (
                <div className="flex justify-between">
                  <span>Protein:</span>
                  <span className="font-medium">{food.protein}g</span>
                </div>
              )}
              {food.carbs && (
                <div className="flex justify-between">
                  <span>Carbs:</span>
                  <span className="font-medium">{food.carbs}g</span>
                </div>
              )}
              {food.fat && (
                <div className="flex justify-between">
                  <span>Fat:</span>
                  <span className="font-medium">{food.fat}g</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedFood(food)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              Add to Log
            </button>
          </div>
        ))}
      </div>

      {filteredFoods.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Search size={48} className="mx-auto mb-4 opacity-50" />
          <p>No foods found matching your search</p>
          <p className="text-sm">Try adjusting your search term or category filter</p>
        </div>
      )}

      {/* Quick Add Modal */}
      {selectedFood && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Add {selectedFood.name}</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
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
                    onClick={() => setQuantity(quantity + 0.25)}
                    className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors"
                  >
                    +
                  </button>
                  <span className="text-gray-600">
                    {selectedFood.servingUnit}{quantity > 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meal
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {meals.map(mealOption => (
                    <button
                      key={mealOption}
                      onClick={() => setMeal(mealOption)}
                      className={`py-2 px-3 rounded-lg font-medium transition-colors text-sm ${
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

              <div className="bg-green-50 rounded-lg p-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-700">
                    {Math.round((selectedFood.calories * quantity) / selectedFood.servingSize)} calories
                  </div>
                  <div className="text-sm text-green-600">
                    {quantity} {selectedFood.servingUnit}{quantity > 1 ? 's' : ''}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedFood(null)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAddFood(selectedFood)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Add to Log
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodSearch;