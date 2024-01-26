import React, { useState } from "react";
import styled from "styled-components";
import DoctorList from "../components/DoctorList.tsx";
import Calendar from "../components/Calendar.tsx";
import TimeSlot from "../components/TimeSlot.tsx";
import { Doctor, MockDoctor } from "../types/type";
import SideBar from "../components/SideBar.tsx";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

const AppointmentBookingContainer = styled.div`
    display: flex;
    height: 100vh;
`;

const MainContent = styled.div`
    flex-grow: 1;
    padding: 60px; /* Adjust padding based on Header height */
    background-color: #f5f5f5;
`;


const DoctorListStyled = styled(DoctorList)`
    flex: 1; // Take up the available space
    overflow-y: auto; // Scroll if content overflows
    // Ensure no additional padding or margin is interfering
`;

const BookingContent = styled.div`
    display: flex;
    flex-direction: row; // Ensure this is row for a horizontal layout
    gap: 20px;
    margin: 20px;
    height: calc(100vh - 120px); // Account for the header and footer
    overflow: hidden; // Hide overflow
`;


const AppointmentScheduling = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2;
    overflow-y: auto; // Allows scrolling within AppointmentScheduling if content overflows
`;


const AppointmentBookingPage: React.FC = () => {
	// ... existing state and functions

	const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
	const [selectedMockDoctor, setSelectedMockDoctor] = useState<MockDoctor | null>(null);

	return (
		<AppointmentBookingContainer>
			<SideBar />
			<MainContent>
				<Header />
				<BookingContent>
					<DoctorListStyled onSelectMockDoctor={setSelectedMockDoctor} onSelectDoctor={setSelectedDoctor} />
					<AppointmentScheduling>
						<Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
						{selectedDoctor && (
							<TimeSlot 
								selectedDate={selectedDate} 
								selectedDoctor={selectedDoctor} 
								setSelectedTimeSlot={setSelectedTimeSlot} 
							/>
						)}
					</AppointmentScheduling>
				</BookingContent>
			</MainContent>
		</AppointmentBookingContainer>
	);
};

export default AppointmentBookingPage;

