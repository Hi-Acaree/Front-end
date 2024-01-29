import { configureStore } from "@reduxjs/toolkit";
import appointmentReducer from "../context/AppointmentSlice.tsx"; // Update the path as needed
import { AppointmentState } from "../types/type";

// Define the structure of the entire Redux state
export interface RootState {
  appointment: AppointmentState; 
  // ...other reducers
}

// Configure the Redux store
const store = configureStore({
	reducer: {
		appointment: appointmentReducer,
	},
});

export default store;
