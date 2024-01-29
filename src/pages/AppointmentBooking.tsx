/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import DoctorList from "../components/DoctorList.tsx";
import { Doctor, MockDoctor } from "../types/type";
import Header from "../components/Header.tsx";
import AppointmentTypeOverlay from "../components/AppointmentTypeOverlay.tsx";
import DateTimeSelection from "../components/DateTimeSelection.tsx";
import AppointmentMessageInput from "../components/AppointmentMsgInput.tsx";
import BookingConfirmation from "../components/BookingConfirmation.tsx";
import { appointmentActions } from "../context/AppointmentSlice.tsx";
import { RootState } from "../context/store.tsx";

import { bo } from "@fullcalendar/core/internal-common";


const AppointmentBookingContainer = styled.div`
    display: flex;
    height: 100vh;
`;

const MainContent = styled.div`
    flex-grow: 1;
    padding: 60px; /* Adjust padding based on Header height */
    background-color: #f5f5f5;
`;


// const DoctorListStyled = styled(DoctorList)`
// flex: 1; // Keep the existing flex properties
// overflow-y: auto; // Keep the existing scroll property
// display: grid; // Set display to grid
// grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); // Adjust the number of columns based on the container's width
// grid-gap: 20px; // Set the gap between grid items
// padding: 10px; // Add some padding around the grid
// `;

const BookingContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 20px;
    height: calc(100vh - 120px); // Account for the header and footer
    overflow: auto; // Hide overflow
	width: 100%;
`;


/**
 * 
 * @returns {React.FC} - React component
 * @see DoctorList
 * @see AppointmentTypeOverlay
 * @see DateTimeSelection
 * @see AppointmentMessageInput
 * @see BookingConfirmation
 * @see Header
 * @see AppointmentBookingContainer
 * @see MainContent
 * @see BookingContent
 * 
 */
  


const AppointmentBookingPage: React.FC = () => {

	/**
	 * dispatch is a function provided by the react-redux library for dispatching actions to the store (i.e., updating the state)
	 * useSelector is a function provided by the react-redux library for selecting data from the store (i.e., reading the state)
	 * RootState is the type of the root state of the store (i.e., the type of the state object in the store) @see src/context/store.tsx
	 * 
	 */

	const dispatch = useDispatch();
	const selectedDoctor = useSelector((state: RootState) => state.appointment.selectedDoctor);
	const bookingStep = useSelector((state: RootState) => state.appointment.bookingStep);
	const appointmentType = useSelector((state: RootState) => state.appointment.appointmentType);
	const selectedDate = useSelector((state: RootState) => state.appointment.selectedDate);
	const selectedTimeSlot = useSelector((state: RootState) => state.appointment.selectedTimeSlot);
	const appointmentMsg = useSelector((state: RootState) => state.appointment.appointmentMsg);

	console.log("Current Booking Step:", bookingStep);
	const state = useSelector((state: RootState) => state);
	console.log(state);



	const handleMockDoctorSelect = (mockDoctor: MockDoctor) => {
		dispatch(appointmentActions.setSelectedDoctor(mockDoctor));
		dispatch(appointmentActions.setBookingStep("appointmentType"));
	};

	

	const handleTypeSelect = (type: string) => {
		dispatch(appointmentActions.setAppointmentType(type));
		dispatch(appointmentActions.setBookingStep("dateTimeSelection"));
	};

	const handleDateTimeSelect = (date: Date, timeSlot: string) => {
		dispatch(appointmentActions.setSelectedDate(date));
		dispatch(appointmentActions.setSelectedTimeSlot(timeSlot));
		dispatch(appointmentActions.setBookingStep("appointmentMessage"));
	};

	const handleAppointmentSubmitMsg = (msg: string) => {
		dispatch(appointmentActions.setAppointmentMsg(msg));
		dispatch(appointmentActions.setBookingStep("confirmation"));
	};

	// const state = useSelector((state: AppointmentState) => state);
	// console.log(state);

	console.log("Current Booking Step:", bookingStep);
	


	/**
	 *  Implements the following logic:
	 * - If bookingStep is "doctorList", render the DoctorList component
	 * - If bookingStep is "appointmentType", render the AppointmentTypeOverlay component
	 * - If bookingStep is "dateTimeSelection", render the DateTimeSelection component
	 * - If bookingStep is "appointmentMessage", render the AppointmentMessageInput component
	 * - If bookingStep is "confirmation", render the BookingConfirmation components.
	 */
	return (
		<AppointmentBookingContainer>
			<MainContent>
				<Header />
				<BookingContent>
					{bookingStep === "doctorList" && (<DoctorList onSelectMockDoctor={handleMockDoctorSelect} />)}

					{bookingStep === "appointmentType" && (
						<AppointmentTypeOverlay onTypeSelect={handleTypeSelect} />
					)}
					{bookingStep === "dateTimeSelection" && selectedDoctor && (
						<DateTimeSelection
							selectedDoctor={selectedDoctor}
							onDateTimeConfirmed={handleDateTimeSelect}
							onNextStep={() => dispatch(appointmentActions.setBookingStep("appointmentMessage"))}
						/>
					)}
					{bookingStep === "appointmentMessage" && (
						<AppointmentMessageInput
							onMessageSubmit={handleAppointmentSubmitMsg}
							onNextStep={() => dispatch(appointmentActions.setBookingStep("appointmentMessage"))}
						/>
					)}

					{bookingStep === "confirmation" && selectedDoctor && (
						<BookingConfirmation
							selectedDoctor={selectedDoctor}
							appointmentType={appointmentType}
							selectedDate={selectedDate}
							selectedTimeSlot={selectedTimeSlot}
							appointmentMsg={appointmentMsg}
							onConfirm={() => {
								// booking confirmation logic
								console.log("Booking confirmed");
								// show confirmation message
							}}
							onCancel={() => {
								// booking cancellation logic
								console.log("Booking cancelled");
								appointmentActions.setBookingStep("doctorList");
							}}
						/>
					)}


					{/* Other cases ... */}
				</BookingContent>
			</MainContent>
		</AppointmentBookingContainer>
	);
};

export default AppointmentBookingPage;
