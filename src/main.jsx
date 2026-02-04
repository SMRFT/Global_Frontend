import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// --- Function to get token from cookies ---
function setforlocaldev() {
  const dev_token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI2MDM4MCIsImVtYWlsIjoibWFuaWJhbGFuc21yZnRAZ21haWwuY29tIiwibmFtZSI6Ik1hbmliYWxhbiIsImFsbG93ZWQtYWN0aW9ucyI6WyJTSEktUC1GT1JNLVJXIiwiTURDLVAtT1NCLVJXIiwiU1QtUC1TTk8tUlciLCJTVC1QLUNNVC1SIiwiTURDLUFQSS1SREwtUlciLCJTSEktUC1SRUNSLVJXIiwiU0hJLVAtQ1QtUlciLCJHTC1QLVAtUlciLCJTSEktUC1UUkFJTi1SVyIsIkVSLVAtRVJTRC1SVyIsIk1EQy1QLVJERS1SVyIsIkdMLVAtRUFELVJXIiwiU1QtUi1DRFIiLCJTVC1BUEktQlJELVJXIiwiU0hJLVAtTklDVS1SVyIsIk1EQy1QLVRSQi1SVyIsIk1EQy1QLVBOUC1SVyIsIlNULVAtTlRGLVIiLCJTSEktUC1GMlMtUlciLCJTSEktUC1VUEQtUlciLCJNREMtUC1QTlAtUiIsIk1EQy1BUEktQVQtUiIsIlNISS1QLU1JQ1VSLVJXIiwiU0hJLVAtSU5DIiwiU0hJLVAtTU9DSy1SVyIsIk1EQy1BUEktVEhSLVIiLCJNREMtQVBJLUNEUi1SIiwiTURDLVAtUFRFLVJXIiwiRVItUC1FUkdQUi1SVyIsIk1EQy1BUEktTEJOLVIiLCJTVC1QLU5URi1SVyIsIlNISS1QLU1SRC1SVyIsIkVSLVItRVJQIiwiTURDLVItUkVDIiwiU0hJLVAtREVMUkFXLVJXIiwiU0hJLVAtQVZBSUwtUlciLCJTSEktUC1IUi1SVyIsIlNISS1QLVNJQ1UtUlciLCJNREMtQVBJLVJUUy1SIiwiU0hJLVAtUEhBUk0tUlciLCJTSEktUC1GMVMtUlciLCJNREMtUC1SRUctUlciLCJTVC1BUEktQ1JELVJXIiwiU1QtQVBJLUVNUC1SIiwiU0ktUi1JTkQiLCJTSEktUC1UUkFJTlItUlciLCJHTC1QLUVELVJXIiwiRVItUC1FUlVTLVJXIiwiU0hJLVAtRjNSLVJXIiwiTURDLVAtUkVHLVIiLCJTSEktUC1IQU5ELVJXIiwiU1QtUC1ERVMtUlciLCJHUC1QLUdDTi1SIiwiU0hJLVAtRVhQLVJXIiwiU1QtUi1BIiwiRVItUC1FUlAtUiIsIk1EQy1BUEktR0FTLVIiLCJTVC1QLUNNVC1SVyIsIlNISS1QLUNIRU1PLVJXIiwiU0hJLVAtRjJTUi1SVyIsIlNISS1QLUVNUlItUlciLCJNREMtQVBJLVBBVC1SIiwiU0hJLVAtRjItUlciLCJHTC1QLUVMLVJXIiwiTURDLVAtQVNNLVJXIiwiU0hJLVAtTUlDVS1SVyIsIkdMLVAtRVAtUlciLCJTSEktUC1TSUNVUi1SVyIsIlNISS1QLUhBTkRSLVJXIiwiU0hJLVAtTklDVVItUlciLCJTSEktUC1DSEVNT1ItUlciLCJTSEktUC1GMVItUlciLCJHTC1QLU5EQy1SVyIsIlNISS1QLVVQRFJBVy1SVyIsIlNISS1QLU9QRC1SVyIsIlNISS1QLVBIWS1SVyIsIlNISS1QLUYyUi1SVyIsIlNULUFQSS1BTUMtUlciLCJTSEktUC1ESUEtUlciLCJTSEktUC1ERUwtUlciLCJTSEktUC1FTVItUlciLCJHTC1QLVJTRS1SVyIsIlNULVAtREVTLVIiLCJHTC1QLUVCVC1SVyIsIk1EQy1QLVNPUi1SIiwiU0hJLVAtWFJBWS1SVyIsIlNISS1QLU9ULVJXIiwiU0hJLVAtRlJOVC1SVyIsIk1EQy1QLVBOUFItUiIsIlNISS1QLUYxU1ItUlciLCJTSEktUC1NUkktUlciLCJTSEktUC1SRUMtUlciLCJTSEktUC1GMy1SVyIsIk1EQy1BUEktUEFUIiwiU1QtUC1UREwtUiIsIlNULVAtVERMLVJXIiwiU0hJLVAtR0VUUkFXLVJXIiwiR0wtUC1BTkQtUlciLCJTSEktUC1GMS1SVyIsIlNISS1QLUxBQi1SVyIsIk1EQy1BUEktQVQtUlciLCJTVC1QLUJSRC1SIiwiTURDLVAtQ0RFLVJXIl0sImFsbG93ZWQtZGF0YSI6WyJTSEIwMDUiXSwiaXNzIjoiaHR0cHM6Ly9sYWIuc2hpbm92YS5pbi8iLCJpYXQiOjE3NzAxNzgyNzgsImV4cCI6MTc3MDI2NTI3OCwianRpIjoiZjYwNjM5ZDctMzI0ZC00MTk1LTk5ZWMtMjU0NTg3NzFhYTg5In0.VCVTPjCvB8lq4Guq3pc4wQ4S4J5_0o7EENnEQPpGcj_c2R7ofAo1lPZ60wy3bXp7_8oEeeFO9C42VXexjEfHY5I40HiLoRTGK40gpuh4Ytld0qzfESXTQ6VAIi6cKBl4NG-xfnQvwQJ9khCEmk1scw_QtHMm9_9JjOR1W7YhoBNJP0GcObIb9bCiVjArh5xCkclkFnix_SrwPAMt_BKOTnoVHojO3fNvWVZh8yANDPgAjZkDwI6sMCWHq1brTFW4rz-HPU03DvtEGRm3G6Y66iS3ElmkSyYqGJ6EOWw4LbMhVL7FXGRR7fs-K8iZAXHMGkVAWgpBhRWY4TuyJWvB2w";
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

