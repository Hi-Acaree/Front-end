import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MockDoctor, AppointmentState } from "../types/type";


// Define the initial state
const initialState: AppointmentState = {
	selectedDoctor: null,
	appointmentType: "",
	selectedDate: null,
	selectedTimeSlot: "",
	appointmentMsg: "",
	bookingStep: "doctorList",
	loading: false,
};

// Create the slice
const appointmentSlice = createSlice({
	name: "appointment",
	initialState,
	reducers: {
		setSelectedDoctor(state, action: PayloadAction<MockDoctor | null>) {
			state.selectedDoctor = action.payload;
		},
		setAppointmentType(state, action: PayloadAction<string>) {
			state.appointmentType = action.payload;
		},
		setSelectedDate(state, action: PayloadAction<Date>) {
			state.selectedDate = action.payload;
		},
		setSelectedTimeSlot(state, action: PayloadAction<string>) {
			state.selectedTimeSlot = action.payload;
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
	},
});

// Export the actions
export const appointmentActions = appointmentSlice.actions;

// Export the reducer
export default appointmentSlice.reducer;
