/**
 * File: ProductDetailsPage.jsx
 * Author: Christian Rose
 * Date: 2024-12-12
 * Description: Displays detailed information about a selected product and provides 
 *              functionality to add the product to the cart or navigate back to the 
 *              previous page.
 * 
 * Features:
 * - Fetches product details dynamically using the product ID from the URL parameters.
 * - Displays product name, image, price, description, and genus.
 * - Allows the user to add the product to the cart with a single click.
 * - Provides a "Go Back" button to navigate to the previous page.
 * - Utilizes `react-toastify` for success and error notifications.
 * 
 * Dependencies:
 * - React hooks (`useEffect`, `useState`) for state management and side effects.
 * - React Router (`useParams`, `useNavigate`) for handling route parameters and navigation.
 * - Toastify for user notifications.
 * 
 * API Endpoints:
 * - GET /products/:id - Fetches details of the selected product.
 * - POST /cart - Adds the selected product to the shopping cart.
 */


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

// Product details page component

export default function ProductDetailsPage() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const navigate = useNavigate(); 

  // Fetch product details
  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error fetching product details:', error));
  }, [id]);

  // Add product to the cart
  const addToCart = () => {
    fetch('http://localhost:5000/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...product, quantity: 1 }), 
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add item to cart');
        }
        // Show success message using Toastify
        toast.success(`${product.name} added to the cart!`);
      })
      .catch((error) => {
        // Show error message using Toastify
        toast.error('Error adding item to cart.');
        console.error('Error adding item to cart:', error);
      });
  };

  if (!product) {
    return <h2>Loading product details...</h2>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <ToastContainer /> {/* ToastContainer for notifications */}
      <h1>{product.name}</h1>

      {/* Large Image */}
      <img
        src={product.largeImage || product.image || 'https://via.placeholder.com/600'}
        alt={product.name}
        style={{ width: '100%', maxWidth: '600px', height: 'auto', marginBottom: '20px' }}
      />

      {/* Product Details */}
      <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
      <p><strong>Description:</strong> {product.description || `A great tarantula: ${product.name}.`}</p>
      <p><strong>Genus:</strong> {product.genus || 'Unknown Genus'}</p> {/* Display genus */}

      {/* Buttons */}
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={addToCart}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px',
          }}
        >
          Add to Cart
        </button>
        <button
          onClick={() => navigate(-1)} 
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
