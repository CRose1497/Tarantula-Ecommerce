/**
 * File: CheckoutPage.jsx
 * Author: Christian Rose
 * Date: 2024-12-12
 * Description: Handles the checkout process, providing a summary of cart items 
 *              and confirming the order.
 * 
 * Features:
 * - Displays a detailed summary of cart items.
 * - Allows users to confirm their purchase.
 * - Simulates a successful order with a confirmation message.
 */


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Checkout page component

export default function CheckoutPage() {
  const [step, setStep] = useState(1); 
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [gst, setGst] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // Button styles
  const buttonStyles = {
    base: {
      padding: '10px 20px',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    back: {
      backgroundColor: '#6c757d', 
      marginRight: '10px',
    },
    forward: {
      backgroundColor: '#28a745',
    },
  };

  // Fetch updated cart data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('http://localhost:5000/cart');
        const data = await response.json();
        setCart(data);


        // Recalculate totals
        const calculatedSubtotal = data.reduce(
          (sum, item) => sum + item.price * (item.quantity || 1),
          0
        );
        setSubtotal(calculatedSubtotal);
        setGst(calculatedSubtotal * 0.15); // GST: 15%
        setTotal(calculatedSubtotal + calculatedSubtotal * 0.15);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCart();
  }, []);


  // Handle purchase confirmation
  const confirmPurchase = async () => {
    try {
      const response = await fetch('http://localhost:5000/cart', {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to clear the cart');
      }

      alert('Thank you for your purchase!');
      setCart([]); 
      setSubtotal(0);
      setGst(0);
      setTotal(0);
    } catch (error) {
      console.error('Error confirming purchase:', error);
    }
  };

  // Step components
  const CartStep = () => (
    <div>
      <h2>Cart Summary</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty! Add items to proceed to checkout.</p>
      ) : (
        <>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {cart.map((item) => (
              <li
                key={item.id}
                style={{
                  border: '1px solid #ccc',
                  padding: '10px',
                  margin: '10px 0',
                }}
              >
                <h2>{item.name}</h2>
                <p>Price: ${item.price.toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
            <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
            <h3>GST (15%): ${gst.toFixed(2)}</h3>
            <h2>Total: ${total.toFixed(2)}</h2>
          </div>

          {/* Buttons */}
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <button
              onClick={() => navigate('/cart')}
              style={{ ...buttonStyles.base, ...buttonStyles.back }}
            >
              Back to Cart
            </button>
            <button
              onClick={() => setStep(2)}
              style={{ ...buttonStyles.base, ...buttonStyles.forward }}
            >
              Proceed to Shipping
            </button>
          </div>
        </>
      )}
    </div>
  );

  // Shipping step component
  const ShippingStep = React.memo(({ onNext }) => {
    const [shippingDetails, setShippingDetails] = useState({
      name: '',
      address: '',
      city: '',
      zip: '',
    });

    return (
      <div>
        <h2>Shipping Information</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Name"
            value={shippingDetails.name}
            onChange={(e) => setShippingDetails({ ...shippingDetails, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={shippingDetails.address}
            onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="City"
            value={shippingDetails.city}
            onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="ZIP Code"
            value={shippingDetails.zip}
            onChange={(e) => setShippingDetails({ ...shippingDetails, zip: e.target.value })}
            required
          />
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setStep(1)}
              style={{ ...buttonStyles.base, ...buttonStyles.back }}
            >
              Review Cart
            </button>
            <button
              onClick={onNext}
              style={{ ...buttonStyles.base, ...buttonStyles.forward }}
            >
              Proceed to Payment
            </button>
          </div>
        </form>
      </div>
    );
  });

  // Payment step component
  const PaymentStep = React.memo(({ onConfirm }) => {
    const [paymentDetails, setPaymentDetails] = useState({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    });
 
    // Validate payment details and proceed to confirmation
    const validatePayment = () => {
      const { cardNumber, expiryDate, cvv } = paymentDetails;
      if (cardNumber.length === 16 && expiryDate && cvv.length === 3) {
        onConfirm();
      } else {
        alert('Invalid payment details. Please check your card information.');
      }
    };

    return (
      <div>
        <h2>Payment Information</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Card Number"
            maxLength="16"
            value={paymentDetails.cardNumber}
            onChange={(e) =>
              setPaymentDetails((prev) => ({ ...prev, cardNumber: e.target.value }))
            }
            required
          />
          <input
            type="text"
            placeholder="Expiry Date (MM/YY)"
            value={paymentDetails.expiryDate}
            onChange={(e) =>
              setPaymentDetails((prev) => ({ ...prev, expiryDate: e.target.value }))
            }
            required
          />
          <input
            type="text"
            placeholder="CVV"
            maxLength="3"
            value={paymentDetails.cvv}
            onChange={(e) =>
              setPaymentDetails((prev) => ({ ...prev, cvv: e.target.value }))
            }
            required
          />
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setStep(2)}
              style={{ ...buttonStyles.base, ...buttonStyles.back }}
            >
              Back to Shipping
            </button>
            <button
              onClick={validatePayment}
              style={{ ...buttonStyles.base, ...buttonStyles.forward }}
            >
              Confirm Payment
            </button>
          </div>
        </form>
      </div>
    );
  });

  // Confirmation step component
  const ConfirmationStep = () => (
    <div>
      <h2>Order Confirmed!</h2>
      <p>Thank you for your purchase! Your order will be shipped soon.</p>
      <button
        onClick={() => navigate('/')}
        style={{ ...buttonStyles.base, ...buttonStyles.forward }}
      >
        Return to Home
      </button>
    </div>
  );

  // Render the current step
  return (
    <div style={{ padding: '20px' }}>
      {step === 1 && <CartStep />}
      {step === 2 && <ShippingStep onNext={() => setStep(3)} />}
      {step === 3 && <PaymentStep onConfirm={() => setStep(4)} />}
      {step === 4 && <ConfirmationStep />}
    </div>
  );
}
