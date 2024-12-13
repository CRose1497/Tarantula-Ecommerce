/**
 * File: App.jsx
 * Author: Christian Rose
 * Date: 2024-12-12
 * Description: The main application component for the Tarantula Store.
 *              Handles routing between pages and provides a consistent layout.
 * 
 * Features:
 * - Navigation bar with links to Home, Product Listing, Shopping Cart, and Checkout pages.
 * - Integrates React Router for seamless page navigation.
 * - Acts as the root component for rendering child components.
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ProductListingPage from './Pages/ProductListingPage';
import ProductDetailsPage from './Pages/ProductDetailsPage';
import ShoppingCartPage from './Pages/ShoppingCartPage';
import CheckoutPage from './Pages/CheckoutPage';
import Header from './components/Header';
import Footer from './components/Footer';

// App component

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListingPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<ShoppingCartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
      <Footer />
    </>
  );
}
