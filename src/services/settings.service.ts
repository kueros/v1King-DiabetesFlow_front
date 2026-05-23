// Asumimos que tu backend corre en el puerto 3000
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const fetchSettings = async (userId: string) => {
  const response = await fetch(`${API_URL}/settings/${userId}`);
  
  if (!response.ok) {
    if (response.status === 404) return null; 
    throw new Error('Error al obtener la configuración');
  }
  
  // Leemos como texto primero para evitar el crash de JSON vacío
  const text = await response.text();
  return text ? JSON.parse(text) : null;
};

export const saveSettings = async (userId: string, settingsData: any) => {
  const response = await fetch(`${API_URL}/settings/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(settingsData),
  });
  
  if (!response.ok) {
    throw new Error('Error al guardar la configuración');
  }
  return response.json();
};