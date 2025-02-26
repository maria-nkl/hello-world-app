import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from "react";
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import Button from "./components/Button";

// function AppOld() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }
// export default App


// const App = () => {
//   const handleClick = () => {
//     alert("Привет, мир!");
//   };

//   return (
//     <>
//       <Navbar />
//       <Container>
//         <h2 className="text-2xl mb-4">Добро пожаловать в Hello World App</h2>
//         <Button text="Нажми меня" onClick={handleClick} />
//       </Container>
//     </>
//   );
// };

const App = () => {
  const handleClick = () => {
    alert("Привет, мир!");
  };

  // Массив объектов с полями title и color
  const buttons = [
    { title: 'Кнопка 1', color: 'red' },
    { title: 'Кнопка 2', color: 'blue' },
    { title: 'Кнопка 3', color: 'green' },
    { title: 'Кнопка 4', color: 'orange' }
  ];

  return (
    <>
      <Navbar />
      <Container>
        <h2 className="text-2xl mb-4">Добро пожаловать в Hello World App</h2>
        <Button text="Нажми меня" onClick={handleClick} />
        <div>

        {/* Генерация кнопок с динамическим названием и цветом */}
        {buttons.map((button, index) => (
          <button
            key={index}
            style={{ backgroundColor: button.color }}
            onClick={() => alert(`Вы нажали на ${button.title}`)}
          >
            {button.title}
          </button>
        ))}
      </div>
      </Container>
    </>
  );
};

export default App;
