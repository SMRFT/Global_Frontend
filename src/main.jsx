import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// --- Function to get token from cookies ---
function setforlocaldev() {
  const dev_token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI2MDM4MCIsImVtYWlsIjoibWFuaWJhbGFuc21yZnRAZ21haWwuY29tIiwibmFtZSI6Ik1hbmliYWxhbiIsImFsbG93ZWQtYWN0aW9ucyI6WyJTVFItQVBJLVRSTC1SIiwiU0lOLUFQSS1JRi1SVyIsIk1EQy1QLVBURS1SVyIsIlNULVAtTlRGLVJXIiwiU1RSLVItQSIsIlNJLVItSU5EIiwiU1QtUC1UREwtUiIsIlNISS1QLURFTC1SVyIsIlNISS1QLVBIWS1SVyIsIlNISS1QLUVNUlItUlciLCJTSEktUC1GUk5ULVJXIiwiU1QtUC1ERVMtUlciLCJTSEktUC1NUkktUlciLCJTVC1QLUNNVC1SIiwiU0lOLUFQSS1PUi1SVyIsIlNUUi1BUEktSUwiLCJTVC1BUEktQ1JELVJXIiwiU0hJLVAtRk9STS1SVyIsIk1EQy1QLVJFRy1SIiwiU0lOLVAtR0lDLVIiLCJTSEktUC1GMlNSLVJXIiwiU0hJLVAtRjJSLVJXIiwiU0hJLVAtRjEtUlciLCJTSU4tQVBJLU9SUi1SIiwiU1RSLVAtSUNTLVIiLCJTSU4tUC1FTlFMLVJXIiwiU0lOLUFQSS1GVS1SVyIsIlNISS1QLU9ULVJXIiwiU0hJLVAtVFJBSU4tUlciLCJTSEktUC1NSUNVLVJXIiwiU0hJLVAtREVMUkFXLVJXIiwiU0lOLUFQSS1TRi1SIiwiU1QtQVBJLVRSTFItUlciLCJTVC1SLUhPRCIsIk1EQy1QLVBOUFItUiIsIlNISS1QLU1PQ0stUlciLCJTVFItUC1USU5SLVJXIiwiTURDLUFQSS1MQk4tUiIsIlNISS1QLVBIQVJNLVJXIiwiTURDLVAtT1NCLVJXIiwiR1AtUC1HQ04tUiIsIkVSLVAtRVJHUFItUlciLCJTSEktUC1HRVRSQVctUlciLCJTVC1QLUNNVC1SVyIsIlNISS1QLUhBTkQtUlciLCJHTC1QLUVQLVJXIiwiU0hJLVAtQ0hFTU9SLVJXIiwiR0wtUC1QLVJXIiwiTURDLVAtVFJCLVJXIiwiRVItUi1FUlNBIiwiTURDLVAtUE5QLVIiLCJTVC1BUEktQU1DLVJXIiwiU1RSLUFQSS1USU4tUiIsIlNUUi1QLVRJTlItUiIsIk1EQy1QLVNPUi1SIiwiR0wtUC1FTC1SVyIsIlNISS1QLUYxU1ItUlciLCJTVC1BUEktRU1QLVIiLCJTSEktUC1GMy1SVyIsIlNISS1QLVVQRFJBVy1SVyIsIlNISS1QLUVNUi1SVyIsIlNJTi1SLVNUQSIsIlNULVAtQlJELVIiLCJTVC1QLURFUy1SIiwiU0hJLVAtU0lDVVItUlciLCJNREMtUC1DREUtUlciLCJTSU4tUC1HREwtUlciLCJNREMtQVBJLVBBVC1SIiwiRVItUC1FUkdBUy1SVyIsIlNISS1QLU5JQ1UtUlciLCJTVFItQVBJLVZMLVIiLCJNREMtUC1SREUtUlciLCJTSEktUC1GMVMtUlciLCJFUi1BUEktRVJVQi1SVyIsIlNULVAtVERMLVJXIiwiU1QtUC1TTk8tUlciLCJHTC1QLVJTRS1SVyIsIlNUUi1BUEktVkwtUlciLCJTVFItQVBJLUlMLVJXIiwiU0hJLVAtRVhQLVJXIiwiU0lOLVAtRU5RLVJXIiwiTURDLVAtQVNNLVJXIiwiTURDLVAtUkVHLVJXIiwiU0hJLVAtVVBELVJXIiwiU0hJLVAtRjFSLVJXIiwiR0wtUC1FRC1SVyIsIlNISS1QLVJFQ1ItUlciLCJTSEktUC1IQU5EUi1SVyIsIlNUUi1BUEktVElOLVJXIiwiU0hJLVAtQ0hFTU8tUlciLCJTSEktUC1JTkMiLCJNREMtQVBJLUdBUy1SIiwiR0wtUC1FQlQtUlciLCJTSEktUC1ESUEtUlciLCJTSEktUC1NSUNVUi1SVyIsIk1EQy1QLVBOUC1SVyIsIlNISS1QLVRSQUlOUi1SVyIsIlNUUi1BUEktVFJMUi1SIiwiU0hJLVAtTEFCLVJXIiwiRVItUC1FUlJFUC1SVyIsIlNISS1QLU9QRC1SVyIsIlNULUFQSS1CUkQtUlciLCJFUi1QLUVSQVMtUlciLCJNREMtQVBJLVJUUy1SIiwiU0hJLVAtRjJTLVJXIiwiR0wtUC1OREMtUlciLCJFUi1QLUVSQi1SVyIsIk1EQy1BUEktQVQtUiIsIlNISS1QLVJFQy1SVyIsIlNUUi1BUEktVFJMLVJXIiwiU0hJLVAtTVJELVJXIiwiTURDLUFQSS1USFItUiIsIlNISS1QLUhSLVJXIiwiU0hJLVAtTklDVVItUlciLCJTVC1QLU5URi1SIiwiU0hJLVAtU0lDVS1SVyIsIlNUUi1BUEktSUwtUiIsIk1EQy1BUEktQVQtUlciLCJNREMtQVBJLUNEUi1SIiwiR0wtUC1BTkQtUlciLCJHTC1QLUVBRC1SVyIsIlNISS1QLUYzUi1SVyIsIkVSLVAtRVJWQi1SVyIsIk1EQy1BUEktUkRMLVIiLCJTSEktUC1GMi1SVyIsIlNISS1QLVhSQVktUlciLCJTSEktUC1BVkFJTC1SVyIsIlNISS1QLUNULVJXIl0sImFsbG93ZWQtZGF0YSI6WyJTSEIwMDEiXSwiaG9zcGl0YWxfY29kZSI6IlNIMDAxIiwiaG1zX3BhZ2VzIjpbXSwiYWxsb3dlZC1vdXRsZXRzIjpbXSwiaXNzIjoiaHR0cHM6Ly9sYWIuc2hpbm92YS5pbi8iLCJpYXQiOjE3ODE2ODEyNjEsImV4cCI6MTc4MTc2ODI2MX0.RJtvyM6Mr8A1SI19btf9d9MPxuYcW_d05DlN80L0fNxGXtTkd475Ssn142ndFXxls8-FzFZD81khHKy8epooQWM77njnEDEGCh1K8_FNAa0W1j8PRIvbloAcTWwvvMhcmIFj6hwag_mgmrRDVTgPms0XrxbmjBCIIMfvfpm4Tl3BGjNYvR3cUuW8_CFygywHQiMpl4GCJkOVH9nJNR26BNhJ8yYUw5Kr9TE-VWTG2Xj_JvBmM39YC7yOLIpGXT7AhL_nDyaf-y_2yB9jGIU1DqPAs2S8k0hdR-ZeaR5lyrljGD1QKN0IdKzJxa7bxEvLqKZ0eJdaqJUPcwVn-DaUKw";
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

