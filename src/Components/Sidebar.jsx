// Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

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
  font-weight: ${({ active }) => (active === "true" ? "bold" : "normal")};
`;

const Sidebar = () => {
  const location = useLocation();

  return (
    <SidebarContainer>
      <h2>Global</h2>
      <NavLink to="/" active={(location.pathname === "/Profile").toString()}>
        Profile
      </NavLink>
      <NavLink to="/Admin" active={(location.pathname === "/Admin").toString()}>
        Admin
      </NavLink>
      <NavLink to="/EmployeeList" active={(location.pathname === "/EmployeeList").toString()}>
        Employee List
      </NavLink>
    </SidebarContainer>
  );
};

export default Sidebar;
