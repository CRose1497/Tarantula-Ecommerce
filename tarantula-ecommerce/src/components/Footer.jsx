/**
 * File: Footer.jsx
 * Author: Christian Rose
 * Date: 2024-12-12
 * Description: React component for the website footer. This component displays 
 *              website copyright information, photo credits, and a social media link.
 * 
 * Features:
 * - Displays the current year dynamically using JavaScript.
 * - Includes a social media section with an accessible link to Facebook.
 * - Ensures the footer is styled consistently using the `Footer.css` stylesheet.
 */

import React from 'react';
import './Footer.css'; 

// Footer component
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-title">
          &copy; {new Date().getFullYear()} Tarantula E-Commerce. All rights reserved.
        </p>
        <p className="footer-subtext">
          All photos &copy; Christian Rose. Unauthorized use is prohibited.
        </p>
        <div className="social-icons">
          <a
            href="https://www.facebook.com/share/g/19hvnAz6vk/?mibextid=K35Xfp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <i className="fa fa-facebook"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
