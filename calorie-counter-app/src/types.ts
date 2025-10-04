export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  servingSize: number;
  servingUnit: string;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  sugar?: number;
}

export interface DailyEntry {
  id: string;
  food: string;
  calories: number;
  quantity: number;
  servingSize: number;
  meal: string;
  date: string;
  timestamp: string;
}

export interface Meal {
  id: string;
  name: string;
  entries: DailyEntry[];
}

export interface DailyProgress {
  date: string;
  caloriesConsumed: number;
  caloriesGoal: number;
  entries: DailyEntry[];
}