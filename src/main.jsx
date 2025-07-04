import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// --- Function to get token from cookies ---
function setforlocaldev() {
  const dev_token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI1MDg2NyIsImVtYWlsIjoiUGFydGhpYmFuMzEyMTQ2MUBnbWFpbC5jb20iLCJuYW1lIjoiTS5QYXJ0aGliYW4iLCJhbGxvd2VkLWFjdGlvbnMiOlsiU0QtUC1CRy1SVyIsIkdMLVAtRUQtUlciLCJTRC1QLUxUQS1SVyIsIlNELVAtUkctUlciLCJTRC1QLU9ELVIiLCJHTC1QLVAtUlciLCJTRC1QLVJFRy1SVyIsIlNELVAtU0MtUlciLCJTRC1QLVJCLVJXIiwiU0QtUC1TVlJPLVJXIiwiU0QtUC1DVC1SVyIsIlNELVAtU1ZSSS1SVyIsIlNISS1QLVRSQUlOLVJXIiwiU0QtUC1MQS1SVyIsIkdMLVAtRVAtUlciLCJTRC1QLUNULVIiLCJTRC1QLVJELVIiLCJTSEktUC1FWFAtUlciLCJTRC1QLUxELVJXIiwiU0QtUC1NSVMtUiIsIlNELVAtU1ZELVJXIiwiU0QtUC1UREUtUlciLCJTRC1QLUJCQS1SVyIsIlNELVAtUkEtUlciLCJTSEktUC1JTkMiLCJTRC1QLUlOVi1SIiwiU0QtUC1TVkYtUlciLCJTRC1QLVJELVJXIiwiU0QtUC1DTi1SVyIsIlNISS1QLUVNUCIsIlNELVAtUE8tUlciLCJTRC1QLUlOVi1SVyIsIlNELVAtVVItUlciLCJTRC1QLVBGRS1SVyIsIlNELVAtTUlTLVJXIiwiU0QtUC1CSUxMLVJXIiwiR0wtUC1FQUQtUlciLCJTRC1QLUNCLVJXIiwiR0wtUC1FUE0tUlciLCJTRC1QLVNBLVJXIiwiR0wtUC1FTC1SVyIsIlNELVAtU1ZELVIiLCJTRC1QLUxELVIiXSwiYWxsb3dlZC1kYXRhIjpbIlNIQjAwMSJdLCJpc3MiOiJodHRwczovL2xhYi5zaGlub3ZhLmluLyIsImlhdCI6MTc1MTYwMDQ1OSwiZXhwIjoxNzUxNjg2ODU5LCJqdGkiOiIwZGY3N2Q1Ni00MjYwLTQ4MmUtOWU2MS01MDdjMWFmMTczMmEifQ.fAGmtAQK5rxMmI5ATIV1n2TZ4cNtjQXXlIdY8xQfJk2AS7tnMC6XCyFQZo_Ml_scwUpM9nUWUAB6Q6faqqeU_dp476v9MrWV6DzyTrFNWL74DMDwUfmCjpgQ1RSTPpv1d4Uf2iWqcMgJ7KtFujrv0myflS5LDnBUKdBXJPhIFJGnPicMLe9Gixhaty6-6hl42lsrqSjzLytxhbGO6lg_6S-bx1QrT5Rfl28cGcr_7swWwM_6hbwZ22MbOJ7EUgz8o6mnvp5nrJ3B5yF6zk8NW6KWYouzKr-QPqEKoRvbtN3TFOrNc9Lld6xcIQ2Q7EDbt_BKoYTWGiWKEzZtqufDbg";
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

