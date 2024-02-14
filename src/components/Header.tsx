import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Picture from "./Picture.tsx";
import styled from "styled-components";
import {FaBars, FaCaretDown, FaSearch} from "react-icons/fa";

//=== Styling ===//


const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    background-color: #f5f5f5;
    height: 80px;
    border-bottom: 1px solid #e5e5e5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1030;
    transition: all 0.5s ease-in-out;
`;

const Branding = styled.div`
  h1 {
    font-size: 1.5rem;
    margin: 0;
    color: #333;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    &:hover {
      transform: scale(1.05); /* Slightly more subtle scale effect on hover */
    }
    &:focus, &:active {
      outline: none;
      box-shadow: 0 0 0 2px rgba(0, 113, 188, 0.5); /* Accessibility: outline on focus for keyboard navigation */
    }
  }
`;


const Actions = styled.div`
  display: flex;
  align-items: center;
  .search-bar {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 4px 8px;
    position: relative;
    input {
      border: none;
      outline: none;
      padding: 8px;
      border-radius: 4px;
      width: 100%; /* Ensure input uses available space */
    }
    .search-icon {
      position: absolute;
      left: 10px;
      color: #666;
    }
    input::placeholder {
      color: #aaa; /* Improve visibility and contrast of placeholder text */
    }
    input:focus {
      box-shadow: 0 0 0 2px rgba(0, 113, 188, 0.5); /* Accessibility: outline on focus */
    }
  }
`;



const LogoImage = styled.img`
  height: 60px;
  width: auto;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
  &:hover {
    opacity: 0.8; /* Slight opacity change on hover for interactive feedback */
  }
`;



// Define a styled NavLink component
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #333;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 8px; // Provide space between icon and text for better recognition
  &.active {
    color: #0056b3;
    font-weight: bold;
    background-color: #eef; // Additional visual cue
    border-radius: 4px; // Soften the edges
  }
  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;
  &:hover {
    color: #007bff; 
    background-color: #ddf; // Slight change on hover
  }
`;


const DesktopNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Center navigation items horizontally */
  padding: 0 20px; /* Add some padding for spacing */
  @media (max-width: 768px) {
    display: none;
  }
`;


const MobileNavToggle = styled(FaBars)`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNav = styled.div`
  display: none; // Start off hidden
  @media (max-width: 768px) {
    display: flex; // Show when menu is toggled
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 60px; // Adjust based on your header height
    left: 0;
    right: 0;
    background: #f5f5f5;
    padding: 1rem;
    border-bottom: 1px solid #e5e5e5;
    z-index: 1031; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const SearchBarContainer = styled.div`
  position: relative;
  .search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
  }
  input {
    padding-left: 2.5rem; // Make room for the search icon
  }
`;

const Nav = styled.nav`
  position: relative;
  ul {
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
    li {
      margin: 0 12px;
      a {
        text-decoration: none;
        color: #333;
        padding: 10px 8px; /* Increase padding for better touch targets */
        border-radius: 4px; /* Soften the edges */
        transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
        &:hover, &:focus {
          color: #007bff;
          background-color: #eef; /* Subtle background color on hover/focus for feedback */
          outline: none; /* Remove the default focus outline */
        }
        &:focus-visible {
          box-shadow: 0 0 0 2px rgba(0, 113, 188, 0.5); /* Accessibility: Outline on keyboard focus */
        }
      }
    }
  }
`;

const MobileMenuIcon = styled(FaBars)`
  display: none; // Hidden by default
  @media (max-width: 768px) {
    display: block; // Show the hamburger icon on mobile devices
    cursor: pointer;
  }
`;

const Header: React.FC = () => {
	const [isNavVisible, setIsNavVisible] = useState(false);
	const navigate = useNavigate();

	const toggleNav = () => {
		setIsNavVisible(prevState => !prevState);
	};



	return (
		<HeaderContainer>
			<Branding>
				<LogoImage src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Logo" onClick={() => navigate("/")} />

			</Branding>
			<Nav as="nav">
				<DesktopNav>
					<StyledNavLink to="/" end>Home</StyledNavLink>
					<StyledNavLink to="/about">About</StyledNavLink>
					<StyledNavLink to="/services">Services</StyledNavLink>
					<StyledNavLink to="/contact">Contact</StyledNavLink>
				</DesktopNav>
				<MobileMenuIcon onClick={toggleNav} aria-label="Open navigation menu">
					<FaBars size={36} color="blue" />
				</MobileMenuIcon>
			</Nav>
			{isNavVisible && (
				<MobileNav>
					<StyledNavLink to="/" onClick={toggleNav}>Home</StyledNavLink>
					<StyledNavLink to="/about" onClick={toggleNav}>About</StyledNavLink>
					<StyledNavLink to="/services" onClick={toggleNav}>Services</StyledNavLink>
					<StyledNavLink to="/contact" onClick={toggleNav}>Contact</StyledNavLink>
				</MobileNav>
			)}
			<Actions>
				<SearchBarContainer>
					<FaSearch className="search-icon" aria-label="Search" />
					<input type="text" placeholder="Search..." aria-label="Search input" />
				</SearchBarContainer>
			</Actions>
		</HeaderContainer>
	);
};

export default Header;