// const API_URL = "http://localhost:3001";

// // Проверка существующего email
// export const checkEmailExists = async (email) => {
//   const response = await fetch(`${API_URL}/users?email=${email}`);
//   if (!response.ok) throw new Error('Ошибка проверки email');
//   const users = await response.json();
//   return users.some(user => user.email === email);
// };

// // Регистрация пользователя
// export const registerUser = async (userData) => {
//   const userWithRole = {
//     ...userData,
//     role: 'user',
//     isActive: true,
//     createdAt: new Date().toISOString()
//   };

//   const response = await fetch(`${API_URL}/users`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(userWithRole)
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || 'Ошибка регистрации');
//   }

//   return await response.json();
// };

// // Авторизация
// export const loginUser = async (credentials) => {
//   const response = await fetch(`${API_URL}/users?email=${credentials.email}&password=${credentials.password}`);
//   if (!response.ok) throw new Error('Ошибка авторизации');
//   const users = await response.json();
//   const user = users[0];
//   if (!user?.isActive) throw new Error('Аккаунт заблокирован');
//   return user;
// };

// // Получение всех пользователей
// export const getAllUsers = async () => {
//   const response = await fetch(`${API_URL}/users`);
//   if (!response.ok) throw new Error('Ошибка загрузки пользователей');
//   return await response.json();
// };

// // Обновление пользователя
// export const updateUser = async (userId, updates) => {
//   const response = await fetch(`${API_URL}/users/${userId}`, {
//     method: 'PATCH',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       ...updates,
//       updatedAt: new Date().toISOString()
//     })
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || 'Ошибка обновления');
//   }

//   return await response.json();
// };

// // Удаление пользователя
// export const deleteUser = async (userId) => {
//   const response = await fetch(`${API_URL}/users/${userId}`, {
//     method: 'DELETE'
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || 'Ошибка удаления');
//   }

//   return true;
// };

// // Экспортируем все необходимые методы
// export default {
//   checkEmailExists,
//   registerUser,
//   loginUser,
//   getAllUsers,
//   updateUser,
//   deleteUser
// };