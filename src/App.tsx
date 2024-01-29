import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppointmentBookingPage from  "./pages/AppointmentBooking.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

//== main App component ==//



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
