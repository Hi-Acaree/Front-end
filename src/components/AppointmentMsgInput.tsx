import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../context/store";
import { AppointmentBookingDTO } from "../types/type";

//=== Styling ===//
const MessageInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 40px auto;
`;

const Heading = styled.h1`
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #555;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 20px;
  margin-bottom: 30px;
  border: 2px solid #ddd;
  border-radius: 25px;
  box-sizing: border-box;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    border-color: #4caf50;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 20px;
  margin-bottom: 30px;
  border: 2px solid #ddd;
  border-radius: 25px;
  resize: none;
  min-height: 150px;
  box-sizing: border-box;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    border-color: #4caf50;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 15px 30px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 1rem;
  transition: background-color 0.2s, box-shadow 0.2s;
  align-self: center;

  &:hover {
    background-color: #388e3c;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    background-color: #357a38;
  }
`;

/**
 * AppointmentMessageInput component
 * @param {function} onMessageSubmit - Callback function to submit the message
 * @returns {JSX.Element} - AppointmentMessageInput component
 */

interface AppointmentMessageInputProps {
  onMessageSubmit: (bookingDTO: AppointmentBookingDTO) => void;
  onNextStep?: () => void;
}

const AppointmentMessageInput: React.FC<AppointmentMessageInputProps> = ({
	onMessageSubmit,
}) => {
	const [email, setEmail] = useState("");
	const [patientName, setPatientName] = useState("");
	const [reason, setReason] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	// Get the selected doctor, time slot, and date from the Redux store
	const selectedDoctor = useSelector((state: RootState) => state.appointment.selectedDoctor);
	const selectedTimeSlot = useSelector((state: RootState) => state.appointment.selectedTimeSlot);
	const selectedDate = useSelector((state: RootState) => state.appointment.selectedDate);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setIsLoading(true);
		setError("");

		// Check if selectedDoctor and selectedTimeSlot are not undefined
		if (!selectedDoctor || !selectedTimeSlot) {
			setError("Doctor and time slot must be selected.");
			setIsLoading(false);
			return;
		}

		const bookingDTO: AppointmentBookingDTO = {
			date: selectedDate ? selectedDate : null,
			doctorId: selectedDoctor.id.toString(),
			email: email,
			patientName: patientName,
			timeSlotId: selectedTimeSlot.id.toString(),
			reason: reason,
		};

		onMessageSubmit(bookingDTO);
		setIsLoading(false);
	};

	return (
		<MessageInputContainer>
			<Heading>Book a Consultation</Heading>
			<form onSubmit={handleSubmit}>
				<Label htmlFor="email">Email Address</Label>
				<Input
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<Label htmlFor="patientName">Patient Name</Label>
				<Input
					id="patientName"
					type="text"
					value={patientName}
					onChange={(e) => setPatientName(e.target.value)}
					required
				/>
				<Label htmlFor="reason">Reason for Consultation</Label>
				<Input
					id="reason"
					type="text"
					placeholder="Reason for appointment"
					value={reason}
					onChange={(e) => setReason(e.target.value)}
					required
				/>
				<SubmitButton type="submit" disabled={isLoading}>
					{isLoading ? "Submitting..." : "Submit"}
				</SubmitButton>
				{error && <p style={{ color: "red" }}>{error}</p>}
			</form>
		</MessageInputContainer>
	);
};


export default AppointmentMessageInput;
