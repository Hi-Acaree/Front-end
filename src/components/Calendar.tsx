import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import "./calendar.css";
import { appointmentActions } from "../context/AppointmentSlice.tsx";
import { Card, Button } from "react-bootstrap";

/**
 * Calendar component
 * @param {Date} selectedDate - The selected date
 * @param {function} setSelectedDate - Callback function to set the selected date
 * @returns {JSX.Element} - Calendar component
 */

//=== Component Props ===//
interface CalendarProps {
    selectedDate: Date | null,
    setSelectedDate: (selectedDate: Date) => void,
}

interface Event {
	title: string;
	start: Date;
	allDay: boolean;
	classNames: string[];
  }

const Calendar: React.FC<CalendarProps> = ({ selectedDate, setSelectedDate }) => {
	const calendarRef = useRef<FullCalendar>(null); // Create a ref to the calendar

	const [events, setEvents] = useState<Event[]>([]); // Use the Event type for the events state
	const [unavailableDates, setUnavailableDates] = useState<Event[]>([]); // Use the Event type for the unavailable dates state


	const dispatch = useDispatch(); // Get the dispatch function from the Redux store

	const [currentDate, setCurrentDate] = useState(new Date()); 

	useEffect(() => {
		if (selectedDate) {
			setEvents([
				{ title: "",
					start: selectedDate,
					allDay: true,
					classNames: [".fc-day-selected"]
				}
			]);
		}
		
		if (calendarRef.current && selectedDate) {
			const calendarApi = calendarRef.current.getApi();
			calendarApi.gotoDate(selectedDate);
		}
	}, [selectedDate]); // Removed calendarRef from the dependency array
	
	useEffect(() => {
		const handleResize = () => { if (calendarRef.current) {
			const calendarApi = calendarRef.current.getApi();
			calendarApi.setOption("height", "auto");
		}
		};
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []); // Empty dependency array to run once on mount

	useEffect(() => {
		navigateToToday();
	}, []); // Run the effect whenever the currentDate changes


	
	useEffect(() => {
		const generatedUnavailableDates = generateUnavailableDates();
		setUnavailableDates(generatedUnavailableDates);
	}, []); // Empty dependency array to run once on mount

	// Function to generate unavailable dates
	
	const generateUnavailableDates = (): Event[] => {
		const dates: Event[] = []; // Define the type of the array as Event[]
		const today = new Date();
		today.setHours(0, 0, 0, 0);
	
		// Generate unavailable dates for all past dates up to the current date
		const d = new Date(today.getFullYear(), today.getMonth(), 1);
		while (d < today) {
			dates.push({
				title: "",
				start: new Date(d),
				allDay: true,
				classNames: ["unavailable-date"]
			});
			d.setDate(d.getDate() + 1);
		}
	
		return dates;
	};
	
	

	const handleDateClick = (arg) => { 
		const clickedDate = arg.date; // Get the date that was clicked

		if (isPastDate(clickedDate)) {
			alert("This date is not available for booking. Please select another date.");
			return;
		}

		if(calendarRef.current) {
			document.querySelectorAll(".fc-daygrid-day").forEach((day) => {
				day.classList.remove("fc-day-selected");
			});
			// Add the selected class to the clicked date
			arg.dayEl.classList.add("fc-day-selected");
		}

		setSelectedDate(clickedDate);
		dispatch(appointmentActions.setSelectedDate(clickedDate));
	};
    
	// Function to navigate to today's date
	const navigateToToday = () => {
		const today = new Date(); // Get today's date
		setSelectedDate(today);
		dispatch(appointmentActions.setSelectedDate(today));

		// If the calendar ref is available, navigate to today's date
		if (calendarRef.current) {
			const calendarApi = calendarRef.current.getApi(); // Get the calendar API
			calendarApi.gotoDate(today); // Navigate to today's date
		}
	};

	// Function to navigate to the previous or next month
	const navigate = (direction: "prev" | "next") => {
		if (calendarRef.current) {
			const calendarApi = calendarRef.current.getApi(); // Get the calendar API
			direction === "prev" ? calendarApi.prev() : calendarApi.next(); // Navigate to the previous or next month
			setCurrentDate(calendarApi.getDate()); // Update the current date
		}
	};

	// function to determine past dates 
	const isPastDate = (date: Date) => {
		const today = new Date(); // Get today's date
		today.setHours(0, 0, 0, 0); // Set the time to the beginning of the day (midnight)
		return date < today; // Return true if the date is in the past, false otherwise
	};

	return (
		<Card className="custom-calendar-card shadow-sm mb-4">
			<Card.Header className="bg-success text-white">
				<h2 className="mb-0">Calendar</h2>
			</Card.Header>
			<Card.Body>
				<FullCalendar
					ref={calendarRef}
					plugins={[dayGridPlugin, interactionPlugin]}
					initialView="dayGridMonth"
					showNonCurrentDates={false}
					dateClick={handleDateClick}
					events={[...events, ...unavailableDates]}
					
				/>
			</Card.Body>
			<Card.Footer className="d-flex justify-content-between">
				<Button variant="outline-success" onClick={() => navigate("prev")}>
              Prev
				</Button>
				<Button variant="success" onClick={navigateToToday}>
              Today
				</Button>
				<Button variant="outline-success" onClick={() => navigate("next")}>
              Next
				</Button>
			</Card.Footer>
		</Card>
	);
};
    
export default Calendar;