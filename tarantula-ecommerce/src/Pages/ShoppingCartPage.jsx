/**
 * File: ShoppingCartPage.jsx
 * Author: Christian Rose
 * Date: 2024-12-12
 * Description: Displays the contents of the user's shopping cart, allowing them 
 *              to review and update items before checkout.
 * 
 * Features:
 * - Lists all items added to the cart.
 * - Allows users to update quantities or remove items.
 * - Displays subtotal, tax, and total calculations dynamically.
 */


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Shopping Cart page component

export default function ShoppingCartPage() {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [gst, setGst] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // Fetch cart items
  useEffect(() => {
    fetch('http://localhost:5000/cart')
      .then((response) => response.json())
      .then((data) => {
        setCart(data);
        calculateTotals(data); 
      })
      .catch((error) => console.error('Error fetching cart items:', error));
  }, []);

  // Calculate totals
  const calculateTotals = (cartItems) => {
    const calculatedSubtotal = cartItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
    setSubtotal(calculatedSubtotal);
    setGst(calculatedSubtotal * 0.15); // 15% GST
    setTotal(calculatedSubtotal + calculatedSubtotal * 0.15);
  };

  // Remove item from cart
  const removeFromCart = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/cart/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }

      // Update cart and totals
      const updatedCart = cart.filter((item) => item.id !== id);
      setCart(updatedCart);
      calculateTotals(updatedCart); 
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  // Increase quantity
  const increaseQuantity = async (item) => {
    if (item.quantity >= item.availableQuantity) {
      alert(`Only ${item.availableQuantity} spiders are available in stock!`);
      return;
    }

    // Update item quantity
    const updatedItem = { ...item, quantity: (item.quantity || 1) + 1 };
    try {
      const response = await fetch(`http://localhost:5000/cart/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: updatedItem.quantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update item quantity');
      }

      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id ? updatedItem : cartItem
      );
      setCart(updatedCart);
      calculateTotals(updatedCart);
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  // Decrease quantity
  const decreaseQuantity = async (item) => {
    if (item.quantity <= 1) return; 
    const updatedItem = { ...item, quantity: item.quantity - 1 };
    try {
      const response = await fetch(`http://localhost:5000/cart/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: updatedItem.quantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update item quantity');
      }

      // Update cart and totals
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id ? updatedItem : cartItem
      );
      setCart(updatedCart);
      calculateTotals(updatedCart);
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {cart.map((item) => (
              <li key={item.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                <h2>{item.name}</h2>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Available Stock: {item.availableQuantity}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {/* Quantity Controls */}
                  <button
                    onClick={() => decreaseQuantity(item)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#ffc107',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: '16px' }}>{item.quantity || 1}</span>
                  <button
                    onClick={() => increaseQuantity(item)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#28a745',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    marginTop: '10px',
                    padding: '5px 10px',
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Remove from Cart
                </button>
              </li>
            ))}
          </ul>

          {/* Totals Section */}
          <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '10px', textAlign: 'right' }}>
            <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
            <h3>GST (15%): ${gst.toFixed(2)}</h3>
            <h2>Total: ${total.toFixed(2)}</h2>
          </div>

          {/* Action Buttons */}
          <div style={{ marginTop: '20px', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              onClick={() => navigate('/products')}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate('/checkout')}
              style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
