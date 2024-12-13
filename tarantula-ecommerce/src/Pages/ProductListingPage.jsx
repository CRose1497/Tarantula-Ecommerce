/**
 * File: ProductListingPage.jsx
 * Author: Christian Rose
 * Date: 2024-12-12
 * Description: Renders a grid of available products fetched from a mock API.
 *              Allows users to view details or add items to their cart.
 * 
 * Features:
 * - Fetches and displays products from a mock API.
 * - Includes buttons for viewing details or adding items to the shopping cart.
 * - Designed to be user-friendly and responsive for all screen sizes.
 */


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

// Product details page component

export default function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [filterOption, setFilterOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();


// Fetch product data
  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

// Add product to the cart
  const addToCart = async (product) => {
    try {
      const response = await fetch('http://localhost:5000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...product, quantity: 1 }), 
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      toast.success(`${product.name} added to the cart!`); 
    } catch (error) {
      toast.error('Error adding item to cart.'); 
      console.error('Error adding item to cart:', error);
    }
  };

  // Sort products based on price
  const handleSort = (option) => {
    setSortOption(option);
    let sorted = [...filteredProducts];
    if (option === 'priceLowHigh') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (option === 'priceHighLow') {
      sorted.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sorted);
  };

  // Filter products based on experience level
  const handleFilter = (option) => {
    setFilterOption(option);
    if (option === 'Beginner') {
      setFilteredProducts(products.filter((product) => product.experienceLevel === 'Beginner'));
    } else if (option === 'Experienced') {
      setFilteredProducts(products.filter((product) => product.experienceLevel === 'Experienced'));
    } else {
      setFilteredProducts(products);
    }
  };

  // Search products based on query
  const handleSearch = (query) => {
    setSearchQuery(query);
    const searchedProducts = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(searchedProducts);
  };

  return (
    <div>
      <ToastContainer /> {/* ToastContainer for notifications */}
      <h1>Product Listing</h1>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {/* Search Bar */}
        <label htmlFor="search-bar" style={{ display: 'none' }}>
          Search Products
        </label>
        <input
          id="search-bar"
          name="search"
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for products..."
          style={{
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            flex: '1',
            minWidth: '200px',
          }}
        />
        {/* Sorting Dropdown */}
        <label htmlFor="sort-dropdown" style={{ display: 'none' }}>
          Sort Products
        </label>
        <select
          id="sort-dropdown"
          name="sort"
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            flex: '1',
            minWidth: '200px',
          }}
        >
          <option value="">Sort by</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
        </select>
        {/* Experience Level Filter */}
        <label htmlFor="filter-dropdown" style={{ display: 'none' }}>
          Filter Products
        </label>
        <select
          id="filter-dropdown"
          name="filter"
          value={filterOption}
          onChange={(e) => handleFilter(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            flex: '1',
            minWidth: '200px',
          }}
        >
          <option value="">All Products</option>
          <option value="Beginner">Beginner Friendly</option>
          <option value="Experienced">Experienced Keepers</option>
        </select>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '40px', 
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            <img
              src={product.image || 'https://via.placeholder.com/150'}
              alt={product.name}
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <h2>{product.name}</h2>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Available Quantity: {product.availableQuantity}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <button
                aria-label={`View details for ${product.name}`}
                onClick={() => navigate(`/products/${product.id}`)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                View Details
              </button>
              <button
                aria-label={`Add ${product.name} to cart`}
                onClick={() => addToCart(product)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
