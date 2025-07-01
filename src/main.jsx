import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// --- Function to get token from cookies ---
function setforlocaldev() {
  const dev_token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMjM0NSIsImVtYWlsIjoicGFydGhpQGdtYWlsLmNvbSIsIm5hbWUiOiJTdW5kYXIiLCJhbGxvd2VkLWFjdGlvbnMiOlsiU0QtUC1CRy1SVyIsIlNELVAtTFRBLVJXIiwiU0QtUC1SRy1SVyIsIlNELVAtT0QtUiIsIkdMLVAtUC1SVyIsIlNELVAtUkVHLVJXIiwiU0QtUC1TQy1SVyIsIlNELVAtUkItUlciLCJTRC1QLVNWUk8tUlciLCJGRS1QLUZHTC1SIiwiRkUtUC1GQUwtUiIsIlNELVAtQ1QtUlciLCJTSEktUC1UUkFJTi1SVyIsIlNELVAtU1ZSSS1SVyIsIlNELVAtTEEtUlciLCJHTC1QLUVQLVJXIiwiRkUtUi1GQSIsIkZFLVAtRlVTLVJXIiwiU0hJLVAtRVhQLVJXIiwiRkUtUC1GRy1SVyIsIlNELVAtTEQtUlciLCJTRC1QLVRERS1SVyIsIlNELVAtU1ZELVJXIiwiU0QtUC1SQS1SVyIsIlNISS1QLUlOQyIsIkZFLVAtRkdGLVIiLCJTRC1QLVNWRi1SVyIsIlNELVAtUkQtUlciLCJTRC1QLUNOLVJXIiwiRkUtUC1GUy1SVyIsIkZFLVAtRlItUlciLCJTRC1QLVBPLVJXIiwiU0QtUC1JTlYtUlciLCJTRC1QLVVSLVJXIiwiU0QtUC1QRkUtUlciLCJTRC1QLU1JUy1SVyIsIkdMLVAtRUFELVJXIiwiU0QtUC1CSUxMLVJXIiwiU0QtUC1DQi1SVyIsIkdMLVAtRVBNLVJXIiwiRkUtUC1GRi1SVyIsIkdMLVAtRUwtUlciLCJTRC1QLVNBLVJXIl0sImFsbG93ZWQtZGF0YSI6WyJTSEIwMDIiXSwiaXNzIjoiaHR0cHM6Ly9sYWIuc2hpbm92YS5pbi8iLCJpYXQiOjE3NTA4MzQxOTIsImV4cCI6MTc1MDkyMDU5MiwianRpIjoiMDRjNDM5NWItNzgyZC00MDVhLWEyOGUtZTE1NGJiZTk2MGIwIn0.bcWFhQCAAWEpLr-V7RuqYEHCEFciR6B4hRZwONqnivSn58REAqy4mbYLI6x8N5qm1R6qFruFrjizyXjvakUOi2VtN-YW-Wq-JwaaBYQ9RuFgiuqvDIB33oJqp19-lvV_hYoQDxtFBwWk3Z9jSQIZq1kia0eFwDItMCOTNpAbm-1YanpWlf3eh2d4v5VPag8xD2qyFz-5rlfYSDpuqELnjNUdlmOh7hyDXHmxFEauekNUhLARTBdKfSV3IRJEhN3ZMWADLfX6sDGM_LLUEESDYCzKfGYZ5TvKnr43pjy7WTPufPijfmwGVWPUPXYiGjSd-XoRWhWiBqURoWn-ghixWg";
  localStorage.setItem("access_token", dev_token);
  const selectedBranch = "SHB001";
  localStorage.setItem("selected_branch", selectedBranch);
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
  if (import.meta.env.LOCAL_DEV_ENVIRONMENT === 'true') {
  accessToken= setforlocaldev();
   console.log("if end")
  }
}

// --- Validate and Render ---
(function main() {
  try {
    console.log("first");
    if (!accessToken) throw new Error('No token found');

    const userPayload = validate(accessToken); // ✅ Validate token
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
    localStorage.removeItem('user_payload');

    // 🔁 Redirect to login page
    // window.location.href = import.meta.env.VITE_LOGIN_REDIRECT_URL;
  }
})();

