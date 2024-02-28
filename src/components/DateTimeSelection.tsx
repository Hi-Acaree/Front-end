/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from "react";
import Calendar from "./Calendar.tsx";
import TimeSlot from "./TimeSlot.tsx";
import { Doctor, MockDoctor, TimeSlotData } from "../types/type";
import { appointmentActions } from "../context/AppointmentSlice.tsx";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store.tsx";
import AppConfig from "../config/AppConfig.tsx";

//=== Styling ===//

const mobileBreakpoint = "768px"; 

const DateTimeHeader = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
  padding: 10px 0;
  margin-bottom: 0;
  @media (max-width: ${mobileBreakpoint}) {
    font-size: 20px;
  }
`;

// Align the tops of CalendarWrapper and TimeSlotWrapper using align-items
const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden; // Hide overflow,
  margin: auto;
  width: auto;
  max-width: 1200px; // Set a max-width to prevent the card from stretching too wide
  display: flex;
  flex-direction: column;
  justify-content: flex-start; // Align content to the top
  height: auto; // Auto height to contain all content
  @media (max-width: ${mobileBreakpoint}) {
    margin-bottom: 0;
  }
`;

const DateTimeSelectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: flex-start;
  padding: 20px;
  @media (max-width: ${mobileBreakpoint}) {
    flex-direction: column;
    gap: 5px; // Reduce gap to save space
    padding: 10px; // Reduce padding to save space
  }
`;

const CalendarWrapper = styled.div`
  flex: 1;
  @media (max-width: ${mobileBreakpoint}) {
    order: 2; // Move calendar below time slots on small screens
  }
`;

const TimeSlotWrapper = styled.div`
  flex: 1;
  @media (max-width: ${mobileBreakpoint}) {
    order: 1; // Move time slots above calendar on small screens
  }
`;

const ConfirmButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  @media (max-width: ${mobileBreakpoint}) {
    padding: 10px; // Reduce padding to save space
  }
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
    width: 100%; // Full width button on small screens
    padding: 15px 30px; // Larger touch area for mobile
  }
`;

// Adjust the height of the TimeSlotContainer to ensure it does not cause scrolling
const TimeSlotContainer = styled.div`
  flex: 1;
  overflow-y: auto; // Scroll inside TimeSlotContainer if needed
  // Other styles...
  @media (max-width: ${mobileBreakpoint}) {
    height: auto; // Adjust height on mobile to prevent scrolling
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
  selectedDoctor: Doctor;
  onDateTimeConfirmed: (date: Date, timeSlot: TimeSlotData) => void; // Updated to use TimeSlotData
  onNextStep: () => void;
}

//=== Component ===//

const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({ selectedDoctor, onDateTimeConfirmed, onNextStep }) => {
	const dispatch = useDispatch();
	const selectedDate = useSelector((state: RootState) => state.appointment.selectedDate);
	const selectedTimeSlot = useSelector((state: RootState) => state.appointment.selectedTimeSlot);
	const [weeklyAvailability, setWeeklyAvailability] = useState({});
	const [isLoadingTimeSlots, setIsLoadingTimeSlots] = useState(false);
	const [unavailableDates, setUnavailableDates] = useState([]); // Initialize unavailable dates state
	  

	useEffect(() => {
		const fetchDoctorAvailability = async () => {
		  if (!selectedDoctor || !selectedDate) return;
		  setIsLoadingTimeSlots(true);
		  const dayOfWeek = convertDateToDayOfWeek(selectedDate); // Convert selected date to day of the week
	  
		  try {
				// Fetch available time slots for the selected doctor and date
				const response = await fetch(`${AppConfig.apiDoctorAvailabilityUrl}?doctorId=${selectedDoctor.id}&day=${dayOfWeek}`);
				if (!response.ok) throw new Error("Failed to fetch doctor availability");
	  
				const timeSlotsFromBackend = await response.json();
				console.log("Fetched time slots:", timeSlotsFromBackend);
				const transformedTimeSlots = timeSlotsFromBackend.map(slot => {
			  // Convert start and end time to a more readable format
			  const startTimeDate = new Date(slot.startTime[0], slot.startTime[1] - 1, slot.startTime[2], slot.startTime[3], slot.startTime[4]);
			  const endTimeDate = new Date(slot.endTime[0], slot.endTime[1] - 1, slot.endTime[2], slot.endTime[3], slot.endTime[4]);
			  const startTimeStr = startTimeDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
			  const endTimeStr = endTimeDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });

			  // Return the transformed time slot
	  
			  return {
						id: slot.id.toString(),
						label: `${startTimeStr} - ${endTimeStr}`,
						startTime: startTimeStr,
						endTime: endTimeStr,
			  };
				});
	  
				// Update the state with the transformed time slots
				setWeeklyAvailability({ [dayOfWeek.toUpperCase()]: transformedTimeSlots });
		  } catch (error) {
				console.error("Error fetching doctor availability:", error);
				setWeeklyAvailability({});
		  } finally {
				setIsLoadingTimeSlots(false);
		  }
		};
	  
		fetchDoctorAvailability();
	  }, [selectedDoctor, selectedDate]); 
	


	const getAvailableTimeSlotsForDate = (date) => {
		if (!date || !weeklyAvailability) return []; // Return empty array if date or weeklyAvailability is not available
		const dayOfWeek = convertDateToDayOfWeek(date).toUpperCase(); // Convert selected date to day of the week
		console.log(`Fetching slots for: ${dayOfWeek}, Available days:`, Object.keys(weeklyAvailability));
		
		return weeklyAvailability[dayOfWeek] || []; // Return available slots for the selected day
	};

	// Function to convert date to day of the week

	const convertDateToDayOfWeek = (date) => {
		const daysOfWeek = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
		return daysOfWeek[date.getDay()];
	};

	// Function to handle date selection

	const handleDateSelection = (selectedDate: Date) => {
		dispatch(appointmentActions.setSelectedDate(selectedDate));
	};

	// Function to handle time slot selection

	const handleTimeSlotSelection = (timeSlot: TimeSlotData) => {
		dispatch(appointmentActions.setSelectedTimeSlot(timeSlot));
	};

	// Function to handle confirm date and time

	const handleConfirmDateTime = () => {
		if (selectedDate && selectedTimeSlot) {
			onDateTimeConfirmed(selectedDate, selectedTimeSlot);
		} else {
			alert("Please select both a date and a time slot.");
		}
	};

	return (
		<Card>
			<DateTimeHeader>Select a Date and Time</DateTimeHeader>
			<DateTimeSelectionContainer>
				<CalendarWrapper>
					<Calendar selectedDate={selectedDate} setSelectedDate={handleDateSelection} />
				</CalendarWrapper>
				{selectedDate && (
					<TimeSlotWrapper>
						{isLoadingTimeSlots ? (
							<p>Loading available time slots...</p>
						) : (
							<TimeSlot
								selectedDate={selectedDate}
								selectedDoctor={selectedDoctor}
								setSelectedTimeSlot={handleTimeSlotSelection}
								isDateSelected={!!selectedDate}
								timeSlots={getAvailableTimeSlotsForDate(selectedDate)} //dynamically fetched time slots
							/>
						)}
					</TimeSlotWrapper>
				)}
			</DateTimeSelectionContainer>
			<ConfirmButtonContainer>
				<ConfirmButton onClick={handleConfirmDateTime}>Confirm</ConfirmButton>
			</ConfirmButtonContainer>
		</Card>
	);
};

export default DateTimeSelection;
