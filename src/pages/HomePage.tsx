import React from "react";
import styled from "styled-components";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f0f4f8; // A light background color for the main content area
  padding: 20px;
`;

const Title = styled.h1`
  color: #333; // Dark text color for contrast
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  color: #666; // Lighter text color for the subtitle
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 30px;
`;

const BookAppointmentButton = styled.button`
  background-color: #007bff; // A nice blue shade for the button
  color: white;
  font-size: 1rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3; // Darken the button a bit on hover
  }
`;

const HomePage: React.FC = () => {

	const navigate = useNavigate(); 

	const redirectToBookingPage = () => {
		navigate("/appointment"); // Navigate to the booking page
	};
	return (
		<PageContainer>
			<Header />
			<MainContent>
				<Title>Welcome to Acaree Appointment Booking Website</Title>
				<Subtitle>Book your next appointment with ease and speed</Subtitle>
				<BookAppointmentButton onClick={redirectToBookingPage}>Book Appointment</BookAppointmentButton>
			</MainContent>
			<Footer />
		</PageContainer>
	);
};

export default HomePage;
