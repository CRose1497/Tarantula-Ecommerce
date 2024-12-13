import { render, screen } from '@testing-library/react';
import HomePage from '../Pages/HomePage';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

// Test to check if the HomePage component renders with welcome text.

test('renders the HomePage component', () => {
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );

  // Check for specific text present in the component
  expect(screen.getByText(/welcome to the tarantula store!/i)).toBeInTheDocument();
  expect(screen.getByText(/new arrivals!/i)).toBeInTheDocument();
  expect(screen.getByText(/learn more about tarantulas/i)).toBeInTheDocument();
});
