// App.js
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

function App() {
  return (
    <Router>
        <Sidebar />
        <Content>
          <Routes>
            {/* Global */}
            <Route path="/" element={<Profile />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/EmployeeList" element={<EmployeeList />} />
          </Routes>
        </Content>
    </Router>
  );
}

export default App;
