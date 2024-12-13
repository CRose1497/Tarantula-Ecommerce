Tarantula E-Commerce

Overview

This project is an e-commerce platform built with React, allowing users to browse tarantula products, view details, add items to a shopping cart, and simulate checkout. The project includes unit tests, integration tests, and a mock JSON server for API interactions.

Running Tests

!Important Note!

All tests must be run from the tarantula-ecommerce directory, as this is where the vitest configuration and dependencies are located.

To run tests:

Navigate to the project directory:

bash
cd tarantula-ecommerce

Run the tests:

bash
npm run test

Why Tests Fail in cd tarantula:

If you attempt to run tests from the cd tarantula parent directory, they will fail due to missing configurations and dependencies. Always ensure you are inside the tarantula-ecommerce directory.

Example Test Output:

When run from tarantula-ecommerce, the tests should display:

✓ src/_tests_/HomePage.test.jsx (1)
✓ src/_tests_/ProductListingPage.test.jsx (1)
✓ src/_tests_/App.test.jsx (1)

Test Files  3 passed (3)
     Tests  3 passed (3)

Features
Home Page:

Welcomes users with a featured product section and informative content about tarantulas.
Links to beginner-friendly guides for new tarantula enthusiasts.
Product Listing Page:

Displays available tarantula species with their details (price, availability, etc.).
Includes filtering and sorting options for a better browsing experience.
Allows users to add items to the cart.
Shopping Cart:

Displays selected items, quantity, and total price.
Users can update quantities or remove items.
Checkout Flow:

Users can complete their purchase with a seamless checkout experience.
Technologies Used
Frontend Framework: React
Testing Framework: Vitest with React Testing Library
Styling: Inline styles and CSS
Routing: React Router
Build Tool: Vite
Installation and Setup
Prerequisites
Ensure you have the following installed:

Node.js (v14 or higher)
npm or yarn
Steps:

1 Clone the repository:

bash
git clone https://github.com/CRose1497/Tarantula-Ecommerce
cd tarantula-ecommerce

2 Install dependencies:

bash
npm install

3 Run the development server:

bash
npm run dev

4 Open your browser and navigate to http://localhost:3000.

Testing:

Run Tests

This project includes unit and integration tests for key components using Vitest and React Testing Library.

To run the tests:

bash
npm run test

Tested Components:

HomePage: Ensures the homepage renders correctly with featured content.

ProductListingPage: Validates product display, filtering, and cart functionality.

App: Confirms the main app renders without errors and includes basic routing checks.



Build for Production

To create a production build:

bash
Copy code
npm run build
The build files will be available in the dist directory.

Deployment
This app is ready to be deployed on platforms like:

Vercel

Netlify

Firebase Hosting

Project Structure:

Copy code
├── public/             # Static files
├── src/
│   ├── Pages/          # React components for pages (HomePage, ProductListingPage, etc.)
│   ├── Components/     # Reusable components
│   ├── _tests_/        # Test files for components
│   ├── App.jsx         # Main App component
│   ├── index.jsx       # Entry point
│   └── styles/         # Custom styles
├── README.md           # Project documentation
├── package.json        # Project dependencies and scripts
└── vite.config.js      # Vite configuration

Future Enhancements:

User Authentication: Add login and user account features.

Order History: Allow users to view their previous orders.

Responsive Design: Optimize the site further for mobile and tablet devices.

Contributors
Christian Rose,
Developer and maintainer.

License:

This project is licensed under the MIT License. See the LICENSE file for details.

