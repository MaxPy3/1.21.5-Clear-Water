import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Calendar, TrendingUp, Target } from 'lucide-react';
import { DailyEntry } from '../types';
import { format, subDays, eachDayOfInterval, isSameDay } from 'date-fns';

interface ProgressProps {
  entries: DailyEntry[];
  dailyGoal: number;
}

const Progress: React.FC<ProgressProps> = ({ entries, dailyGoal }) => {
  const [timeRange, setTimeRange] = useState('7');

  const getDateRange = () => {
    const days = parseInt(timeRange);
    const endDate = new Date();
    const startDate = subDays(endDate, days - 1);
    return eachDayOfInterval({ start: startDate, end: endDate });
  };

  const getDailyData = () => {
    const dateRange = getDateRange();
    
    return dateRange.map(date => {
      const dateStr = format(date, 'yyyy-MM-dd');
      const dayEntries = entries.filter(entry => entry.date === dateStr);
      const caloriesConsumed = dayEntries.reduce((sum, entry) => sum + entry.calories, 0);
      
      return {
        date: format(date, 'MMM dd'),
        fullDate: dateStr,
        calories: caloriesConsumed,
        goal: dailyGoal,
        deficit: Math.max(0, dailyGoal - caloriesConsumed),
        surplus: Math.max(0, caloriesConsumed - dailyGoal)
      };
    });
  };

  const getWeeklyStats = () => {
    const data = getDailyData();
    const totalCalories = data.reduce((sum, day) => sum + day.calories, 0);
    const avgCalories = totalCalories / data.length;
    const daysOnGoal = data.filter(day => day.calories >= dailyGoal * 0.8 && day.calories <= dailyGoal * 1.2).length;
    
    return {
      totalCalories,
      avgCalories: Math.round(avgCalories),
      daysOnGoal,
      totalDays: data.length
    };
  };

  const getMealDistribution = () => {
    const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
    const dateRange = getDateRange();
    const recentEntries = entries.filter(entry => 
      dateRange.some(date => entry.date === format(date, 'yyyy-MM-dd'))
    );

    return meals.map(meal => {
      const mealEntries = recentEntries.filter(entry => entry.meal === meal);
      const calories = mealEntries.reduce((sum, entry) => sum + entry.calories, 0);
      return {
        meal,
        calories: Math.round(calories / dateRange.length) // Average per day
      };
    });
  };

  const chartData = getDailyData();
  const weeklyStats = getWeeklyStats();
  const mealData = getMealDistribution();

  const timeRanges = [
    { value: '7', label: '7 Days' },
    { value: '14', label: '14 Days' },
    { value: '30', label: '30 Days' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Progress Tracking</h2>
        <div className="flex gap-2">
          {timeRanges.map(range => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeRange === range.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Weekly Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-blue-600" size={20} />
            <span className="text-sm font-medium text-blue-800">Total Calories</span>
          </div>
          <div className="text-2xl font-bold text-blue-900">{weeklyStats.totalCalories.toLocaleString()}</div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="text-green-600" size={20} />
            <span className="text-sm font-medium text-green-800">Daily Average</span>
          </div>
          <div className="text-2xl font-bold text-green-900">{weeklyStats.avgCalories}</div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="text-purple-600" size={20} />
            <span className="text-sm font-medium text-purple-800">Days on Goal</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">{weeklyStats.daysOnGoal}/{weeklyStats.totalDays}</div>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-orange-600" size={20} />
            <span className="text-sm font-medium text-orange-800">Success Rate</span>
          </div>
          <div className="text-2xl font-bold text-orange-900">
            {Math.round((weeklyStats.daysOnGoal / weeklyStats.totalDays) * 100)}%
          </div>
        </div>
      </div>

      {/* Calorie Trend Chart */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily Calorie Intake</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  `${value} calories`, 
                  name === 'calories' ? 'Consumed' : 'Goal'
                ]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="calories" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="goal" 
                stroke="#EF4444" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Meal Distribution */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Average Meal Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mealData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="meal" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} calories`, 'Average Calories']}
              />
              <Bar dataKey="calories" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Days Detail */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Days</h3>
        <div className="space-y-3">
          {chartData.slice(-5).reverse().map(day => {
            const dayEntries = entries.filter(entry => entry.date === day.fullDate);
            const progressPercentage = Math.min((day.calories / dailyGoal) * 100, 100);
            
            return (
              <div key={day.fullDate} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">{day.date}</span>
                  <span className="text-sm text-gray-600">{dayEntries.length} entries</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-gray-800">{day.calories} cal</span>
                  <span className="text-sm text-gray-600">Goal: {dailyGoal} cal</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      day.calories > dailyGoal ? 'bg-red-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {progressPercentage.toFixed(1)}% of daily goal
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Progress;