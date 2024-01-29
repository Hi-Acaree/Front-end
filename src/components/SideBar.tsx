import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaHistory, FaSignOutAlt } from "react-icons/fa";
import styled from "styled-components";

/*
Styles for the SideBar component
 */

const SideBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 200px;
    height: 100vh;
    background-color: #f0f0f0;
`;

const SideBarHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #4caf50;
    color: white;
    padding: 20px;
`;

const SideBarBody = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const SideBarLink = styled(NavLink)`
    display: flex;
    align-items: center;
    padding: 10px;
    color: #333;
    text-decoration: none;
    &.active {
        color: #4caf50;
        background-color: #e8f5e9; // You can add a background color for the active link
    }
    &:hover {
        color: #555;
    }
    svg {
        margin-right: 8px;
    }
`;


const SideBarFooter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #333;
    color: white;
    padding: 20px;
`;

//=== Component ===//



const SideBar: React.FC = () => {
	return (
		<SideBarContainer>
			<SideBarHeader>
				<h2>SideBar</h2>
			</SideBarHeader>
			<SideBarBody>
				<SideBarLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
					<FaHome /> Home
				</SideBarLink>

				<SideBarLink to="/calendar" className={({ isActive }) => (isActive ? "active" : "")}>
					<FaCalendarAlt /> Calendar
				</SideBarLink>
				<SideBarLink to="/history" className={({ isActive }) => (isActive ? "active" : "")}>
					<FaHistory /> History
				</SideBarLink>

				<SideBarLink to="/logout" className={({ isActive }) => (isActive ? "active" : "")}>
					<FaSignOutAlt /> Logout
				</SideBarLink>
			</SideBarBody>
			<SideBarFooter>
				<h2>Footer</h2>
			</SideBarFooter>
		</SideBarContainer>
	);
};

export default SideBar;

