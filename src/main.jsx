import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// --- Function to get token from cookies ---
function setforlocaldev() {
  const dev_token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJTSDAwNyIsImVtYWlsIjoic2l2YXN1bmRhcmlzbXJmdEBnbWFpbC5jb20iLCJuYW1lIjoiZGV2aSIsImFsbG93ZWQtYWN0aW9ucyI6WyJTRC1QLVNDLVJXIiwiU0QtUC1DTi1SVyIsIlNELVAtU0EtUlciLCJTRC1QLVBGRS1SVyIsIkdMLVAtRVAtUlciLCJTRC1QLVVSLVJXIiwiU0QtUC1NSVMtUlciLCJHTC1QLUVQTS1SVyIsIlNELVAtTFRBLVJXIiwiU0QtUC1DVC1SVyIsIlNELVAtSU5WLVJXIiwiU0QtUC1TVkYtUlciLCJTRC1QLUNCLVJXIiwiU0QtUC1SQi1SVyIsIlNELVAtUkctUlciLCJTRC1QLVNWUkktUlciLCJHTC1QLUVBRC1SVyIsIkdMLVAtRUwtUlciLCJTRC1QLVBPLVJXIiwiU0QtUC1TVlJPLVJXIiwiU0QtUC1MQS1SVyIsIlNELVAtTEQtUlciLCJTRC1QLVJFRy1SVyIsIlNELVAtVERFLVJXIiwiU0QtUC1TVkQtUlciLCJTRC1QLVJELVJXIiwiU0QtUC1SQS1SVyIsIlNELVAtQklMTC1SVyIsIlNELVAtQkctUlciLCJTRC1QLU9ELVIiXSwiYWxsb3dlZC1kYXRhIjpbIlNIQjAwMyIsIlNIQjAwMSJdLCJpc3MiOiJodHRwczovL2xhYi5zaGlub3ZhLmluLyIsImlhdCI6MTc0NzMwNDgwMSwiZXhwIjoxNzQ3MzkxMjAxLCJqdGkiOiIyZTAwNTgxMS0xZGIzLTRkYmItOTY3Ni00MjEzNjZkZjA1ZDUifQ.ANlOp7lEgLA3FR96JbVXbINVJYVCJoA68I3xshHeSkpOXCAE4sZRwwcj9pIcMGaIs-QAANdQiX-y-_dUJ35EQkaDrxzF88KkoLVrQjB9o7KmCtDukiWSdDpbew0iiB0271me9dp6DdNcXkth0u31ZrOsYz3hfWPH4jemRaP46jYn7GPM6jb_IOYvnDHB3N_nfD-s768igMUh2dg7sRTsih1pxfhzB3xIXibFp1xMbJJM76d_dEoDgtZJmzIoT90vPhbZFHoA89vGTxxCvy1Sl7Myxu6P7bMhUtt3MQalU2vYPmz5c0FDrx4y-R080qqInNoiuhKYkGsZqC_n17BMRQ";
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

