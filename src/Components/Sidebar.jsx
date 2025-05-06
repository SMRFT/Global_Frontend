// Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import PagePermissions from './PagePermissions';

const SidebarContainer = styled.div`
  width: 200px;
  height: 100vh;
  background-color: #1e293b;
  padding: 20px;
  box-sizing: border-box;
  color: white;
  position: fixed;
`;

const NavLink = styled(Link)`
  display: block;
  color: white;
  margin: 15px 0;
  text-decoration: none;
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
`;

const Sidebar = () => {
  const location = useLocation();
  const userPayload = JSON.parse(localStorage.getItem('user_payload'));
  const allowedActions = userPayload?.['allowed-actions'] || [];

  return (
    <SidebarContainer>
      <h2>Global</h2>
      {allowedActions.map((code) => {
        const page = PagePermissions[code];
        if (!page) return null;
        const fullPath = `${import.meta.env.BASE_URL}${page.path}`;
        const isActive = location.pathname === fullPath || (fullPath === `${import.meta.env.BASE_URL}` && location.pathname === '/');

        return (
          <NavLink key={code} to={fullPath} $active={isActive}>
            {page.name}
          </NavLink>
        );
      })}
    </SidebarContainer>
  );
};

export default Sidebar;
