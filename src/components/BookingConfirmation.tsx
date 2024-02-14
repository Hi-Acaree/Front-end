import React from "react";
import styled from "styled-components";
import { Doctor, MockDoctor } from "../types/type";

//== Styling ==//

const ConfirmationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border: none;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 40px auto;
`;

const ConfirmationTitle = styled.h2`
  font-size: 1.5rem;
  color: #4caf50;
  margin-bottom: 20px;
`;

const ConfirmationDetail = styled.p`
  font-size: 1rem;
  color: #333;
  margin: 10px 0;
  & > span {
    font-weight: 500; // Make key information bold
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
`;

const Button = styled.button`
  padding: 12px 25px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s;
  
  &:hover, &:focus {
    background-color: #388e3c;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &[data-type="cancel"] {
    background-color: #f44336;
    &:hover, &:focus {
      background-color: #d32f2f;
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; // Ensure it's above everything else
`;

const Modal = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1001; // Above the overlay
`;

const ModalTitle = styled.h3`
  color: #4caf50;
  text-align: center;
`;

const ModalButton = styled(Button)`
  display: block;
  width: 100%;
  margin-top: 20px;
`;

/**
 * Component props
 * @interface BookingConfirmationProps
 * @property {MockDoctor} selectedDoctor - The selected doctor
 * @property {string} appointmentType - The type of appointment
 * @property {Date} selectedDate - The selected date
 * @property {string} selectedTimeSlot - The selected time slot
 * @property {string} appointmentMsg - The appointment message
 * @property {function} onConfirm - Callback function when the booking is confirmed
 * @property {function} onCancel - Callback function when the booking is cancelled
 * @returns {ReactElement}
 */

//== Component props ==//

interface BookingConfirmationProps {
  doctorName: string;
  appointmentType: string; 
  selectedDate: Date | null;
  reason: string;
  email: string;
  onConfirm: () => void;
  onCancel: () => void;
}

//== Component ==//
const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
	doctorName,
	appointmentType,
	selectedDate,
	reason,
	email,
	onConfirm,
	onCancel,
}) => {
	return (
		<ConfirmationContainer>
			<ConfirmationTitle>Booking Confirmation</ConfirmationTitle>
			<ConfirmationDetail><span>Doctor:</span> {doctorName}</ConfirmationDetail>
			<ConfirmationDetail><span>Appointment Type:</span> {appointmentType}</ConfirmationDetail>
			<ConfirmationDetail><span>Date:</span> {selectedDate?.toDateString()}</ConfirmationDetail>
			<ConfirmationDetail><span>Reason:</span> {reason}</ConfirmationDetail>
			<ConfirmationDetail><span>Email:</span> {email}</ConfirmationDetail>
			<ButtonGroup>
				<Button onClick={onConfirm}>Confirm Booking</Button>
				<Button onClick={onCancel}>Cancel</Button>
			</ButtonGroup>
		</ConfirmationContainer>
	);
};

export default BookingConfirmation;