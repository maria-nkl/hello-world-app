import { render, screen, fireEvent } from '@testing-library/react'
import { expect, test } from 'vitest'
import Button from './Button'

test('Кнопка работает', () => {
  // Рендерим кнопку
  render(<Button onClick={() => console.log('Клик!')}>Тест</Button>)
  
  // Проверяем элементы
  const button = screen.getByText('Тест')
  expect(button).toBeInTheDocument()
  
  // Проверяем клик
  button.click()
  expect(button).toHaveClass('px-3') // Проверяем класс из Button.jsx
})