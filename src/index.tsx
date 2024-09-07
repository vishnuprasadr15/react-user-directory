import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import './index.css';
import AppRoutes from './components/Routes';

const container = document.getElementById('root') as HTMLElement; // Get the root element
const root = ReactDOM.createRoot(container); // Create a root

root.render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
