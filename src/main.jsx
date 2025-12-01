import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// --- Function to get token from cookies ---
function setforlocaldev() {
  const dev_token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI1MDg2NyIsImVtYWlsIjoicGFydGhpYmFuc21yZnRAZ21haWwuY29tIiwibmFtZSI6Ik0uUGFydGhpYmFuIiwiYWxsb3dlZC1hY3Rpb25zIjpbIlNISS1QLVJFQy1SVyIsIlNISS1QLUVYUC1SVyIsIlNULVItQ0RSIiwiU1QtQVBJLUVNUC1SIiwiU0hJLVAtRjJTUi1SVyIsIlNISS1QLVNJQ1UtUlciLCJTSEktUC1GMVNSLVJXIiwiU0QtUC1QT1YtUiIsIlNISS1QLVVQRFJBVy1SVyIsIlNISS1QLU1PQ0stUlciLCJTSEktUC1NSUNVLVJXIiwiU1QtUC1CUkQtUiIsIkdMLVAtQU5ELVJXIiwiU1QtUC1DTVQtUlciLCJTSEktUC1YUkFZLVJXIiwiU0hJLVAtRk9STS1SVyIsIlNISS1QLUFWQUlMLVJXIiwiRVItUi1FUk4iLCJTSEktUC1UUkFJTi1SVyIsIlNULVAtTlRGLVIiLCJTSEktUC1MQUItUlciLCJTRC1QLVNTLVJXIiwiU0hJLVAtRjMtUlciLCJTSEktUC1DVC1SVyIsIlNISS1QLUYyLVJXIiwiU0QtUC1ERi1SVyIsIlNISS1QLUYxUy1SVyIsIlNULVAtREVTLVJXIiwiR0wtUC1FUC1SVyIsIkVSLVAtRVJETC1SIiwiU0hJLVAtVFJBSU5SLVJXIiwiR0wtUC1QLVJXIiwiU0hJLVAtRjJTLVJXIiwiU0hJLVAtRjNSLVJXIiwiU0hJLVAtUEhZLVJXIiwiU0ktUi1JTkRFIiwiU0hJLVAtSEFORFItUlciLCJTSEktUC1GMVItUlciLCJTRC1QLVNTVS1SVyIsIlNISS1QLUNIRU1PUi1SVyIsIlNISS1QLU5JQ1UtUlciLCJTRC1QLVBMLVIiLCJTSEktUC1JTkMiLCJHTC1QLUVCVC1SVyIsIlNULUFQSS1BTUMtUlciLCJTRC1QLVRELVIiLCJTVC1BUEktQlJELVJXIiwiR0wtUC1FQUQtUlciLCJFUi1QLUVSUEItUlciLCJTSEktUC1PVC1SVyIsIlNELVItQ0VPIiwiU0QtUC1CVEQtUiIsIkdMLVAtRUwtUlciLCJTRC1QLVNTLVIiLCJTRC1QLVBPVi1SVyIsIlNISS1QLUVNUi1SVyIsIlNISS1QLU9QRC1SVyIsIkdMLVAtTkRDLVJXIiwiR1AtUC1HQ04tUiIsIlNISS1QLU1JQ1VSLVJXIiwiU0QtUC1CVEQtUlciLCJTSEktUC1GMS1SVyIsIlNISS1QLUhBTkQtUlciLCJTSEktUC1GMlItUlciLCJTSEktUC1HRVRSQVctUlciLCJTRC1BUEktVFYtUiIsIlNULVAtVERMLVJXIiwiU1QtUC1OVEYtUlciLCJTRC1QLUJHLVIiLCJTSEktUC1GUk5ULVJXIiwiU0hJLVAtTklDVVItUlciLCJHTC1QLVJTRS1SVyIsIlNISS1QLURJQS1SVyIsIlNELVAtQ0hDLVIiLCJTRC1QLVBELVIiLCJTRC1QLVRELVJXIiwiU1QtUC1TTk8tUlciLCJTRC1QLURGLVIiLCJTVC1QLURFUy1SIiwiU0hJLVAtTVJELVJXIiwiU0QtUC1DSEMtUlciLCJTRC1QLU1JUy1SIiwiU0hJLVAtUEhBUk0tUlciLCJTSEktUC1FTVJSLVJXIiwiU1QtUi1BIiwiU1QtUC1DTVQtUiIsIlNULUFQSS1DUkQtUlciLCJTRC1BUEktQ04tUiIsIkdMLVAtRUQtUlciLCJFUi1QLUVSQi1SVyIsIlNELVAtU1NVLVIiLCJTSEktUC1NUkktUlciLCJTSEktUC1SRUNSLVJXIiwiU0QtQVBJLVJCLVIiLCJTRC1BUEktVEQtUiIsIlNISS1QLUNIRU1PLVJXIiwiU1QtUC1UREwtUiIsIlNELVAtR1BELVIiLCJTSEktUC1TSUNVUi1SVyIsIkVSLVAtRVJQTC1SIiwiU0hJLVAtSFItUlciXSwiYWxsb3dlZC1kYXRhIjpbIlNIQjAwMSJdLCJpc3MiOiJodHRwczovL2xhYi5zaGlub3ZhLmluLyIsImlhdCI6MTc2NDU4Mzc1OCwiZXhwIjoxNzY0NjcwNzU4LCJqdGkiOiIyM2QxMjQxMi03ZTZhLTQ2YzYtYTc5My1jNzk2MTgxMzRiMjAifQ.DdqdZnANYZy_X96C3hhgalHvtnCdtRiK47uNOIU3wjedbL3DWxHxrXc8zWuqzZK4sdo6Rb-FQypdaC9mH_7Rc5d-Z66R5JhpW83wut5P_TptdmTIvcrFuEeRDKmV7WI6IsL6bU6AeG1BQW8_jn1R0IMA4-AecqoLI2um9sLgbtYtFAH4-MsvttcaRdxT63A-1tfHKAFxUL7o1s7xh1bmT6MWX4qBCS3YWP5DBnN2zmw83_Ak9KElHqTJmxPDp2xb1v3CoqKTkN9wwK1iKl294_M7cxGulWZj_u36aboaEePeKVRXY8U8W-P3tFrV0xSR2d0MpWkH0ybmh7FlpS9nqg";
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

