import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductListingPage from '../Pages/ProductListingPage';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

// Test to check if the ProductListingPage component renders products and allows adding to cart.

const mockProducts = [
  {
    id: 1,
    name: 'Beginner Product',
    price: 10.0,
    experienceLevel: 'Beginner',
    availableQuantity: 5,
  },
];

beforeEach(() => {
  global.fetch = vi.fn((url) => {
    if (url.includes('/products')) {
      return Promise.resolve({
        json: () => Promise.resolve(mockProducts),
      });
    }
    if (url.includes('/cart')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      });
    }
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

test('renders products and allows adding to cart', async () => {
  render(
    <BrowserRouter>
      <ProductListingPage />
    </BrowserRouter>
  );

  const addToCartButton = await screen.findByRole('button', { name: /add .* to cart/i });
  fireEvent.click(addToCartButton);

  await waitFor(() => {
    const toast = screen.getByText(/Beginner Product added to the cart!/i);
    expect(toast).toBeInTheDocument();
  });
});
