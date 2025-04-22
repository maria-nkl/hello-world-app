import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  test('renders button with children', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies custom className', () => {
    render(<Button className="custom-class">Button</Button>);
    const button = screen.getByText('Button');
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('px-3');
  });

  test('applies inline styles', () => {
    render(<Button style={{ color: 'red' }}>Styled Button</Button>);
    expect(screen.getByText('Styled Button')).toHaveStyle('color: red');
  });
});