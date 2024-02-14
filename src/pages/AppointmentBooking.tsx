/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import DoctorList from "../components/DoctorList.tsx";
import { AppointmentBookingDTO, Doctor, MockDoctor, TimeSlotData } from "../types/type";
import Header from "../components/Header.tsx";
import AppointmentTypeOverlay from "../components/AppointmentTypeOverlay.tsx";
import DateTimeSelection from "../components/DateTimeSelection.tsx";
import AppointmentMessageInput from "../components/AppointmentMsgInput.tsx";
import BookingConfirmation from "../components/BookingConfirmation.tsx";
import { appointmentActions } from "../context/AppointmentSlice.tsx";
import { RootState } from "../context/store.tsx";
import Footer from "../components/Footer.tsx";
import AppConfig from "../config/AppConfig.tsx";

//== Styling ==//

const AppointmentBookingContainer = styled.div`
  display: flex;
  flex-direction: column; // Stack children vertically
  min-height: 100vh; // Use min-height to fill the screen but allow extension
`;

const MainContent = styled.div`
  flex-grow: 1; // Grow to take available space
  padding: 60px; // Adjust padding based on Header height
  background-color: #f5f5f5;
  overflow: auto; // Scroll inside MainContent if needed
`;

const BookingContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px;
  // Remove the height constraint to allow Footer to fit
  overflow: auto; // Scroll inside BookingContent if needed
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
	const bookingDetails = useSelector((state: RootState)=> state.appointment.bookingDTO);


	console.log("Current Booking Step:", bookingStep);
	const state = useSelector((state: RootState) => state);
	console.log(state);



	const handleMockDoctorSelect = (doctor: Doctor) => {
		dispatch(appointmentActions.setSelectedDoctor(doctor));
		dispatch(appointmentActions.setBookingStep("appointmentType"));
	};

	

	const handleTypeSelect = (type: string) => {
		dispatch(appointmentActions.setAppointmentType(type));
		dispatch(appointmentActions.setBookingStep("dateTimeSelection"));
	};

	const handleDateTimeSelect = (date: Date, timeSlot: TimeSlotData) => {
		dispatch(appointmentActions.setSelectedDate(date));
		dispatch(appointmentActions.setSelectedTimeSlot(timeSlot));
		dispatch(appointmentActions.setBookingStep("appointmentMessage"));
	};

	// handleAppointmentSubmitMsg function
	const handleAppointmentSubmitMsg = (bookingDetails: AppointmentBookingDTO) => {
		// Here, instead of making an API call, we store the bookingDetails in the state
		// and proceed to the confirmation step
		dispatch(appointmentActions.setBookingDTO(bookingDetails));
		dispatch(appointmentActions.setBookingStep("confirmation"));
	};

	// getDoctorNameById function
	const getDoctorNameById = (selectedDoctor) => {
		return selectedDoctor ? `${selectedDoctor.personDetails.firstName} ${selectedDoctor.personDetails.lastName}` : "Unknown Doctor";
	};
  




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
						/>
					)}

					{bookingStep === "confirmation" && bookingDetails && (
						<BookingConfirmation
							doctorName={getDoctorNameById(selectedDoctor)}
							appointmentType={appointmentType} 
							selectedDate={selectedDate ? selectedDate : null}
							reason={bookingDetails.reason}
							email={bookingDetails.email}
							onConfirm={
								async () => {
									const bookingApiUrl = `${AppConfig.apiAppointmentBaseUrl}/book/appointment`;
									const bookingDTO = {
										doctorId: bookingDetails.doctorId,
										email: bookingDetails.email,
										patientName: bookingDetails.patientName,
										timeSlotId: bookingDetails.timeSlotId,
										reason: bookingDetails.reason,

									};
									try {
									  const response = await fetch(bookingApiUrl, {
											method: "POST",
											headers: {
										  "Content-Type": "application/json",
											},
											body: JSON.stringify(
												bookingDTO

											),
									  });
							  
									  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
							  
									  console.log("Booking confirmed");
									  dispatch(appointmentActions.setBookingStep("doctorList"));
									} catch (error) {
									  console.error("Error confirming booking:", error);
									}
								
								}}
							onCancel={() => {
								console.log("Booking cancelled");
								dispatch(appointmentActions.setBookingStep("doctorList"));
							}}
						/>
					)}



					{/* Other cases ... */}
				</BookingContent>
			</MainContent>
			<Footer />
		</AppointmentBookingContainer>
	);
};

export default AppointmentBookingPage;
