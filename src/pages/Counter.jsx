import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../store/slices/counterSlice';
import { Button, Card } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';

const Counter = () => {
  const count = useSelector((state) => state.counter?.count ?? 0); // Защита от undefined
  const dispatch = useDispatch();
  const { isDark } = useTheme();

  return (
    <Card className={`mt-4 ${isDark ? 'bg-dark text-white' : ''}`}>
      <Card.Body className="text-center">
        <Card.Title>Счетчик</Card.Title>
        <Card.Text className="display-4 mb-4">{count}</Card.Text>
        
        <div className="d-flex justify-content-center gap-3">
          <Button 
            variant="success" 
            onClick={() => dispatch(increment())}
            className="px-4"
          >
            +
          </Button>
          
          <Button 
            variant="danger" 
            onClick={() => dispatch(decrement())}
            className="px-4"
          >
            -
          </Button>
          
          <Button 
            variant="secondary" 
            onClick={() => dispatch(reset())}
          >
            Сброс
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Counter;