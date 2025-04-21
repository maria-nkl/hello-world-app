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

  // Добавляем роль по умолчанию и статус активного пользователя
  const userWithRole = { 
    ...userData, 
    role: 'user', 
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // Отправка на сервер
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userWithRole)
  });

  // Проверка ответа сервера
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ошибка регистрации');
  }

  return await response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/users?email=${credentials.email}&password=${credentials.password}`);
  if (!response.ok) {
    const errorData = await response.json();
    const err = new Error(errorData.message || 'Ошибка авторизации');
    err.code = 'INVALID_CREDENTIALS'; // Уникальный код ошибки
    throw err;
  }
  const users = await response.json();
  const user = users[0];
  if (!user) {
    const err = new Error('Неверные учетные данные');
    err.code = 'INVALID_CREDENTIALS';
    throw err;
  }
  if (!user?.isActive) {
    const err = new Error('Аккаунт заблокирован');
    err.code = 'BLOCKED_ACCOUNT';
    throw err;
  }
  return user;
};

// Обновление профиля пользователя
export const updateUserProfile = async (userId, userData) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...userData,
      updatedAt: new Date().toISOString()
    })
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ошибка обновления профиля');
  }
  
  return await response.json();
};

// Получение всех пользователей (только для админов)
export const getAllUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) throw new Error('Ошибка загрузки пользователей');
  return await response.json();
};

// Обновление роли пользователя (только для админов)
export const updateUserRole = async (userId, role) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      role,
      updatedAt: new Date().toISOString()
    })
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ошибка обновления роли');
  }
  
  return await response.json();
};

// Блокировка/разблокировка пользователя (только для админов)
export const toggleUserStatus = async (userId, isActive) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      isActive,
      updatedAt: new Date().toISOString()
    })
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ошибка обновления статуса');
  }
  
  return await response.json();
};

// Удаление пользователя (только для админов)
export const deleteUser = async (userId) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'DELETE'
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ошибка удаления пользователя');
  }
  
  return true;
};

// Получение пользователя по ID
export const getUserById = async (userId) => {
  const response = await fetch(`${API_URL}/users/${userId}`);
  if (!response.ok) throw new Error('Ошибка загрузки пользователя');
  return await response.json();
};