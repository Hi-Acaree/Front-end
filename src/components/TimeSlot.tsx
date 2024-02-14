// Import necessary dependencies
import React, { useState, useMemo } from "react";
import styled, { css } from "styled-components";
import { Doctor } from "../types/type";

//=== Styling ===//

const mobileStyles = css`
  @media (max-width: 600px) {
    height: 40vh; // Adjust height for mobile devices
    font-size: 14px; // Adjust font size for mobile devices
  }
`;


const TimeSlotContainer = styled.div`
  flex: 1;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto; // Set to auto to show scrollbar when needed
  margin-top: 0;
  height: 50vh; // Set a fixed height to ensure scrollbar appears when content overflows
  ${mobileStyles};
`;

const TimeSlotButton = styled.button<{ isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 12px;
  margin: 5px 0;
  border: ${({ isSelected }) => isSelected ? "1px solid #008000" : "1px solid #ccc"};
  background-color: ${({ isSelected }) => isSelected ? "#008000" : "white"};
  color: ${({ isSelected }) => isSelected ? "white" : "#333"};
  width: 50%; // Make the buttons full width
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
  ${mobileStyles};

  &:hover {
    background-color: ${({ isSelected }) => isSelected ? "#004d00" : "#e6ffe6"}; // Adjust hover colors for better visibility
  }
`;

const TimeSlotList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: calc(50vh - 30px); // Adjust max-height to account for padding
  overflow-y: auto; // Change to auto to show scrollbar when needed
  ${mobileStyles};
`;


const TimeSlotHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
  background-color: #f8f9fa;
  display: flex;
  margin: 0;
  font-weight: 500;
  padding: 10px 0;

`;



interface TimeSlotData {
	id: string;
	label: string;
	startTime: string;
	endTime: string;
  }
  
  
  interface TimeSlotProps {
	selectedDate: Date;
	selectedDoctor: Doctor;
	setSelectedTimeSlot: (timeSlot: TimeSlotData) => void;
	isDateSelected?: boolean;
	timeSlots: TimeSlotData[]; // include the array of time slot objects
  }
  
const TimeSlot: React.FC<TimeSlotProps> = ({
	selectedDate,
	selectedDoctor,
	setSelectedTimeSlot,
	isDateSelected,
	timeSlots, // destructure the timeSlots prop
}) => {
	const [selectedTimeSlot, setSelectedTimeSlotState] = useState<TimeSlotData | null>(null);
	
  
	const handleTimeSlotClick = (timeSlot: TimeSlotData) => {
		setSelectedTimeSlot(timeSlot); // Pass the entire time slot object
		setSelectedTimeSlotState(timeSlot); // Update the local state for visual feedback
	};
  
	const timeSlotElements = useMemo(() => timeSlots.map((timeSlot) => (
		<TimeSlotButton
			key={timeSlot.id}
			isSelected={selectedTimeSlot?.id === timeSlot.id}
			onClick={() => handleTimeSlotClick(timeSlot)}
			disabled={!isDateSelected} >
			{timeSlot.label}
		</TimeSlotButton>
	)), [selectedTimeSlot, isDateSelected, timeSlots]);
  
	return (
		<TimeSlotContainer>
			<TimeSlotList>
				<TimeSlotHeader> Dr: {selectedDoctor.personDetails.firstName} {selectedDoctor.personDetails.lastName} Available Time slots </TimeSlotHeader>
				{timeSlotElements}
			</TimeSlotList>
		</TimeSlotContainer>
	);
};
  
export default TimeSlot;
  
