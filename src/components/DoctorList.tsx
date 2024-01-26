import React, { useEffect, useState } from "react";
import DoctorDetails from "./DoctorDetails.tsx";
import {Doctor} from "../types/type";
import styled from "styled-components";

const DoctorListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
    padding: 20px;
    align-items: start; // Align the items to the start of the container
    justify-content: center; // Center the grid items in the container
    overflow-y: auto; // Allow vertical scrolling if the content is too tall
    height: calc(100vh - 120px); // Account for the header and footer height
`;



const DoctorListHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    font-size: 1.5rem;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
`;

const DoctorListBody = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
    justify-content: center;
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

// ... Rest of the DoctorList component remains the same


interface MockDoctor {
	id: number;
	name: string;
	specialization: string;
	departmentName: string;
	imgUrl: string;
	altText: string;
}



  
  interface DoctorProps {
    onSelectDoctor: (selectedDoctor: Doctor) => void;
	onSelectMockDoctor: (selectedMockDoctor: MockDoctor) => void;
  }

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
  
const DoctorList: React.FC<DoctorProps> = ({ onSelectDoctor, onSelectMockDoctor }) => {

	const [doctors, setDoctors] = useState<Doctor[]>([]);

	const [MockDoctor, setMockDoctor] = useState<MockDoctor[]>([]);

	useEffect(() => {
	// ...existing useEffect to fetch doctors
	}, []);
  
	return (
		<DoctorListContainer>
			<DoctorListHeader>
				{/* DoctorList header */}
				<h2>Doctor List</h2>
			</DoctorListHeader>
			<DoctorListBody>
				{/* DoctorList body */}
				<div className="doctor-list">
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
				</div>
			</DoctorListBody>
			<DoctorListFooter>
				{/* DoctorList footer */}
				<h3>Footer</h3>
			</DoctorListFooter>
		</DoctorListContainer>
	);
};
  
export default DoctorList;