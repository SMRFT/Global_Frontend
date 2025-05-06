import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// --- Function to get token from cookies ---
function setforlocaldev() {
  const dev_token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJTSDAwOCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJuYW1lIjoidGVzdCIsImFsbG93ZWQtYWN0aW9ucyI6WyJHTC1QLUVBRC1SVyIsIkdMLVAtRVAtUlciXSwiYWxsb3dlZC1kYXRhIjpbIlNIQjAwMSJdLCJpc3MiOiJodHRwczovL2xhYi5zaGlub3ZhLmluLyIsImlhdCI6MTc0NjUyMTA4NCwiZXhwIjoxNzQ2NjA3NDg0LCJqdGkiOiIxYzg1ZTYwZC04YWY1LTRjZTctYTkyMy1mY2NlN2FmMmIwNWYifQ.Wre8XF9DARuHrJYJJ8e_CtkcIhIqytXohyeOuxRzXOK0TZOv3_ut4y-BMzB9jILHbsktsPB0i-VsXcXmSvk1NC6yEBL1lh8hICtsfNQP0HxfA62W9FPnfjuzOa7-mwDE5V1EJo4lEL897K5JVyxUFpUnyxBuum1E3uP9_I-N_8o57Dbe1IBQu3W2V8G0J4X_HxPzs45QqqWuczLajTJzZcqk2Zbib0XSv1own4COOLwrJPUdDfHM8Tq-_-sxKWl5MWMmIe33LV5aL_YPqYWt0uj-KyfSCf8aAgcmB3QW_XdDYw02gErpSGKaEhk3BQX5-zFe-BoipotOJQ25KhbSLw";
 return dev_token;
}

// --- Validate JWT Token Locally ---
function validate(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    if (!payload.exp || payload.exp < now) {
      throw new Error('Token expired');
    }
    return payload;
  } catch (err) {
    throw new Error('Invalid token');
  }
}

// --- Retrieve token from localStorage or cookie ---
let accessToken = localStorage.getItem('access_token');
console.log("welcome")
if (!accessToken) {
  console.log("not found token")
  accessToken= setforlocaldev();
   console.log("if end")
}

// --- Validate and Render ---
(function main() {
  try {
    console.log("first")
    if (!accessToken) throw new Error('No token found');

    const userPayload = validate(accessToken); // ✅ Now valid
    localStorage.setItem('user_payload', JSON.stringify(userPayload)); // ✅ Save payload

    // Token is valid, render app
    createRoot(document.getElementById('root')).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (err) {
    console.error('Token validation failed:', err.message);
    localStorage.removeItem('access_token');

  }
})();
