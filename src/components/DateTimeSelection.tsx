import React, { useState } from "react";
import Calendar from "./Calendar.tsx";
import TimeSlot from "./TimeSlot.tsx";
import { Doctor, MockDoctor } from "../types/type";
import styled from "styled-components";

//=== Styling ===//
const DateTimeSelectionContainer = styled.div`
    display: flex;
    justify-content: space-between;
    /* Add other styles as needed */
`;

const button = styled.button`
	background-color: #2d9cdb;
	color: #fff;
	padding: 0.5rem 1rem;
	border-radius: 0.5rem;
	border: none;
	cursor: pointer;
	font-size: 1rem;
	font-weight: 500;
	transition: all 0.2s ease-in-out;
	&:hover {
		background-color: #2d9cdb;
		opacity: 0.8;
	}
`;

//=== Component props ===//

interface DateTimeSelectionProps {
    selectedDoctor: MockDoctor;
    onDateTimeConfirmed: (date: Date, timeSlot: string) => void;
    onNextStep: () => void;
}

//=== Component ===//

const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({ selectedDoctor, onDateTimeConfirmed, onNextStep }) => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

	const handleConfirmDateTime = () => {
		if (selectedTimeSlot) {
			onDateTimeConfirmed(selectedDate, selectedTimeSlot);
		}
	};

	return (
		<DateTimeSelectionContainer>
			<Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
			<TimeSlot
				selectedDate={selectedDate}
				selectedDoctor={selectedDoctor}
				setSelectedTimeSlot={setSelectedTimeSlot}
				isDateSelected={!!selectedDate}
			/>
			<button onClick={handleConfirmDateTime}>Confirm</button>
		</DateTimeSelectionContainer>

	);
};

export default DateTimeSelection;
