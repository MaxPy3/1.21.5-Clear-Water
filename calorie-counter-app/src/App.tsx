import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Target, TrendingUp, Search } from 'lucide-react';
import Dashboard from './components/Dashboard';
import AddFood from './components/AddFood';
import FoodSearch from './components/FoodSearch';
import Progress from './components/Progress';
import { FoodItem, DailyEntry } from './types';
import { foodDatabase } from './data/foodDatabase';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dailyEntries, setDailyEntries] = useState<DailyEntry[]>([]);
  const [dailyGoal, setDailyGoal] = useState(2000);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('calorieEntries');
    const savedGoal = localStorage.getItem('dailyGoal');
    
    if (savedEntries) {
      setDailyEntries(JSON.parse(savedEntries));
    }
    if (savedGoal) {
      setDailyGoal(parseInt(savedGoal));
    }
  }, []);

  // Save data to localStorage whenever entries or goal changes
  useEffect(() => {
    localStorage.setItem('calorieEntries', JSON.stringify(dailyEntries));
  }, [dailyEntries]);

  useEffect(() => {
    localStorage.setItem('dailyGoal', dailyGoal.toString());
  }, [dailyGoal]);

  const addFoodEntry = (food: FoodItem, quantity: number, meal: string) => {
    const today = new Date().toISOString().split('T')[0];
    const calories = Math.round((food.calories * quantity) / food.servingSize);
    
    const newEntry: DailyEntry = {
      id: Date.now().toString(),
      food: food.name,
      calories,
      quantity,
      servingSize: food.servingSize,
      meal,
      date: today,
      timestamp: new Date().toISOString()
    };

    setDailyEntries(prev => [...prev, newEntry]);
  };

  const deleteEntry = (id: string) => {
    setDailyEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const getTodayEntries = () => {
    const today = new Date().toISOString().split('T')[0];
    return dailyEntries.filter(entry => entry.date === today);
  };

  const getTodayCalories = () => {
    return getTodayEntries().reduce((total, entry) => total + entry.calories, 0);
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Calendar },
    { id: 'add', label: 'Add Food', icon: Plus },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'progress', label: 'Progress', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Calorie Counter
          </h1>
          <p className="text-gray-600">Track your daily nutrition goals</p>
        </div>

        {/* Daily Goal Setting */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target className="text-blue-500" size={24} />
              <span className="text-lg font-semibold text-gray-700">Daily Goal</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={dailyGoal}
                onChange={(e) => setDailyGoal(parseInt(e.target.value) || 0)}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-center font-semibold"
                min="0"
              />
              <span className="text-gray-600">calories</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  } ${tab.id === 'dashboard' ? 'rounded-l-xl' : ''} ${
                    tab.id === 'progress' ? 'rounded-r-xl' : ''
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {activeTab === 'dashboard' && (
            <Dashboard
              entries={getTodayEntries()}
              dailyGoal={dailyGoal}
              onDeleteEntry={deleteEntry}
            />
          )}
          {activeTab === 'add' && (
            <AddFood onAddFood={addFoodEntry} />
          )}
          {activeTab === 'search' && (
            <FoodSearch onAddFood={addFoodEntry} />
          )}
          {activeTab === 'progress' && (
            <Progress entries={dailyEntries} dailyGoal={dailyGoal} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;