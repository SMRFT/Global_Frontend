import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Access the redirect URL from environment variables
const REDIRECT_URL = import.meta.env.VITE_LOGIN_REDIRECT_URL;

// Function to get token from cookie
function getAccessTokenFromCookie() {
  const cookies = document.cookie.split('; ');
  for (let cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name === 'access_token') {
      return value;
    }
  }
  return null;
}

// Try to get token from localStorage
let accessToken = localStorage.getItem('access_token');

if (!accessToken) {
  // If not found in localStorage, try cookies
  const cookieToken = getAccessTokenFromCookie();

  if (cookieToken) {
    // Save cookie token into localStorage
    localStorage.setItem('access_token', cookieToken);
    accessToken = cookieToken;
  }
}

if (!accessToken) {
  // Redirect if no token
  window.location.href = REDIRECT_URL;
} else {
  // Token found, render the app
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
