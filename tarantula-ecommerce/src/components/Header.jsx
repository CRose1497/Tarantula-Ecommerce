/**
 * File: Header.jsx
 * Author: Christian Rose
 * Date: 2024-12-12
 * Description: React functional component for the website's header. The header includes the
 *              website's logo and navigation links for seamless navigation between pages.
 * 
 * Features:
 * - Displays a logo section with an icon and styled text.
 * - Provides navigation links to essential pages: Home, Products, Shopping Cart, and Checkout.
 * - Utilizes `react-router-dom`'s `Link` for client-side navigation. 
 *
 * Components:
 * - `<header>`: The main header container styled with `Header.css`.
 * - `<Link>`: Navigation links styled to enhance user experience with hover effects.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

// Header component

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        {/* Logo Section */}
        <Link to="/" className="logo-link">
        <span className="logo-icon">🕷</span>
        <span className="logo-text">Tarantula E-Commerce</span>
        </Link>

        {/* Navigation Links */}
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link>
          <Link to="/cart" className="nav-link">Shopping Cart</Link>
          <Link to="/checkout" className="nav-link">Checkout</Link>
        </nav>
      </div>
    </header>
  );
}
