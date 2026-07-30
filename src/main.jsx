import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// --- Function to get token from cookies ---
function setforlocaldev() {
  const dev_token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI2MDM4MCIsImVtYWlsIjoibWFuaWJhbGFuc21yZnRAZ21haWwuY29tIiwibmFtZSI6Ik1hbmliYWxhbiIsImFsbG93ZWQtYWN0aW9ucyI6WyJTVFItQVBJLVRSTC1SIiwiU0lOLUFQSS1JRi1SVyIsIk1EQy1QLVBURS1SVyIsIlNULVAtTlRGLVJXIiwiU1RSLVItQSIsIlNJLVItSU5EIiwiU1QtUC1UREwtUiIsIlNISS1QLURFTC1SVyIsIlNISS1QLVBIWS1SVyIsIlNISS1QLUVNUlItUlciLCJTSEktUC1GUk5ULVJXIiwiU1QtUC1ERVMtUlciLCJTSEktUC1NUkktUlciLCJTVC1QLUNNVC1SIiwiU0lOLUFQSS1PUi1SVyIsIlNUUi1BUEktSUwiLCJTVC1BUEktQ1JELVJXIiwiU0hJLVAtRk9STS1SVyIsIk1EQy1QLVJFRy1SIiwiU0lOLVAtR0lDLVIiLCJTSEktUC1GMlNSLVJXIiwiU0hJLVAtRjJSLVJXIiwiU0hJLVAtRjEtUlciLCJTSU4tQVBJLU9SUi1SIiwiU1RSLVAtSUNTLVIiLCJTSU4tUC1FTlFMLVJXIiwiU0lOLUFQSS1GVS1SVyIsIlNISS1QLU9ULVJXIiwiU0hJLVAtVFJBSU4tUlciLCJTSEktUC1NSUNVLVJXIiwiU0hJLVAtREVMUkFXLVJXIiwiU0lOLUFQSS1TRi1SIiwiU1QtQVBJLVRSTFItUlciLCJNREMtUC1QTlBSLVIiLCJTSEktUC1NT0NLLVJXIiwiU1RSLVAtVElOUi1SVyIsIk1EQy1BUEktTEJOLVIiLCJTSEktUC1QSEFSTS1SVyIsIk1EQy1QLU9TQi1SVyIsIkdQLVAtR0NOLVIiLCJFUi1QLUVSR1BSLVJXIiwiU0hJLVAtR0VUUkFXLVJXIiwiU1QtUC1DTVQtUlciLCJTSEktUC1IQU5ELVJXIiwiR0wtUC1FUC1SVyIsIlNISS1QLUNIRU1PUi1SVyIsIkdMLVAtUC1SVyIsIk1EQy1QLVRSQi1SVyIsIkVSLVItRVJTQSIsIk1EQy1QLVBOUC1SIiwiU1QtQVBJLUFNQy1SVyIsIlNUUi1BUEktVElOLVIiLCJTVFItUC1USU5SLVIiLCJNREMtUC1TT1ItUiIsIkdMLVAtRUwtUlciLCJTSEktUC1GMVNSLVJXIiwiU1QtQVBJLUVNUC1SIiwiU0hJLVAtRjMtUlciLCJTSEktUC1VUERSQVctUlciLCJTSEktUC1FTVItUlciLCJTSU4tUi1TVEEiLCJTVC1QLUJSRC1SIiwiU1QtUC1ERVMtUiIsIlNISS1QLVNJQ1VSLVJXIiwiTURDLVAtQ0RFLVJXIiwiU0lOLVAtR0RMLVJXIiwiTURDLUFQSS1QQVQtUiIsIkVSLVAtRVJHQVMtUlciLCJTSEktUC1OSUNVLVJXIiwiU1RSLUFQSS1WTC1SIiwiTURDLVAtUkRFLVJXIiwiU0hJLVAtRjFTLVJXIiwiRVItQVBJLUVSVUItUlciLCJTVC1QLVRETC1SVyIsIlNULVAtU05PLVJXIiwiR0wtUC1SU0UtUlciLCJTVFItQVBJLVZMLVJXIiwiU1RSLUFQSS1JTC1SVyIsIlNISS1QLUVYUC1SVyIsIlNJTi1QLUVOUS1SVyIsIk1EQy1QLUFTTS1SVyIsIk1EQy1QLVJFRy1SVyIsIlNISS1QLVVQRC1SVyIsIlNISS1QLUYxUi1SVyIsIkdMLVAtRUQtUlciLCJTSEktUC1SRUNSLVJXIiwiU0hJLVAtSEFORFItUlciLCJTVFItQVBJLVRJTi1SVyIsIlNISS1QLUNIRU1PLVJXIiwiU0hJLVAtSU5DIiwiTURDLUFQSS1HQVMtUiIsIkdMLVAtRUJULVJXIiwiU0hJLVAtRElBLVJXIiwiU0hJLVAtTUlDVVItUlciLCJNREMtUC1QTlAtUlciLCJTSEktUC1UUkFJTlItUlciLCJTVFItQVBJLVRSTFItUiIsIlNISS1QLUxBQi1SVyIsIkVSLVAtRVJSRVAtUlciLCJTSEktUC1PUEQtUlciLCJTVC1BUEktQlJELVJXIiwiRVItUC1FUkFTLVJXIiwiTURDLUFQSS1SVFMtUiIsIlNISS1QLUYyUy1SVyIsIkdMLVAtTkRDLVJXIiwiRVItUC1FUkItUlciLCJNREMtQVBJLUFULVIiLCJTSEktUC1SRUMtUlciLCJTVFItQVBJLVRSTC1SVyIsIlNISS1QLU1SRC1SVyIsIk1EQy1BUEktVEhSLVIiLCJTVC1SLUEiLCJTSEktUC1IUi1SVyIsIlNISS1QLU5JQ1VSLVJXIiwiU1QtUC1OVEYtUiIsIlNISS1QLVNJQ1UtUlciLCJTVFItQVBJLUlMLVIiLCJNREMtQVBJLUFULVJXIiwiTURDLUFQSS1DRFItUiIsIkdMLVAtQU5ELVJXIiwiR0wtUC1FQUQtUlciLCJTSEktUC1GM1ItUlciLCJFUi1QLUVSVkItUlciLCJNREMtQVBJLVJETC1SIiwiU0hJLVAtRjItUlciLCJTSEktUC1YUkFZLVJXIiwiU0hJLVAtQVZBSUwtUlciLCJTSEktUC1DVC1SVyJdLCJhbGxvd2VkLWRhdGEiOlsiU0hCMDAxIl0sImhvc3BpdGFsX2NvZGUiOiJTSDAwMSIsImhtc19wYWdlcyI6W10sImFsbG93ZWQtb3V0bGV0cyI6W10sImlzcyI6Imh0dHBzOi8vbGFiLnNoaW5vdmEuaW4vIiwiaWF0IjoxNzgyNDUxMTk5LCJleHAiOjE3ODI1MzgxOTl9.FtKhgzC5b3s3_Z2FkuDNZA0pM9jmPTxH7sI8kZR2avNlNCRuXksnQ8a_gjIUHUndZ_RRdJHDq-OGuONjRpLM1FbLttcvjaSKaF3Xu0qhcj0Mud9opfKlbXwXuR--q2XEmTlybwxcdyuVBWPi-dXCH9mxlebR365okcCyCA-u9CSGe7kWKJrvv9dAstS4bgElcslBCaXWEjuWEb7FD276AMuAzJUmZo6VtuewOQoV2NaLSytuEn0TmoNzWLYFJnh9MT35WgrVeDDpXl6Hwr1jT8ZAhT9zv4pkUtGEpyNc_IL-W-_qxkF_OIiSOiesOQ0UUoGNXkbaurGCPGT6Pnsv1Q";
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
    accessToken = setforlocaldev();
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

