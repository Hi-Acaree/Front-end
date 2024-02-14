import React from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";

// Styled components
const StyledModalHeader = styled(Modal.Header)`
  background-color: #007bff; // Bootstrap primary color
  color: white;
`;

const StyledModalTitle = styled(Modal.Title)`
  margin: auto;
`;

const StyledModalBody = styled(Modal.Body)`
  background-color: #f8f9fa; // A light gray background
  color: #343a40; // Dark gray text for contrast
`;

const StyledModalFooter = styled(Modal.Footer)`
  background-color: #f8f9fa;
  justify-content: center; // Center the button
`;

const CloseButton = styled.button`
  background-color: #28a745; // Bootstrap success color
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #218838; // A darker green for hover effect
  }
`;

interface BookingSuccessProps {
    show: boolean;
    onClose: () => void;
}

const BookingSuccess: React.FC<BookingSuccessProps> = ({ show, onClose }) => {
	return (
		<Modal show={show} onHide={onClose} centered>
			<StyledModalHeader closeButton>
				<StyledModalTitle>Booking Success</StyledModalTitle>
			</StyledModalHeader>
			<StyledModalBody>
				<p>Your booking has been successfully scheduled.</p>
			</StyledModalBody>
			<StyledModalFooter>
				<CloseButton onClick={onClose}>
                    Close
				</CloseButton>
			</StyledModalFooter>
		</Modal>
	);
};

export default BookingSuccess;
