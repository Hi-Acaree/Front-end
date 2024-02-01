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

//== Styled Components ==//

const DoctorCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 10px 0; // Small margin for separation from other cards
`;

const DoctorImageContainer = styled.div`
  width: 100%;
  height: auto; // Responsive height
  padding-top: 56.25%; // Aspect ratio for 16:9 images
  position: relative; // For absolute positioning of the image
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
`;

const DoctorImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; // Cover the container without stretching
`;

const DoctorInfo = styled.div`
  text-align: center;
  padding: 15px;
`;

const DoctorName = styled.h3`
  color: #333;
  font-size: 1.25rem;
  margin: 10px 0;
`;

const DoctorSpecialization = styled.p`
  color: #666;
  font-size: 1rem;
`;

const DepartmentName = styled(DoctorSpecialization)``; 

const BookButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  margin-top: 15px; // Space from the text
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); // Soft shadow for depth
  &:hover {
    background-color: #388e3c;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); // Larger shadow on hover
  }
`;

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


// == Component == //
const DoctorDetails: React.FC<DoctorDetailsProps> = ({ name, specialization, departmentName, imgUrl, altText, onSelectMockDoctor }) => {

	return (
		<DoctorCard>
			<DoctorImageContainer>
				<DoctorImage src={imgUrl} alt={altText} />
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
