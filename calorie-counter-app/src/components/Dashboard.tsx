import React from 'react';
import { Trash2, Clock, Utensils } from 'lucide-react';
import { DailyEntry } from '../types';

interface DashboardProps {
  entries: DailyEntry[];
  dailyGoal: number;
  onDeleteEntry: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ entries, dailyGoal, onDeleteEntry }) => {
  const totalCalories = entries.reduce((sum, entry) => sum + entry.calories, 0);
  const remainingCalories = dailyGoal - totalCalories;
  const progressPercentage = Math.min((totalCalories / dailyGoal) * 100, 100);

  const getMealEntries = (meal: string) => {
    return entries.filter(entry => entry.meal === meal);
  };

  const getMealCalories = (meal: string) => {
    return getMealEntries(meal).reduce((sum, entry) => sum + entry.calories, 0);
  };

  const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

  return (
    <div className="space-y-6">
      {/* Daily Progress */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">Today's Progress</h2>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-3xl font-bold">{totalCalories}</div>
            <div className="text-blue-100">calories consumed</div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{remainingCalories}</div>
            <div className="text-blue-100">remaining</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-3">
          <div
            className="bg-white h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="text-center mt-2 text-blue-100">
          {progressPercentage.toFixed(1)}% of daily goal
        </div>
      </div>

      {/* Meal Breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {meals.map(meal => {
          const mealCalories = getMealCalories(meal);
          const mealEntries = getMealEntries(meal);
          
          return (
            <div key={meal} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Utensils size={16} className="text-gray-600" />
                <span className="font-semibold text-gray-700">{meal}</span>
              </div>
              <div className="text-2xl font-bold text-gray-800">{mealCalories}</div>
              <div className="text-sm text-gray-600">{mealEntries.length} items</div>
            </div>
          );
        })}
      </div>

      {/* Food Entries */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Today's Food Log</h3>
        {entries.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Utensils size={48} className="mx-auto mb-4 opacity-50" />
            <p>No food entries yet today</p>
            <p className="text-sm">Add some food to start tracking!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {entries
              .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
              .map(entry => (
                <div key={entry.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 rounded-full p-2">
                      <Utensils size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{entry.food}</div>
                      <div className="text-sm text-gray-600">
                        {entry.quantity} {entry.servingSize === 1 ? 'serving' : 'servings'} • {entry.meal}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-bold text-gray-800">{entry.calories} cal</div>
                      <div className="text-xs text-gray-500">
                        <Clock size={12} className="inline mr-1" />
                        {new Date(entry.timestamp).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                    <button
                      onClick={() => onDeleteEntry(entry.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;