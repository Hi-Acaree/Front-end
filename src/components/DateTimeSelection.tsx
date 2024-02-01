import React from "react";
import Calendar from "./Calendar.tsx";
import TimeSlot from "./TimeSlot.tsx";
import { MockDoctor } from "../types/type";
import { appointmentActions } from "../context/AppointmentSlice.tsx";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store.tsx";

//=== Styling ===//

const mobileBreakpoint = "600px";

const DateTimeSelectionContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr; // Give more space to the calendar
  gap: 20px;
  align-items: start;
  padding: 20px;
  @media (max-width: ${mobileBreakpoint}) {
    grid-template-columns: 1fr; // Stack components on smaller screens
  }
`;



// Update CalendarWrapper to allow it to grow and shrink with the viewport
const CalendarWrapper = styled.div`
  flex: 1;
  padding-right: 0; // Removed any additional padding that could cause overflow
  @media (max-width: ${mobileBreakpoint}) {
    padding-right: 0; // Ensure no padding on smaller screens
  }
`;

// TimeSlotWrapper should also be allowed to grow and shrink
const TimeSlotWrapper = styled.div`
  flex: 1;
  padding-left: 0; // Removed any additional padding that could cause overflow
  @media (max-width: ${mobileBreakpoint}) {
    padding-left: 0; // Ensure no padding on smaller screens
  }
`;

// The Card should contain all content without overflow and without the need for scrolling
const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden; // Changed to hidden to prevent any overflow
  margin: auto;
  width: auto; // Allow it to adjust based on content
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto; // Height should adjust to content
  @media (max-width: 768px) {
    height: auto; // Ensure height adjusts to content on small screens
    margin-bottom: 0; // Reduce margin bottom on small screens
  }
`;


const ConfirmButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  /* Add your styles for the confirm button container here */
`;
const ConfirmButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
	background-color: #388e3c;
  }
  @media (max-width: ${mobileBreakpoint}) {
	width: 100%; /* Ensure full width on smaller screens */
	padding: 15px 30px; /* Adjust padding for smaller screens */
  }
`;

/**
 * DateTimeSelection component
 * @param {MockDoctor} selectedDoctor - The selected doctor
 * @param {function} onDateTimeConfirmed - Callback function when the date and time slot are confirmed
 * @param {function} onNextStep - Callback function to move to the next step
 * @returns {ReactElement} - DateTimeSelection component
 */

//=== Component Props ===//

interface DateTimeSelectionProps {
  selectedDoctor: MockDoctor;
  onDateTimeConfirmed: (date: Date, timeSlot: string) => void;
  onNextStep: () => void;
}

//=== Component ===//

const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({ selectedDoctor, onDateTimeConfirmed, onNextStep }) => {
	const dispatch = useDispatch();
	const selectedDate = useSelector((state: RootState) => state.appointment.selectedDate);
	const selectedTimeSlot = useSelector((state: RootState) => state.appointment.selectedTimeSlot);

	const handleDateSelection = (selectedDate: Date) => {
		dispatch(appointmentActions.setSelectedDate(selectedDate));
	};

	const handleTimeSlotSelection = (selectedTimeSlot: string) => {
		dispatch(appointmentActions.setSelectedTimeSlot(selectedTimeSlot));
	};

	const handleConfirmDateTime = () => {
		if (selectedDate && selectedTimeSlot) {
			onDateTimeConfirmed(selectedDate, selectedTimeSlot);
		} else {
			alert("Please select both a date and a time slot.");
		}
	};

	return (
		<Card>
			<DateTimeSelectionContainer>
				<CalendarWrapper>
					<Calendar selectedDate={selectedDate} setSelectedDate={handleDateSelection} />
				</CalendarWrapper>
				{selectedDate && (
					<TimeSlotWrapper>
						<TimeSlot
							selectedDate={selectedDate}	  selectedDoctor={selectedDoctor}
							setSelectedTimeSlot={handleTimeSlotSelection}
							isDateSelected={!!selectedDate}
              
						/>
					</TimeSlotWrapper>
				)}
			</DateTimeSelectionContainer>
			{/* ConfirmButtonContainer is now moved out of DateTimeSelectionContainer */}
			<ConfirmButtonContainer>
				<ConfirmButton onClick={handleConfirmDateTime}>Confirm</ConfirmButton>
			</ConfirmButtonContainer>
		</Card>
	);
};
	
export default DateTimeSelection;
