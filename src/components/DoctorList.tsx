import React, { useEffect, useState } from "react";
import DoctorDetails from "./DoctorDetails.tsx";
import {Doctor} from "../types/type";
import styled from "styled-components";

/**
 * DoctorList component
 * @param {Doctor[]} doctors - List of doctors
 * @param {function} onSelectDoctor - Callback function when a doctor is selected
 * @returns {JSX.Element}
 */

//== Styling ==//
const DoctorListContainer = styled.div`
    display: grid;
    grid-template-rows: auto 1fr auto; 
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;
    align-items: start;
    justify-items: center;
    overflow-y: auto;
    height: calc(100vh - 120px);
`;





const DoctorListHeader = styled.div`
    display: flex;
    justify-content: space-between; // Distribute space evenly between items
    align-items: center;
    width: 100%;
    padding: 10px 20px; // Add horizontal padding
    background-color: #4caf50;
    color: white;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    h2 {
        font-size: 2rem; // Larger text for the title
        margin-right: 20px; // Space after the title if needed
    }

    .search {
        display: flex;
        gap: 10px; // Spacing between input and button

        input {
            padding: 8px;
            border: none;
            border-radius: 4px;
            min-width: 200px; // Minimum width for the input
        }

        button {
            padding: 8px 16px;
            background-color: white;
            color: #4caf50;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;

            &:hover {
                background-color: #367c39; // Darker shade on hover
                color: white;
            }
        }
    }

    h3 {
        font-size: 1.25rem; // Smaller text for the subtitle
    }
`;

const DoctorListBody = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
    justify-content: center;
	width: 100%;
`;

const DoctorListFooter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px;
    background-color: #333;
    color: white;
    font-size: 1.1rem;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
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
				{/* DoctorList header */}
				<h2>Doctor List</h2>
				<div className="search">
					<input type="text" placeholder="Search" />
					<button type="submit">Search</button>
				</div>
				<h3>Book a consultation</h3>
			</DoctorListHeader>
			<DoctorListBody>
				{/* DoctorList body */}
				
				{mockdoctors.map((doctor) => (
					<DoctorDetails
						key={doctor.id}
						id={doctor.id}
						name={doctor.name}
						specialization={doctor.specialization}
						departmentName={doctor.departmentName}
						imgUrl={doctor.imgUrl}
						altText={doctor.altText}
						// onSelectDoctor={() => onSelectDoctor()}
						onSelectMockDoctor={() => onSelectMockDoctor(doctor)}
							
					/>
				))}
			</DoctorListBody>
			<DoctorListFooter>
				{/* DoctorList footer */}
				<h3>Footer</h3>
			</DoctorListFooter>
		</DoctorListContainer>
	);
};
  
export default DoctorList; // Export the component