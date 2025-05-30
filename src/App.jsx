// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import PagePermissions from './Components/PagePermissions';

const Content = styled.div`
  margin-left: 50px;
  padding: 20px;
  flex: 1;
`;

function App() {
  const userPayload = JSON.parse(localStorage.getItem('user_payload'));
  const allowedActions = userPayload?.['allowed-actions'] || [];

  return (
    <Router>
      <Sidebar />
      <div style={{ marginLeft: '200px' }}>
        <Header />
        <Content>
          <Routes>
            {allowedActions.map((code) => {
              const page = PagePermissions[code];
              if (!page) return null;

              const fullPath = `${import.meta.env.BASE_URL}${page.path}`;
              return <Route key={code} path={fullPath} element={<page.component />} />;
            })}
          </Routes>
        </Content>
      </div>
    </Router>
  );
}

export default App;
