import React, { useState } from "react";
import styled from "styled-components";

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

//=== Component props ===//
interface AppointmentMessageInputProps {
  onMessageSubmit: (email: string, reason: string, message: string) => void;
}

//=== Component ===//
const AppointmentMessageInput: React.FC<AppointmentMessageInputProps> = ({
	onMessageSubmit,
}) => {
	const [email, setEmail] = useState<string>("");
	const [reason, setReason] = useState<string>("");
	const [message, setMessage] = useState<string>("");

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onMessageSubmit(email, reason, message);
		setEmail("");
		setReason("");
		setMessage("");
	};

	return (
		<MessageInputContainer>
			<h1>Book a Consultation</h1>
			<form onSubmit={handleSubmit}>
				<Label htmlFor="email">Email Address</Label>
				<Input
					id="email"
					type="email"
					name="email"
					placeholder="Enter your email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<Label htmlFor="reason">Reason for Consultation</Label>
				<Input
					id="reason"
					type="text"
					name="reason"
					placeholder="Reason for consultation"
					value={reason}
					onChange={(e) => setReason(e.target.value)}
					required
				/>
				<Label htmlFor="message">Your Message</Label>
				<TextArea
					id="message"
					name="message"
					placeholder="Please enter the reason for your appointment"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					required
				/>
				<SubmitButton type="submit">Submit</SubmitButton>
			</form>
		</MessageInputContainer>
	);
};

export default AppointmentMessageInput;
