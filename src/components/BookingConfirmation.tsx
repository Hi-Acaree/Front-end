// BookingConfirmation.tsx

import React from "react";
import styled from "styled-components";
import { MockDoctor } from "../types/type";

//== Styling ==//

const ConfirmationContainer = styled.div`
  /* Add styles here */
`;

//== Component props ==//

interface BookingConfirmationProps {
  selectedDoctor: MockDoctor;
  appointmentType: string;
  selectedDate: Date;
  selectedTimeSlot: string;
  appointmentMsg: string;
  onConfirm: () => void;
  onCancel: () => void;
}


//== Component ==//
const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
	selectedDoctor,
	appointmentType,
	selectedDate,
	selectedTimeSlot,
	appointmentMsg,
	onConfirm,
	onCancel,
}) => {
	return (
		<ConfirmationContainer>
			{/* Display appointment details */}
			<p>Doctor: {selectedDoctor.name}</p>
			<p>Appointment Type: {appointmentType}</p>
			<p>Date: {selectedDate.toDateString()}</p>
			<p>Time Slot: {selectedTimeSlot}</p>
			<p>Message: {appointmentMsg}</p>
			<button onClick={onConfirm}>Confirm Booking</button>
			<button onClick={onCancel}>Cancel</button>
		</ConfirmationContainer>
	);
};

export default BookingConfirmation;
