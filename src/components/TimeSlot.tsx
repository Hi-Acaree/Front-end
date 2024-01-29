import React, { useEffect, useState, useMemo } from "react";
import { Doctor, MockDoctor } from "../types/type";
// import { format } from "date-fns";
import styled from "styled-components";

//=== Styling ===//

const TimeSlotContainer = styled.div`
	/* TimeSlot div styles */
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	/* Add your styles for the time slot here */
`;

const TimeSlotHeader = styled.div`
	/* TimeSlotHeader div styles */
	display: flex;
	justify-content: center;
	align-items: center;
	/* Add your styles for the time slot header here */
`;

const TimeSlotBody = styled.div`
	/* TimeSlotBody div styles */
	display: flex;
	justify-content: center;
	align-items: center;
	/* Add your styles for the time slot body here */
`;

const TimeSlotFooter = styled.div`
	/* TimeSlotFooter div styles */
	display: flex;
	justify-content: center;
	align-items: center;
	/* Add your styles for the time slot footer here */
`;


const mockTimeSlots = [
	"9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
	"11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
	"1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
	"3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
];


//=== Component Props ===//


interface TimeSlotProps {
    selectedDate: Date;
    selectedDoctor: MockDoctor;
    setSelectedTimeSlot: (timeSlot: string) => void;
	isDateSelected?: boolean;
}

//=== Component ===//

const TimeSlot: React.FC<TimeSlotProps> = ({ selectedDate, selectedDoctor, setSelectedTimeSlot, isDateSelected }) => {
	const [timeSlots, setTimeSlots] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// fetch available time slots for the selected doctor and date

	useEffect(() => {
		if (selectedDoctor) {
			const fetchAvailableTimeSlots = async () => {
				setLoading(true);
				setError(null);
				try {
					const response = await fetch(
						`/api/doctors/${selectedDoctor.id}/available-time-slots?date=${selectedDate.toISOString()}`
					);
					if (!response.ok) {
						throw new Error("Failed to fetch time slots");
					}
					const data = await response.json();
					setTimeSlots(data);
				} catch (error) {
					setError(error.message);
				} finally {
					setLoading(false);
				}
			};

			fetchAvailableTimeSlots();
		}
	}, [selectedDate, selectedDoctor]);


	//== use memo to memoize or cache the time slot elements ==//
	const timeSlotElements = useMemo(() => {
		return timeSlots.map((timeSlot) => (
			<button
				key={timeSlot}
				onClick={() => setSelectedTimeSlot(timeSlot)}
				className="time-slot-button"
				disabled={!isDateSelected} // Disable the button if no date is selected
			>
				{timeSlot}
			</button>
		));
	}, [timeSlots, setSelectedTimeSlot, isDateSelected]); // Add isDateSelected to dependencies

	return (
		<TimeSlotContainer>
			<TimeSlotHeader>
				{/* TimeSlot header */}
				<h2>Time Slot</h2>
			</TimeSlotHeader>
			<TimeSlotBody>
				{/* TimeSlot body */}
				<div className="time-slot-list">
					{loading && <p>Loading...</p>}
					{error && <p>{error}</p>}
					{!loading && !error && timeSlotElements}
				</div>
			</TimeSlotBody>
			<TimeSlotFooter>
				{/* TimeSlot footer */}
			</TimeSlotFooter>
		</TimeSlotContainer>
	);
};

export default TimeSlot;
