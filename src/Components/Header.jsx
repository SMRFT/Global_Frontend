import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 12px 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const UserInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 14px;
  color: #333;

  strong {
    font-weight: 600;
    margin-right: 4px;
  }
`;

function Header() {
  const user = JSON.parse(localStorage.getItem('user_payload'));
  const selectedBranch = localStorage.getItem('selected_branch');

  return (
    <HeaderWrapper>
      {user ? (
        <UserInfo>
          <div><strong>ID:</strong> {user.aud}</div>
          <div><strong>Name:</strong> {user.name}</div>
          <div><strong>Email:</strong> {user.email}</div>
          {/* <div><strong>Branch:</strong> {user["allowed-data"]}</div> */}
          {selectedBranch && <div><strong>Selected:</strong> {selectedBranch}</div>}
        </UserInfo>
      ) : (
        <span>Loading user info...</span>
      )}
    </HeaderWrapper>
  );
}

export default Header;
