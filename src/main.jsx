import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// --- Function to get token from cookies ---
function setforlocaldev() {
  const dev_token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI1MDg4NyIsImVtYWlsIjoic2l2YXN1bmRhcmlzbXJmdEBnbWFpbC5jb20iLCJuYW1lIjoiU2l2YXN1bmRhcmkiLCJhbGxvd2VkLWFjdGlvbnMiOlsiRVItUC1FUlItUlciLCJFUi1QLUVSUkUtUlciLCJTVC1QLVNOTy1SVyIsIlNJTi1BUEktT1ItUlciLCJTSU4tQVBJLUlGLVJXIiwiU0QtUC1QRC1SIiwiU0QtUi1BIiwiTURDLVAtVFJCLVJXIiwiTURDLVAtUE5QLVJXIiwiU0QtUC1ERi1SIiwiU0lOLVAtSUNFLVIiLCJNREMtQVBJLUxCTi1SIiwiRVItUC1FUlBCLVJXIiwiRVItUC1FUlJFRy1SVyIsIk1EQy1QLVNPUi1SIiwiU0QtUC1URC1SIiwiU1QtUi1BIiwiU0QtUC1NSVMtUiIsIlNULUFQSS1DUkQtUlciLCJTVC1BUEktQU1DLVJXIiwiTURDLUFQSS1SVFMtUiIsIk1EQy1BUEktUEFULVIiLCJFUi1SLUVSTiIsIlNULVAtTlRGLVIiLCJTSU4tUC1HSUMtUiIsIlNULVAtTlRGLVJXIiwiU0QtUC1CVEQtUlciLCJNREMtQVBJLUNEUi1SIiwiU0QtUC1URC1SVyIsIk1EQy1BUEktVEhSLVIiLCJTVC1BUEktRU1QLVIiLCJTRC1QLVNTLVIiLCJTRC1BUEktVFYtUiIsIlNELUFQSS1URC1SIiwiTURDLVAtT1NCLVJXIiwiTURDLVAtUFRFLVJXIiwiTURDLVAtUkVHLVJXIiwiU0QtUC1CRy1SIiwiU0QtQVBJLVJCLVIiLCJTSU4tQVBJLUZVLVJXIiwiU0lOLUFQSS1JRi1SIiwiTURDLVAtQVNNLVJXIiwiU1QtUC1UREwtUlciLCJTVFItQVBJLVRJTi1SVyIsIlNUUi1QLVRSTC1SVyIsIlNULVAtREVTLVIiLCJTVC1QLURFUy1SVyIsIlNELVAtU1NVLVIiLCJTVC1QLUNNVC1SVyIsIkVSLVAtRVJELVIiLCJTRC1QLVNTLVJXIiwiU1RSLVAtTUVTIiwiTURDLUFQSS1SREwtUiIsIlNULVAtQlJELVIiLCJNREMtUC1QTlAtUiIsIlNELVAtQlRELVIiLCJTRC1QLVBPVi1SVyIsIlNULVAtVERMLVIiLCJFUi1QLUVSQi1SVyIsIlNELUFQSS1DTi1SIiwiU1RSLVItQSIsIlNUUi1QLUNMRyIsIlNUUi1QLVRSTC1SIiwiTURDLVAtUkVHLVIiLCJFUi1QLUVSUEQtUlciLCJTVFItQVBJLVRJTi1SIiwiTURDLVAtQ0RFLVJXIiwiU0QtUC1QT1YtUiIsIk1EQy1BUEktR0FTLVIiLCJTRC1BUEktT0FSLVIiLCJTRC1QLUdQRC1SIiwiU0QtUC1QTC1SIiwiTURDLVAtUkRFLVJXIiwiRVItUC1FUk5CTi1SIiwiU1QtQVBJLUJSRC1SVyIsIlNULVAtQ01ULVIiLCJTRC1QLURGLVJXIiwiRVItUC1FUlAtUiIsIlNELVAtU1NVLVJXIiwiU0lOLUFQSS1TRi1SIl0sImFsbG93ZWQtZGF0YSI6WyJTSEIwMDEiXSwiaXNzIjoiaHR0cHM6Ly9sYWIuc2hpbm92YS5pbi8iLCJpYXQiOjE3NTc5MDg0NDgsImV4cCI6MTc1Nzk5NTQ0OCwianRpIjoiMTVjOTkzMzItYTcwMC00MmNhLWE0NzEtNWYzYTQ1MTlhMWUyIn0.Ef-4HPDIkemlWEg4P8JzAqdtHWB95GaHkyJcxHGPx3lZOooE-LNS1hK-iEfpjX6R1aair0pBk6GH8jcU-uS988eEPpcQzLIDzOhWA1SySoz78h8uaUPng118jymznuPGqvgS_SwNHRV_XhcNP8-hQmIQAPlQIRW5m9Vg1_OAk6MGkTOCU9hsbbNsvX2mVasnrsQY5JgbQ9ttGmVQ2xVc0GwGua6k8PB8dL8FKpwEzHZNV5AbA67NAHGYRsCdP1vJkWXu_r0R0BLM1_MwTfpMrfntp9V0TEopPakaWa-MhaOhhbqj5bN-PYzFzUpVFuoa6VJ8t2YWA09G-VT2aROBTg";
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
    window.location.href = import.meta.env.VITE_LOGIN_REDIRECT_URL;
  }
})();

