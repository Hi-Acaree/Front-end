import React from "react";
import styled from "styled-components";

//=== Component Props ===//

interface AppointmentTypeOverlayProps {
	// Component props
	onTypeSelect: (type: "virtual" | "inPerson") => void;



}

//=== Styled Components ===//
const OverlayContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); // Semi-transparent background
    z-index: 1000; // Ensure it's above other content
`;

const OverlayContent = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    @media (max-width: 768px) {
        width: 90%;
    }
`;

const Button = styled.button`
    padding: 10px 20px;
    margin: 10px;
    border: none;
    border-radius: 4px;
    background-color: #4caf50;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover {
        background-color: #388e3c;
    }
    @media (max-width: 768px) {
        width: 100%;
    }
`;

//=== Component ===//

const AppointmentTypeOverlay: React.FC<AppointmentTypeOverlayProps> = ({ onTypeSelect }) => {
	return (
		<OverlayContainer>
			<OverlayContent>
				<h2>Select Appointment Type</h2>
				<Button onClick={() => onTypeSelect("virtual")}>Virtual Appointment</Button>
				<Button onClick={() => onTypeSelect("inPerson")}>In-Person Appointment</Button>
			</OverlayContent>
		</OverlayContainer>
	);
};

export default AppointmentTypeOverlay;
