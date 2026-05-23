export interface Food {
  id?: string;
  name: string;
  carbsPer100g: number;
}

export interface MealItem {
  foodId: string;
  grams: number;
  name?: string;
}

export interface Meal {
  id?: string;
  userId: string;
  items: MealItem[];
  createdAt?: string;
}

export interface GlucoseLogData {
  userId: string;
  glucose: number;
  measuredAt?: string;
  notes?: string;
}

export async function getGlucoseLogs(userId: string): Promise<GlucoseLogData[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/glucose-logs/${userId}`, { cache: 'no-store' });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Backend Error ${response.status}: ${errorText}`);
    throw new Error('Failed to fetch glucose logs');
  }

  return response.json();
}

export async function createGlucoseLog(data: GlucoseLogData): Promise<GlucoseLogData> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/glucose-logs`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create glucose log');
  }

  return response.json();
}

export interface BolusResponse {
  bolus: number;
}

export async function calculateBolus(data: { userId: string, currentGlucose: number, targetCarbs: number }): Promise<BolusResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/calculator`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to calculate bolus');
  }

  return response.json();
}

export async function getFoods(): Promise<Food[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/foods`, { cache: 'no-store' });
  
  if (!response.ok) {
    throw new Error('Failed to fetch foods');
  }

  return response.json();
}

export async function createFood(data: Omit<Food, 'id'>): Promise<Food> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/foods`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create food');
  }

  return response.json();
}

export async function getMeals(userId: string): Promise<Meal[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meals?userId=${userId}`, { cache: 'no-store' });
  
  if (!response.ok) {
    throw new Error('Failed to fetch meals');
  }

  return response.json();
}

export async function createMeal(data: { userId: string, items: MealItem[] }): Promise<Meal> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meals`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create meal');
  }

  return response.json();
}
