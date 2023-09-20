import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const StyledWrapper = styled.section`
  background-color: lightblue;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 20px;
`;

const NavItem = styled.li`
  text-transform: uppercase;
  font-weight: bold;
`;

function Header() {
  return (
    <StyledWrapper>
      <React.Fragment>
        <h1>Help Queue</h1>
        <NavList>
          <NavItem>
            <Link to="/">Home</Link>
          </NavItem>
          <NavItem>
            <Link to="/sign-in">Sign In</Link>
          </NavItem>
        </NavList>
      </React.Fragment>
    </StyledWrapper>
  );
}

export default Header;
