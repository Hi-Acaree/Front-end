import React, { useEffect, useState } from "react";
import {Doctor} from "../types/type";
import styled from "styled-components";
import AppConfig from "../config/AppConfig.tsx";
import { Container, Card, Row, Col} from "react-bootstrap";
import  {
	FaHeartbeat,
	FaBrain,
	FaRadiationAlt,
	FaStethoscope,
	FaAllergies,
	FaNetworkWired,
	FaCapsules,
	FaBaby,
	FaXRay,
	FaSyringe,
	FaToilet,
	FaBone,
} from "react-icons/fa";

/**
 * DoctorList component
 * @param {Doctor[]} doctors - List of doctors
 * @param {function} onSelectDoctor - Callback function when a doctor is selected
 * @returns {JSX.Element} - List of doctors
 */



//== Styling ==//
const mobileBreakpoint = "600px";

const DoctorListContainer = styled(Container)`
  padding: 20px;
  max-width: 1400px; // Limit the maximum width of the container
`;

const DoctorListHeader = styled(Card.Header)`
  background-color: #f8f9fa; // A light background color
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    font-size: 1.75rem;
    color: #333;
  }
  .input-group {
    width: 100%; // Full width to accommodate longer search bar
    max-width: 400px; // Maximum width for the search bar
  }
  @media (max-width: ${mobileBreakpoint}) {
    flex-direction: column; // Stack elements on smaller screens
    gap: 10px; // Space between stacked elements
  }
`;

const DoctorListBody = styled(Row)`
  margin: 0;
  padding-top: 20px;
`;

const DoctorCard = styled(Card)`
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); // Subtle shadow for depth
  border-radius: 8px; // Slightly rounded corners
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px); // Raise card on hover for interaction feedback
  }
`;

const DoctorImage = styled(Card.Img)`
  height: 400px; // Fixed height for uniformity
  object-fit: cover; // Ensure the image covers the area
`;

const DoctorCardBody = styled(Card.Body)`
  padding: 15px;
`;

const DoctorCardTitle = styled(Card.Title)`
  font-size: 1.5rem; // Larger font size for the title
  color: #333; // Use a color that stands out
  font-weight: 500; // Slightly bold for emphasis
`;

const DoctorCardText = styled(Card.Text)`
  font-size: 1rem; // Slightly larger font size for the text
  color: #333; // A slightly darker color for better readability
  font-weight: 400; // Normal font weight for regular text
  text-transform: uppercase; // Optional: capitalize the text
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); // Slight shadow for better contrast
  margin-bottom: 0.5rem; // Add some margin to the bottom for spacing
`;

const StyledButton = styled.button`
  //calm green color for the background
  background-color: #008000; 
  border: none; // No border for a flat design
  color: white; // Text color for the button
  font-weight: bold; // Make the text bold
  text-transform: uppercase; // Optional: uppercase text
  padding: 10px 20px; // Adjust padding to your preference
  border-radius: 20px; // Rounded corners for the button
  cursor: pointer; // Cursor pointer to indicate clickable
  transition: background-color 0.3s, transform 0.2s; // Smooth transitions for hover effects

  &:hover {
    background-color: #0000ff; // Darker shade for hover state
    transform: translateY(-2px); // Slight lift effect on hover
  }

  &:active {
    background-color: #357a38; // Even darker shade for active state
  }

  &:focus {
    outline: none; // Remove default focus outline
    box-shadow: 0 0 0 0.2rem rgba(76, 175, 80, 0.5); // Optional: focus shadow with your color
  }

  &:disabled {
    background-color: #e0e0e0; // Disabled background color
    color: #ccc; // Disabled text color
    cursor: not-allowed; // Disabled cursor style
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 128, 0, 0.5); // Adjust the color to match your theme's green
  }
`;

const Icon = styled.div`
  display: inline-block;
  margin-right: 8px; // Spacing between icon and text
  color: #008000; // Icon color, you can change it to match your theme

  
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

	
  
  interface DoctorProps {
	onSelectMockDoctor: (selectedDoctor: Doctor) => void;
  }
//== Component ==//  
const DoctorList: React.FC<DoctorProps> = ({ onSelectMockDoctor }) => {
	const [doctors, setDoctors] = useState<Doctor[]>([]);

	// specializations and their corresponding icons
	const specializationIcons = {
		"Cardiology": <Icon><FaHeartbeat /></Icon>,
		"Neurology": <Icon><FaBrain /></Icon>,
		"Oncology": <Icon><FaRadiationAlt /></Icon>,
		"General": <Icon><FaStethoscope /></Icon>,
		"Allergies": <Icon><FaAllergies /></Icon>,
		"ENT": <Icon><FaNetworkWired /></Icon>,
		"Pharmacy": <Icon><FaCapsules /></Icon>,
		"Pediatrics": <Icon><FaBaby /></Icon>,
		"Psychiatry": <Icon><FaBrain /></Icon>,
		"Radiology": <Icon><FaXRay /></Icon>,
		"Urology": <Icon><FaToilet /></Icon>,
		"Surgery": <Icon><FaSyringe /></Icon>,
		"Dermatology": <Icon><FaCapsules /></Icon>,
		"Orthopedics": <Icon><FaBone /></Icon>,

	};

	const pictureUrl = AppConfig.apiPersonBaseUrl;

	// Fetch the list of doctors from the API
	useEffect(() => {
		fetch(`${AppConfig.apiDoctorListUrl}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok.");
				}
				return response.json();
			})
			.then((data) => {
				setDoctors(data); // Array of doctors objects
			})
			.catch((error) => {
				console.error("Error fetching doctors:", error);
			});
	}, []);

	return (
		<DoctorListContainer>
			{/* Header and Search UI */}
			<DoctorListBody xs={1} md={2} lg={3} xl={4} className="g-4">
				{doctors.map((doctor) => (
					<Col key={doctor.id}>
						<DoctorCard>
							<DoctorImage variant="top" src={`${pictureUrl}/${doctor.personDetails.id}/image`} alt={`${doctor.personDetails.firstName} ${doctor.personDetails.lastName}`} />
							<DoctorCardBody>
								<DoctorCardTitle>{`${doctor.personDetails.firstName} ${doctor.personDetails.lastName}`}</DoctorCardTitle>
								<DoctorCardText>{specializationIcons[doctor.specialization]} {doctor.specialization}</DoctorCardText>
								<DoctorCardText>{doctor.departmentName}</DoctorCardText>
								<StyledButton onClick={() => onSelectMockDoctor(doctor)}>Book</StyledButton>
							</DoctorCardBody>
						</DoctorCard>
					</Col>
				))}
			</DoctorListBody>
		</DoctorListContainer>
	);
};

export default DoctorList;
