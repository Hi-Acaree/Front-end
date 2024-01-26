import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppointmentBookingPage from  "./pages/AppointmentBooking.tsx";
import "bootstrap/dist/css/bootstrap.min.css";


interface AppProps {
    // props
    //booking props
    booking: {
        doctors: {
            id: string;
            name: string;
            specialization: string;
            departmentName: string;
            imageUrl: string;
        }[];
        selectedDoctor: {
            id: string;
            name: string;
            specialization: string;
            departmentName: string;
            imageUrl: string;
        } | null;
        selectedDate: Date;
        selectedTimeSlot: string | null;
    };
    }

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<AppointmentBookingPage />} />

				{/* ...other routes */}
			</Routes>
		</Router>
	);
};

export default App;
