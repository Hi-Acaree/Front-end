import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button,  } from "react-bootstrap";
import styled from "styled-components";

const CalendarContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 800px; // Adjust as needed
    margin: auto;
    padding: 20px;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CalendarHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    font-size: 1.5rem;
`;

const CalendarBody = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    width: 100%;
    .fc {
        width: 100%; // FullCalendar class
        max-width: 100%; // Ensure it doesn't exceed the container
    }
`;

const CalendarFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px;
    button {
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 8px 12px;
        &:hover {
            background-color: #388e3c;
        }
    }
`;






interface CalendarProps {
    selectedDate: Date,
    setSelectedDate: (selectedDate: Date) => void,
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, setSelectedDate }) => {
	return (
		<CalendarContainer>
			<CalendarHeader>
				{/* Calendar header */}
				<h2>Calendar</h2>
			</CalendarHeader>
			<CalendarBody>
				{/* Calendar body */}
				<FullCalendar
					plugins={[dayGridPlugin, interactionPlugin]}
					initialView="dayGridMonth"
					dateClick={(e) => setSelectedDate(new Date(e.dateStr))}
					events={[
						{ title: "event 1", date: "2021-08-01" },
						{ title: "event 2", date: "2021-08-02" },
					]}
				/>
			</CalendarBody>
			<CalendarFooter>
				{/* Calendar footer */}
				<Button variant="primary">Primary</Button>
			</CalendarFooter>
		</CalendarContainer>
	);
};

export default Calendar;
