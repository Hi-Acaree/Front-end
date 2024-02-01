import React from "react";
import { Modal, Button } from "react-bootstrap";

/**
 * AppointmentTypeOverlay component
 * @param {function} onTypeSelect - Callback function when a type is selected
 * @returns {JSX.Element} - Modal to select appointment type
 * 
 */

//=== Component Props ===//

interface AppointmentTypeOverlayProps {
  onTypeSelect: (type: "virtual" | "inPerson") => void;
}

//=== Component ===//

const AppointmentTypeOverlay: React.FC<AppointmentTypeOverlayProps> = ({ onTypeSelect }) => {
	return (
		<Modal show={true} onHide={undefined} centered>
			<Modal.Header>
				<Modal.Title>Select Appointment Type</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Button variant="success" className="d-block mb-2 w-100" onClick={() => onTypeSelect("virtual")}>
            Virtual Appointment
				</Button>
				<Button variant="success" className="d-block w-100" onClick={() => onTypeSelect("inPerson")}>
            In-Person Appointment
				</Button>
			</Modal.Body>
		</Modal>
	);
};
  
export default AppointmentTypeOverlay;
