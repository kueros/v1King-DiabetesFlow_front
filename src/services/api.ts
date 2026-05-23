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
  const response = await fetch(`http://localhost:3000/glucose`, { cache: 'no-store' });

  if (response.status === 404) {
    return [];
  }
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Backend Error ${response.status}: ${errorText}`);
    throw new Error('Failed to fetch glucose logs');
  }

  const json = await response.json();
  return Array.isArray(json) ? json : (json.data || []);
}

export async function createGlucoseLog(data: GlucoseLogData): Promise<GlucoseLogData> {
  const response = await fetch(`http://localhost:3000/glucose`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Backend Error ${response.status}: ${errorText}`);
    throw new Error('Failed to create glucose log');
  }

  return response.json();
}

export interface BolusResponse {
  bolus: number;
}

export async function calculateBolus(data: { userId: string, currentGlucose: number, targetCarbs: number }): Promise<BolusResponse> {
  const response = await fetch(`http://localhost:3000/calculator`, {
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
  const response = await fetch(`http://localhost:3000/foods`, { cache: 'no-store' });
  
  if (!response.ok) {
    throw new Error('Failed to fetch foods');
  }

  return response.json();
}

export async function createFood(data: Omit<Food, 'id'>): Promise<Food> {
  const response = await fetch(`http://localhost:3000/foods`, {
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
  const response = await fetch(`http://localhost:3000/meals?userId=${userId}`, { cache: 'no-store' });
  
  if (!response.ok) {
    throw new Error('Failed to fetch meals');
  }

  return response.json();
}

export async function createMeal(data: { userId: string, items: MealItem[] }): Promise<Meal> {
  const response = await fetch(`http://localhost:3000/meals`, {
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

export interface Activity {
  id?: string;
  userId: string;
  duration_min?: number;
  steps?: number;
  createdAt?: string;
}

export async function getActivities(userId: string): Promise<Activity[]> {
  const response = await fetch(`http://localhost:3000/activities?userId=${userId}`, { cache: 'no-store' });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Backend Error ${response.status}: ${errorText}`);
    throw new Error('Failed to fetch activities');
  }

  return response.json();
}

export async function createActivity(data: Activity): Promise<Activity> {
  const response = await fetch(`http://localhost:3000/activities`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Backend Error ${response.status}: ${errorText}`);
    throw new Error('Failed to create activity');
  }

  return response.json();
}
