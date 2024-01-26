import React from "react";
import Picture from "./Picture.tsx";
import styled from "styled-components";

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    background-color: #fff;
    height: 60px;
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
    }
`;

const Actions = styled.div`
    display: flex;
    align-items: center;
    .search-bar {
        input {
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
    }
`;

const Profile = styled.div`
{/* Profile picture and dropdown */}
    display: flex;
    align-items: center;
    position: relative;
    .dropbtn {
        background-color: #4caf50;
        color: white;
        padding: 8px 12px;
        border: none;
        cursor: pointer;
        border-radius: 4px;
        margin-left: 10px;
    }
    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        z-index: 1;
        border-radius: 4px;
        a {
            padding: 12px 16px;
            text-decoration: none;
            display: block;
            color: #333;
            &:hover {
                background-color: #f1f1f1;
            }
        }
    }
    &:hover .dropdown-content {
        display: block;

    }
`;







const Header: React.FC = () => {
	return (
		<HeaderContainer>
			<Branding>
				<h1>Logo</h1>
			</Branding>
			<Actions>
				{/* Search bar or other actions */}
				<div className="search-bar">
					<input type="text" placeholder="Search" />
				</div>
			</Actions>
			<Profile>
				{/* Profile picture and dropdown */}
				<Picture imageUrl="#" altText="Profile Picture" />
				{/* Dropdown menu */}
				<div className="dropdown">
					<button className="dropbtn">Profile</button>
					<div className="dropdown-content">
						<a href="#">Settings</a>
						<a href="#">Logout</a>
					</div>
				</div>
			</Profile>
		</HeaderContainer>
	);
};

export default Header;