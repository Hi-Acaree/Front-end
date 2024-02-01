import React, { useEffect, useState, useMemo } from "react";
import { Doctor, MockDoctor } from "../types/type";
// import { format } from "date-fns";
import { Button, Col } from "react-bootstrap";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import "./timeslot.css";

//=== Styling ===//
const mobileBreakpoint = "600px";

const TimeSlotContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start; // Align content to the top
  align-items: center;
  width: 100%; // Take full width of the parent container
  max-height: calc(100vh - 160px); // Adjust max-height to provide space for headers/footers
  overflow-y: auto; // Enable vertical scrolling if content overflows
  @media (max-width: ${mobileBreakpoint}) {
	max-height: calc(100vh - 60px); // Adjust for smaller header/footer on mobile
  }
`;

const TimeSlotList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // Adjust number of columns as needed
  gap: 15px;
  padding: 15px;
  width: 100%; // Ensure the grid takes the full width of its container
`;



const TimeSlotHeader = styled.div`
	/* TimeSlotHeader div styles */
	display: flex;
	justify-content: center;
	align-items: center;
	
`;

const TimeSlotBody = styled.div`
  /* TimeSlotBody div styles */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; // Ensures the TimeSlotBody takes up the full width available
`;

const TimeSlotFooter = styled.div`
	/* TimeSlotFooter div styles */
	display: flex;
	justify-content: center;
	align-items: center;
	/* Add your styles for the time slot footer here */
`;

const TimeSlotButton = styled.button<{ isSelected: boolean }>`
  padding: 10px;
  margin: 5px;
  border: 1px solid #ccc;
  background-color: ${({ isSelected }) => isSelected ? "#cce5ff" : "white"};
  color: ${({ isSelected }) => isSelected ? "#004085" : "black"};
  font-size: 0.9rem;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover, &:focus {
    background-color: ${({ isSelected }) => isSelected ? "#A0DB8E" : "#e6e6e6"};
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #e0e0e0;
    color: #ccc;
    border-color: #ccc;
    cursor: not-allowed;
  }
`;




//=== Mock Data ===//

const mockTimeSlots = [
	"9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
	"11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
	"1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
	"3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
];

/**
 * TimeSlot component
 * @param {Date} selectedDate - The selected date
 * @param {MockDoctor} selectedDoctor - The selected doctor
 * @param {function} setSelectedTimeSlot - Callback function to set the selected time slot
 * @param {boolean} isDateSelected - Flag to indicate if a date is selected
 * @returns {ReactElement} TimeSlot component
 */


//=== Component Props ===//


interface TimeSlotProps {
    selectedDate: Date;
    selectedDoctor: MockDoctor;
    setSelectedTimeSlot: (timeSlot: string) => void;
	isDateSelected?: boolean;
	isSelected?: boolean;

}

//=== Component ===//

const TimeSlot: React.FC<TimeSlotProps> = ({ selectedDate, selectedDoctor, setSelectedTimeSlot, isDateSelected }) => {
	const [timeSlots, setTimeSlots] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const dispatch = useDispatch();
	const selectedTimeSlot = useSelector((state: RootState) => state.appointment.selectedTimeSlot);

	

	const timeSlotElements = useMemo(() => {
		return mockTimeSlots.map((timeSlot) => (
			<Col key={timeSlot} xs={6} md={3} >
				<TimeSlotButton
					isSelected={selectedTimeSlot === timeSlot}
					onClick={() => setSelectedTimeSlot(timeSlot)}
					disabled={!isDateSelected} // Disable the button if no date is selected
				>
					{timeSlot}
				</TimeSlotButton>
			</Col>
		));
	}, [selectedTimeSlot, isDateSelected, setSelectedTimeSlot]);

	return (
		<TimeSlotContainer>
			<TimeSlotHeader>
				{/* TimeSlot header */}
				<h2>Time Slot</h2>
			</TimeSlotHeader>
			<TimeSlotBody>
				{/* TimeSlot body */}
				<TimeSlotList>
					{loading && <p>Loading...</p>}
					{error && <p>{error}</p>}
					{!loading && !error && timeSlotElements}
				</TimeSlotList>
			</TimeSlotBody>
			<TimeSlotFooter>
				{/* TimeSlot footer */}
			</TimeSlotFooter>
		</TimeSlotContainer>
	);
};

export default TimeSlot;
