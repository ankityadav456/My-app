import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';  // Ensure this is properly imported

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
