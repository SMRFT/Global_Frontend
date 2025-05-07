import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
  background-color: #f5f5f5;
  font-size: 14px;
  border-bottom: 1px solid #ccc;
`;

function Header() {
  const user = JSON.parse(localStorage.getItem('user_payload'));
  console.log("allowedData", user["allowed-data"]);

  const selectedBranch = localStorage.getItem('selected_branch');


  return (
    <HeaderWrapper>
      {user ? (
        <div>
          <strong>ID:</strong> {user.aud} |{' '}
          <strong>Name:</strong> {user.name} |{' '}
          <strong>Email:</strong> {user.email}|{' '}
          <strong>Branch:</strong> {user["allowed-data"]}
          
          {selectedBranch && (
            <>
              {' '}| <strong>Branch:</strong> {selectedBranch}
            </>
          )}
        </div>
      ) : (
        'Loading user info...'
      )}
    </HeaderWrapper>
  );
}
export default Header;
