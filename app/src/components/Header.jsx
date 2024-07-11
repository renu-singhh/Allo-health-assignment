import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    return (
        <HeaderContainer>
            <LogoContainer>
                <p>Food - APP</p>
            </LogoContainer>
            <Nav>
                <NavItem>
                    <NavButton onClick={() => navigate("/home")}>Home</NavButton>
                </NavItem>
                <NavItem>
                    <NavButton onClick={() => navigate("/login")}>Login</NavButton>
                </NavItem>
            </Nav>
        </HeaderContainer>
    );
}

export default Header;

const HeaderContainer = styled.div`
    margin: 0;
    padding: 0.5rem; /* Adjusted padding */
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: #27272a; /* Equivalent to bg-zinc-900 */
    color: white;
`;

const LogoContainer = styled.div`
    display: flex;
    gap: 1rem;
`;

const Nav = styled.ul`
    display: flex;
    justify-content: space-between;
    gap: 1rem; /* Reduced gap */
    list-style: none;
    padding: 0;
    margin: 0;
`;

const NavItem = styled.li`
    display: flex;
    align-items: center;
`;

const NavButton = styled.button`
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 0.875rem; /* Reduced font size */
    padding: 0.25rem 0.5rem; /* Added padding for better click area */

    &:hover {
        text-decoration: underline;
    }
`;
