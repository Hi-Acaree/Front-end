import React from "react";
import styled from "styled-components";
import Picture from "./Picture.tsx";

/**
 * DoctorDetails component
 * @param {number} id - Doctor ID
 * @param {string} name - Doctor name
 * @param {string} specialization - Doctor specialization
 * @param {string} departmentName - Doctor department name
 * @param {string} imgUrl - Doctor image URL
 * @param {string} altText - Doctor image alt text
 * @param {() => void} onSelectDoctor - Callback function when the user clicks on the Book button
 * @returns {React.FC} - React component
 * @see DoctorList
 */

//== Component Props ==//

interface DoctorDetailsProps {
	id: number;
    name: string;
    specialization: string;
    departmentName: string;
	// onSelectDoctor: () => void;
	imgUrl: string;
	altText: string;
	onSelectMockDoctor: () => void;
}

//== Styled Components ==//

const DoctorCard = styled.div`
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    // padding: 20px;
    // margin: 10px;
`;

const DoctorImageContainer = styled.div`
    width: 100%;
    height: 150px; // Adjust based on your design
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: auto;
        height: 100%;
    }
`;

const DoctorInfo = styled.div`
    text-align: center;
    margin-top: 10px;
`;

const DoctorName = styled.h3`
    margin: 10px 0;
`;

const DoctorSpecialization = styled.p`
    color: #666;
`;

const DepartmentName = styled.p`
	color: #666;

`;

const BookButton = styled.button`
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: #388e3c;
    }
`;



// == Component == //
const DoctorDetails: React.FC<DoctorDetailsProps> = ({ 
	name, specialization, departmentName,
	imgUrl, altText, onSelectMockDoctor }) => {
	return (
		<DoctorCard>
			<DoctorImageContainer>
				<img src={imgUrl} alt={altText} />
			</DoctorImageContainer>
			<DoctorInfo>
				<DoctorName>{name}</DoctorName>
				<DoctorSpecialization>{specialization}</DoctorSpecialization>
				<DepartmentName>{departmentName}</DepartmentName>
				<BookButton onClick={onSelectMockDoctor}>Book</BookButton>
			</DoctorInfo>
		</DoctorCard>
	);
};

export default DoctorDetails;
