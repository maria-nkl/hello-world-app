const API_URL = "http://localhost:3001";

// Проверка существующего email
export const checkEmailExists = async (email) => {
  const response = await fetch(`${API_URL}/users?email=${email}`);
  if (!response.ok) throw new Error('Ошибка проверки email');
  const users = await response.json();
  return users.some(user => user.email === email);
};

// Регистрация с двойной проверкой
export const registerUser = async (userData) => {
  // Проверка на клиенте
  const emailExists = await checkEmailExists(userData.email);
  if (emailExists) {
    throw new Error('Пользователь с таким email уже зарегистрирован');
  }

  // Отправка на сервер
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });

  // Проверка ответа сервера
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ошибка регистрации');
  }

  return await response.json();
};

// Авторизация
export const loginUser = async (credentials) => {
  const response = await fetch(
    `${API_URL}/users?email=${credentials.email}&password=${credentials.password}`
  );
  if (!response.ok) throw new Error('Ошибка авторизации');
  const users = await response.json();
  return users[0] || null;
};

export const updateUserProfile = async (userId, userData) => {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PATCH', // Используем PATCH для частичного обновления
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка обновления профиля');
    }
    
    return await response.json();
  };