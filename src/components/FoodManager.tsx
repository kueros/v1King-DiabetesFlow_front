"use client";

import { useState, useEffect } from 'react';
import { getFoods, createFood, getMeals, createMeal, Food, Meal, MealItem } from '@/services/api';

export default function FoodManager() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  
  const [foodName, setFoodName] = useState('');
  const [carbsPer100g, setCarbsPer100g] = useState('');
  const [isCreatingFood, setIsCreatingFood] = useState(false);

  const [selectedFoodId, setSelectedFoodId] = useState('');
  const [grams, setGrams] = useState('');
  const [mealItems, setMealItems] = useState<MealItem[]>([]);
  const [isCreatingMeal, setIsCreatingMeal] = useState(false);

  const loadData = async () => {
    try {
      const [fetchedFoods, fetchedMeals] = await Promise.all([
        getFoods(),
        getMeals('11111111-1111-1111-1111-111111111111')
      ]);
      setFoods(fetchedFoods);
      setMeals(fetchedMeals);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateFood = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodName || !carbsPer100g) return;
    setIsCreatingFood(true);
    try {
      await createFood({ name: foodName, carbsPer100g: Number(carbsPer100g) });
      setFoodName('');
      setCarbsPer100g('');
      await loadData();
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreatingFood(false);
    }
  };

  const handleAddMealItem = () => {
    if (!selectedFoodId || !grams) return;
    const food = foods.find(f => f.id === selectedFoodId || f.name === selectedFoodId);
    setMealItems([...mealItems, { foodId: selectedFoodId, name: food?.name || selectedFoodId, grams: Number(grams) }]);
    setGrams('');
  };

  const handleCreateMeal = async () => {
    if (mealItems.length === 0) return;
    setIsCreatingMeal(true);
    try {
      await createMeal({ userId: '11111111-1111-1111-1111-111111111111', items: mealItems });
      setMealItems([]);
      await loadData();
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreatingMeal(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <section className="bg-forge-black p-6 border-2 border-shield-gray rounded-none">
        <h2 className="text-xl font-syne mb-6 text-saga-cream">Catálogo de Alimentos</h2>
        <form onSubmit={handleCreateFood} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-space text-saga-cream">Nombre del Alimento</label>
            <input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              required
              className="bg-forge-black text-saga-cream border-2 border-shield-gray rounded-none px-4 py-2.5 outline-none focus:border-viking-red transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-space text-saga-cream">Carbohidratos (por 100g)</label>
            <input
              type="number"
              value={carbsPer100g}
              onChange={(e) => setCarbsPer100g(e.target.value)}
              required
              min="0"
              step="0.1"
              className="bg-forge-black text-saga-cream border-2 border-shield-gray rounded-none px-4 py-2.5 outline-none focus:border-viking-red transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={isCreatingFood}
            className="mt-2 bg-viking-red font-space text-saga-cream py-2.5 px-4 rounded-none border-2 border-viking-red hover:bg-forge-black hover:text-viking-red transition-colors disabled:opacity-50"
          >
            {isCreatingFood ? 'GUARDANDO...' : 'CREAR INGREDIENTE'}
          </button>
        </form>
      </section>

      <section className="bg-forge-black p-6 border-2 border-shield-gray rounded-none flex flex-col gap-6">
        <h2 className="text-xl font-syne text-saga-cream">Armador de Platos</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex flex-col gap-1.5 flex-1 w-full">
            <label className="text-sm font-space text-saga-cream">Ingrediente</label>
            <select
              value={selectedFoodId}
              onChange={(e) => setSelectedFoodId(e.target.value)}
              className="bg-forge-black text-saga-cream border-2 border-shield-gray rounded-none px-4 py-2.5 outline-none focus:border-viking-red w-full"
            >
              <option value="" disabled>Seleccione...</option>
              {foods.map((food, i) => (
                <option key={food.id || i} value={food.id || food.name}>{food.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5 w-full sm:w-32">
            <label className="text-sm font-space text-saga-cream">Gramos</label>
            <input
              type="number"
              value={grams}
              onChange={(e) => setGrams(e.target.value)}
              min="1"
              className="bg-forge-black text-saga-cream border-2 border-shield-gray rounded-none px-4 py-2.5 outline-none focus:border-viking-red w-full"
            />
          </div>
          <button
            type="button"
            onClick={handleAddMealItem}
            disabled={!selectedFoodId || !grams}
            className="bg-shield-gray text-saga-cream font-space py-2.5 px-6 rounded-none border-2 border-shield-gray hover:bg-saga-cream hover:text-forge-black transition-colors disabled:opacity-50 w-full sm:w-auto"
          >
            AÑADIR
          </button>
        </div>

        {mealItems.length > 0 && (
          <div className="flex flex-col gap-4 bg-forge-black p-4 border-2 border-shield-gray rounded-none mt-2">
            <h3 className="text-sm font-space text-helm-gold uppercase tracking-widest">Ítems del plato</h3>
            <ul className="flex flex-col gap-2">
              {mealItems.map((item, index) => (
                <li key={index} className="flex justify-between items-center bg-forge-black p-3 border-2 border-shield-gray rounded-none">
                  <span className="font-inter text-saga-cream">{item.name}</span>
                  <span className="font-mono text-viking-red">{item.grams}g</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={handleCreateMeal}
              disabled={isCreatingMeal}
              className="mt-2 bg-viking-red font-space text-saga-cream py-2.5 px-4 rounded-none border-2 border-viking-red hover:bg-forge-black hover:text-viking-red transition-colors disabled:opacity-50"
            >
              {isCreatingMeal ? 'REGISTRANDO...' : 'REGISTRAR PLATO'}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
