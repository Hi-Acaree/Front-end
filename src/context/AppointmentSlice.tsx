import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MockDoctor, AppointmentState, Doctor, TimeSlotData, AppointmentBookingDTO } from "../types/type";


// Define the initial state
const initialState: AppointmentState = {
	selectedDoctor: null,
	appointmentType: "",
	selectedDate: null,
	selectedTimeSlot: null,
	bookingDTO: null,
	appointmentMsg: "",
	bookingStep: "doctorList",
	loading: false,
	bookingSuccess: false,
	
};

// Create the slice
const appointmentSlice = createSlice({
	name: "appointment",
	initialState,
	reducers: {
		setSelectedDoctor(state, action: PayloadAction<Doctor | null>) {
			state.selectedDoctor = action.payload;
		},
		setAppointmentType(state, action: PayloadAction<string>) {
			state.appointmentType = action.payload;
		},
		setSelectedDate(state, action: PayloadAction<Date>) {
			state.selectedDate = action.payload;
		},
		setSelectedTimeSlot(state, action: PayloadAction<TimeSlotData | null>) {
			state.selectedTimeSlot = action.payload;
		},
		setBookingDTO(state, action: PayloadAction<AppointmentBookingDTO | null> ){
			state.bookingDTO = action.payload;

		},
		setAppointmentMsg(state, action: PayloadAction<string>) {
			state.appointmentMsg = action.payload;
		},
		setBookingStep(state, action: PayloadAction<string>) {
			state.bookingStep = action.payload;
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.loading = action.payload;
		},
		setBookingSuccess(state, action: PayloadAction<boolean>) {
			state.bookingSuccess = action.payload;
		},
	},
});

// Export the actions
export const appointmentActions = appointmentSlice.actions;

// Export the reducer
export default appointmentSlice.reducer;
