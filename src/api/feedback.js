const API_URL = "http://localhost:3001";

export const getFeedback = async () => {
  const response = await fetch(`${API_URL}/feedback`);
  if (!response.ok) throw new Error('Ошибка загрузки отзывов');
  return await response.json();
};

export const addFeedback = async (feedbackData) => {
  const response = await fetch(`${API_URL}/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedbackData)
  });
  if (!response.ok) throw new Error('Ошибка добавления отзыва');
  return await response.json();
};

export const deleteFeedback = async (feedbackId) => {
  const response = await fetch(`${API_URL}/feedback/${feedbackId}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Ошибка удаления отзыва');
  return true;
};