import { FoodItem } from '../types';

export const foodDatabase: FoodItem[] = [
  // Fruits
  {
    id: 'apple',
    name: 'Apple',
    calories: 95,
    servingSize: 1,
    servingUnit: 'medium apple',
    protein: 0.5,
    carbs: 25,
    fat: 0.3,
    fiber: 4,
    sugar: 19
  },
  {
    id: 'banana',
    name: 'Banana',
    calories: 105,
    servingSize: 1,
    servingUnit: 'medium banana',
    protein: 1.3,
    carbs: 27,
    fat: 0.4,
    fiber: 3,
    sugar: 14
  },
  {
    id: 'orange',
    name: 'Orange',
    calories: 62,
    servingSize: 1,
    servingUnit: 'medium orange',
    protein: 1.2,
    carbs: 15.4,
    fat: 0.2,
    fiber: 3.1,
    sugar: 12.2
  },
  {
    id: 'strawberries',
    name: 'Strawberries',
    calories: 49,
    servingSize: 1,
    servingUnit: 'cup',
    protein: 1,
    carbs: 12,
    fat: 0.5,
    fiber: 3,
    sugar: 7
  },

  // Vegetables
  {
    id: 'broccoli',
    name: 'Broccoli',
    calories: 55,
    servingSize: 1,
    servingUnit: 'cup',
    protein: 4.3,
    carbs: 11,
    fat: 0.6,
    fiber: 5,
    sugar: 2.6
  },
  {
    id: 'carrot',
    name: 'Carrot',
    calories: 50,
    servingSize: 1,
    servingUnit: 'medium carrot',
    protein: 1,
    carbs: 12,
    fat: 0.2,
    fiber: 3.6,
    sugar: 6
  },
  {
    id: 'spinach',
    name: 'Spinach',
    calories: 7,
    servingSize: 1,
    servingUnit: 'cup',
    protein: 0.9,
    carbs: 1.1,
    fat: 0.1,
    fiber: 0.7,
    sugar: 0.1
  },

  // Proteins
  {
    id: 'chicken-breast',
    name: 'Chicken Breast',
    calories: 165,
    servingSize: 100,
    servingUnit: 'grams',
    protein: 31,
    carbs: 0,
    fat: 3.6
  },
  {
    id: 'salmon',
    name: 'Salmon',
    calories: 208,
    servingSize: 100,
    servingUnit: 'grams',
    protein: 25,
    carbs: 0,
    fat: 12
  },
  {
    id: 'eggs',
    name: 'Eggs',
    calories: 155,
    servingSize: 2,
    servingUnit: 'large eggs',
    protein: 13,
    carbs: 1.1,
    fat: 11
  },
  {
    id: 'greek-yogurt',
    name: 'Greek Yogurt',
    calories: 100,
    servingSize: 170,
    servingUnit: 'grams',
    protein: 17,
    carbs: 6,
    fat: 0
  },

  // Grains
  {
    id: 'brown-rice',
    name: 'Brown Rice',
    calories: 216,
    servingSize: 1,
    servingUnit: 'cup cooked',
    protein: 5,
    carbs: 45,
    fat: 1.8,
    fiber: 3.5
  },
  {
    id: 'quinoa',
    name: 'Quinoa',
    calories: 222,
    servingSize: 1,
    servingUnit: 'cup cooked',
    protein: 8,
    carbs: 40,
    fat: 3.6,
    fiber: 5
  },
  {
    id: 'oats',
    name: 'Oats',
    calories: 154,
    servingSize: 1,
    servingUnit: 'cup cooked',
    protein: 6,
    carbs: 27,
    fat: 3,
    fiber: 4
  },

  // Dairy
  {
    id: 'milk',
    name: 'Milk (2%)',
    calories: 122,
    servingSize: 1,
    servingUnit: 'cup',
    protein: 8,
    carbs: 12,
    fat: 5
  },
  {
    id: 'cheese',
    name: 'Cheddar Cheese',
    calories: 113,
    servingSize: 28,
    servingUnit: 'grams',
    protein: 7,
    carbs: 0.4,
    fat: 9
  },

  // Nuts & Seeds
  {
    id: 'almonds',
    name: 'Almonds',
    calories: 164,
    servingSize: 28,
    servingUnit: 'grams',
    protein: 6,
    carbs: 6,
    fat: 14,
    fiber: 3.5
  },
  {
    id: 'peanut-butter',
    name: 'Peanut Butter',
    calories: 188,
    servingSize: 32,
    servingUnit: 'grams',
    protein: 8,
    carbs: 6,
    fat: 16
  },

  // Common Foods
  {
    id: 'bread',
    name: 'Whole Wheat Bread',
    calories: 81,
    servingSize: 1,
    servingUnit: 'slice',
    protein: 4,
    carbs: 14,
    fat: 1.1,
    fiber: 2
  },
  {
    id: 'pasta',
    name: 'Whole Wheat Pasta',
    calories: 174,
    servingSize: 1,
    servingUnit: 'cup cooked',
    protein: 7,
    carbs: 37,
    fat: 1.1,
    fiber: 6
  },
  {
    id: 'avocado',
    name: 'Avocado',
    calories: 234,
    servingSize: 1,
    servingUnit: 'medium avocado',
    protein: 3,
    carbs: 12,
    fat: 21,
    fiber: 10
  }
];