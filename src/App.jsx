import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './Components/Sidebar';
import Admin from './components/Admin';
import Profile from './components/Profile';
import EmployeeList from './components/EmployeeList';


const Content = styled.div`
  margin-left: 200px; /* Width of Sidebar */
  padding: 20px;
  flex: 1;
`;

// Function to get token from cookie
let accessToken = localStorage.getItem('access_token');
console.log(accessToken)

function App() {
  return (
    <Router>
      <Sidebar />
      <Content>
        <Routes>
          {/* Global Routes */}
          <Route path={`${import.meta.env.BASE_URL}`} element={<Profile />} />

          <Route path={`${import.meta.env.BASE_URL}Admin`} element={<Admin />} />
          <Route path={`${import.meta.env.BASE_URL}EmployeeList`} element={<EmployeeList />} />
      
        </Routes>
      </Content>
    </Router>
  );
}

export default App;
