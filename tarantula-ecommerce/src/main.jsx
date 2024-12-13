/**
 * File: main.jsx
 * Author: Christian Rose
 * Date: 2024-12-12
 * Description: Entry point for the React application. It sets up the rendering of the 
 *              root `App` component and provides global configuration for routing 
 *              and strict mode.
 * 
 * Features:
 * - Wraps the application in `BrowserRouter` to enable client-side routing.
 * - Utilizes React's `StrictMode` to highlight potential issues in the application.
 * - Renders the `App` component into the root DOM element.
 * 
 * Dependencies:
 * - ReactDOM for rendering the application into the DOM.
 * - React Router for managing navigation within the app.
 * - Global styles imported from `index.css`.
 */


import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Render the App component

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
