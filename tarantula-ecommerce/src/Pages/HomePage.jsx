/**
 * File: HomePage.jsx
 * Author: Christian Rose
 * Date: 2024-12-12
 * Description: Displays the homepage of the Tarantula Store, showcasing new arrivals 
 *              and educational resources about tarantulas.
 * 
 * Features:
 * - Highlights new tarantula arrivals with detailed information.
 * - Links to external resources for tarantula care and species selection.
 * - Provides a visually appealing introduction to the website.
 */


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Home page component

export default function HomePage() {
  const navigate = useNavigate();

  const featuredProducts = [
    {
      id: 6,
      name: 'Brazilian Whiteknee Tarantula',
      price: 90,
      image: '/images/A_gen3.jpeg',
      description: 'Known for its striking black and white coloration.',
    },
    {
      id: 7,
      name: 'Mexican Golden Rump Tarantula',
      price: 100,
      image: '/images/B_albiceps1.jpeg',
      description: 'A docile species with a beautiful golden abdomen.',
    },
    {
      id: 4,
      name: 'Curly Hair Tarantula',
      price: 70,
      image: '/images/T_albo2.jpeg',
      description: 'A hardy species with a beautiful fluffy body.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length);
    }, 4000); 
    return () => clearInterval(interval); 
  }, [featuredProducts.length]);

  const currentProduct = featuredProducts[currentIndex];

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Welcome to the Tarantula Store!</h1>

      {/* Featured Product Section */}
      <section
        style={{
          marginBottom: '40px',
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#242424',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2>New Arrivals!</h2>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            height: '300px', 
            maxWidth: '500px',
            margin: '0 auto',
            borderRadius: '10px',
          }}
        >
          <img
            src={currentProduct.image}
            alt={currentProduct.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
          />
        </div>
        <h3>{currentProduct.name}</h3>
        <p style={{ margin: '10px 0', fontSize: '16px' }}>{currentProduct.description}</p>
        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>${currentProduct.price.toFixed(2)}</p>
        <button
          onClick={() => navigate(`/products/${currentProduct.id}`)}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          View Details
        </button>
      </section>

      {/* Information Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ textAlign: 'center' }}>Learn More About Tarantulas</h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div
            style={{
              flex: '1',
              maxWidth: '300px',
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '20px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h3>Why Tarantulas?</h3>
            <p>
              They make captivating pets, offering a glimpse into the exotic world of arachnids. They
              are low-maintenance companions, require minimal space, and exhibit mesmerizing
              behaviors that make them endlessly fascinating to observe.
            </p>
          </div>
          <a
            href="https://tomsbigspiders.com/2014/11/09/the-best-tarantula-species-for-beginners/"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-10px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div
              style={{
                flex: '1',
                maxWidth: '300px',
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '20px',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                height: '250px',
              }}
            >
              <h3>Choosing Your First Tarantula</h3>
              <p>
                New to tarantulas? Get tips from a leading expert in the tarantula community over at
                Tom's Big Spiders to find the perfect species for you.
              </p>
            </div>
          </a>
          <a
            href="https://tomsbigspiders.com/beginner-guides/"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-10px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div
              style={{
                flex: '1',
                maxWidth: '300px',
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '20px',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                height: '250px',
              }}
            >
              <h3>Caring for Your Tarantula</h3>
              <p>
                Looking for essential care information for your new tarantula? From setting up a
                habitat to feeding and health tips, head over to Tom's Big Spiders, where you'll
                find beginner-friendly guides perfect for learning everything you need to know.
              </p>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}
