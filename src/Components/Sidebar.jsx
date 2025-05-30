import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PagePermissions from './PagePermissions';

const SidebarContainer = styled.aside`
  width: 220px;
  height: 100vh;
  background-color: #0f172a;
  padding: 24px 16px;
  box-sizing: border-box;
  color: white;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid #1e293b;
`;

const NavSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 24px;
  padding-left: 8px;
`;

const NavLink = styled(Link)`
  display: block;
  color: ${({ $active }) => ($active ? '#38bdf8' : '#cbd5e1')};
  background-color: ${({ $active }) => ($active ? '#1e3a8a' : 'transparent')};
  padding: 10px 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: #1e293b;
    color: #ffffff;
  }
`;

const LogoutButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 10px 12px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #dc2626;
  }
`;

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userPayload = JSON.parse(localStorage.getItem('user_payload'));
  const allowedActions = userPayload?.['allowed-actions'] || [];

  const handleLogout = () => {
    localStorage.clear(); // or remove specific items as needed
    sessionStorage.clear();
    const redirectURL = import.meta.env.VITE_LOGIN_REDIRECT_URL || '/login';
    navigate(redirectURL);
  };

  return (
    <SidebarContainer>
      <NavSection>
        <SidebarHeader>Global</SidebarHeader>
        {allowedActions.map((code) => {
          const page = PagePermissions[code];
          if (!page) return null;
          const fullPath = `${import.meta.env.BASE_URL}${page.path}`;
          const isActive = location.pathname === fullPath || location.pathname === page.path;

          return (
            <NavLink key={code} to={fullPath} $active={isActive}>
              {page.name}
            </NavLink>
          );
        })}
      </NavSection>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </SidebarContainer>
  );
};

export default Sidebar;
