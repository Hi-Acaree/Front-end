import React, { useEffect, useState } from "react";
import DoctorDetails from "./DoctorDetails.tsx";
import {Doctor} from "../types/type";
import styled from "styled-components";
import { Container, Card, Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";

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
  max-width: 1400px; // Consider increasing max-width for larger screens
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
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px); // Raise card on hover for interaction feedback
  }
`;

const DoctorImage = styled(Card.Img)`
  height: 180px; // Fixed height for uniformity
  object-fit: cover; // Ensure the image covers the area
`;

const DoctorCardBody = styled(Card.Body)`
  padding: 15px;
`;

const DoctorCardTitle = styled(Card.Title)`
  font-size: 1.25rem;
  color: #333; // Use a color that stands out
  font-weight: bold; // Make the title bold
`;

const DoctorCardText = styled(Card.Text)`
  font-size: 0.9rem;
  color: #333; // A slightly darker color for better readability
`;

const StyledButton = styled.button`
  background-color: #4caf50; // Your primary color
  border: none; // No border for a flat design
  color: white; // Text color for the button
  font-weight: bold; // Make the text bold
  text-transform: uppercase; // Optional: uppercase text
  padding: 10px 20px; // Adjust padding to your preference
  border-radius: 20px; // Rounded corners for the button
  cursor: pointer; // Cursor pointer to indicate clickable
  transition: background-color 0.3s, transform 0.2s; // Smooth transitions for hover effects

  &:hover {
    background-color: #388e3c; // Darker shade for hover state
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
`;



//== Type Declarations ==//


interface MockDoctor {
	id: number;
	name: string;
	specialization: string;
	departmentName: string;
	imgUrl: string;
	altText: string;
}


	
  
  interface DoctorProps {
    // onSelectDoctor: (selectedDoctor: Doctor) => void;
	onSelectMockDoctor: (selectedMockDoctor: MockDoctor) => void;
  }

// mock data

const mockdoctors: MockDoctor[] = [
	{
		id: 1,
		name: "Dr. John Doe",
		specialization: "General Physician",
		departmentName: "General Medicine",
		imgUrl: "https://i.imgur.com/8Km9tLL.png",
		altText: "Dr. John Doe",
	},
	{
		id: 2,
		name: "Dr. Jane Doe",
		specialization: "General Physician",
		departmentName: "General Medicine",
		imgUrl: "https://i.imgur.com/8Km9tLL.png",
		altText: "Dr. Jane Doe",
	},
	{
		id: 3,
		name: "Dr. John Doe",
		specialization: "General Physician",
		departmentName: "General Medicine",
		imgUrl: "https://i.imgur.com/8Km9tLL.png",
		altText: "Dr. John Doe",
	},
	{
		id: 4,
		name: "Dr. Jane Doe",
		specialization: "General Physician",
		departmentName: "General Medicine",
		imgUrl: "https://i.imgur.com/8Km9tLL.png",
		altText: "Dr. Jane Doe",
	},
	{
		id: 5,
		name: "Dr. John Doe",
		specialization: "General Physician",
		departmentName: "General Medicine",
		imgUrl: "https://i.imgur.com/8Km9tLL.png",
		altText: "Dr. John Doe",
	},
	{
		id: 6,
		name: "Dr. Jane Doe",
		specialization: "General Physician",
		departmentName: "General Medicine",
		imgUrl: "https://i.imgur.com/8Km9tLL.png",
		altText: "Dr. Jane Doe",
	},
	{
		id: 7,
		name: "Dr. John Doe",
		specialization: "General Physician",
		departmentName: "General Medicine",
		imgUrl: "https://i.imgur.com/8Km9tLL.png",
		altText: "Dr. John Doe",
	},
	{
		id: 8,
		name: "Dr. Jane Doe",
		specialization: "General Physician",
		departmentName: "General Medicine",
		imgUrl: "https://i.imgur.com/8Km9tLL.png",
		altText: "Dr. Jane Doe",
	},
];

//== Component ==//
  
const DoctorList: React.FC<DoctorProps> = ({onSelectMockDoctor }) => {

	useEffect(() => {
	// ...existing useEffect to fetch doctors
	}, []);
  
	return (
		<DoctorListContainer>
			<DoctorListHeader>
				<h2>Book a consultation today!</h2>
          
				<InputGroup className="w-auto">
					<FormControl
						placeholder="Search"
						aria-label="Search"
					/>
					<Button variant="outline-secondary">Search</Button>
				</InputGroup>
			</DoctorListHeader>
			<DoctorListBody xs={1} md={2} lg={3} xl={4} className="g-4">
				{mockdoctors.map((doctor) => (
					<Col key={doctor.id}>
						<DoctorCard>
							<DoctorImage variant="top" src={doctor.imgUrl} alt={doctor.altText} />
							<DoctorCardBody>
								<DoctorCardTitle>{doctor.name}</DoctorCardTitle>
								<DoctorCardText>{doctor.specialization}</DoctorCardText>
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