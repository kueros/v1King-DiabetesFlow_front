"use client";

import { useState, useEffect } from 'react';
import { getFoods, createFood, getMeals, createMeal, Food, Meal, MealItem } from '@/services/api';

export default function FoodManager() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  
  const [foodName, setFoodName] = useState('');
  const [carbsPer100g, setCarbsPer100g] = useState('0');
  const [isCreatingFood, setIsCreatingFood] = useState(false);

  const [selectedFoodId, setSelectedFoodId] = useState('');
  const [grams, setGrams] = useState('0');
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
      setCarbsPer100g('0');
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
    setGrams('0');
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
      <section className="bg-black p-6 border border-[#3D3D3D] rounded-none">
        <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-6">Catálogo de Alimentos</h2>
        <form onSubmit={handleCreateFood} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-500 text-sm uppercase tracking-wider mb-1">Nombre del Alimento</label>
            <input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              required
              placeholder="Ej: Manzana"
              className="bg-black text-white placeholder-gray-600 border border-[#3D3D3D] rounded-none px-4 py-2.5 outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-500 text-sm uppercase tracking-wider mb-1">Carbohidratos (por 100g)</label>
            <input
              type="number"
              value={carbsPer100g}
              onChange={(e) => setCarbsPer100g(e.target.value)}
              required
              min="0"
              step="0.1"
              className="bg-black text-white placeholder-gray-600 border border-[#3D3D3D] rounded-none px-4 py-2.5 outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={isCreatingFood}
            className="mt-2 bg-black border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all w-full py-3 px-4 rounded-none font-bold uppercase tracking-widest disabled:opacity-50"
          >
            {isCreatingFood ? 'GUARDANDO...' : 'CREAR INGREDIENTE'}
          </button>
        </form>
      </section>

      <section className="bg-black p-6 border border-[#3D3D3D] rounded-none flex flex-col gap-6">
        <h2 className="text-xl font-bold text-white uppercase tracking-widest">Armador de Platos</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex flex-col gap-1.5 flex-1 w-full">
            <label className="text-gray-500 text-sm uppercase tracking-wider mb-1">Ingrediente</label>
            <select
              value={selectedFoodId}
              onChange={(e) => setSelectedFoodId(e.target.value)}
              className="bg-black text-white border border-[#3D3D3D] rounded-none px-4 py-2.5 outline-none focus:border-[var(--accent)] w-full"
            >
              <option value="" disabled>Seleccione...</option>
              {foods.map((food, i) => (
                <option key={food.id || i} value={food.id || food.name}>{food.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5 w-full sm:w-32">
            <label className="text-gray-500 text-sm uppercase tracking-wider mb-1">Gramos</label>
            <input
              type="number"
              value={grams}
              onChange={(e) => setGrams(e.target.value)}
              min="1"
              className="bg-black text-white placeholder-[#3D3D3D] border border-[#3D3D3D] rounded-none px-4 py-2.5 outline-none focus:border-[var(--accent)] w-full"
            />
          </div>
          <button
            type="button"
            onClick={handleAddMealItem}
            disabled={!selectedFoodId || !grams}
            className="bg-black border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all w-auto py-3 px-4 rounded-none font-bold uppercase tracking-widest disabled:opacity-50"
          >
            AÑADIR
          </button>
        </div>

        {mealItems.length > 0 && (
          <div className="flex flex-col gap-4 bg-black p-4 border border-[#3D3D3D] rounded-none mt-2">
            <h3 className="text-sm text-gray-500 uppercase tracking-widest">Ítems del plato</h3>
            <ul className="flex flex-col gap-2">
              {mealItems.map((item, index) => (
                <li key={index} className="flex justify-between items-center bg-black p-3 border border-[#3D3D3D] rounded-none">
                  <span className="text-white">{item.name}</span>
                  <span className="font-mono text-[#D4AF37]">{item.grams}g</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={handleCreateMeal}
              disabled={isCreatingMeal}
              className="mt-2 bg-black border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-colors w-full py-3 px-4 rounded-none font-bold uppercase tracking-widest disabled:opacity-50"
            >
              {isCreatingMeal ? 'REGISTRANDO...' : 'REGISTRAR PLATO'}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
