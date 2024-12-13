import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import React from 'react';

// Test to check if the App component renders with welcome text

test('renders the App component with welcome text', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
});
