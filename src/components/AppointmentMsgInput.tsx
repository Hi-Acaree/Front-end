// AppointmentMessageInput.tsx

import React, { useState } from "react";
import styled from "styled-components";
import { Message } from "../types/type";

//=== Styling ===//

const MessageInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
    min-height: 100px;
`;

const Button = styled.button`
    padding: 10px 20px;
    margin-top: 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #388e3c;
    }
`;

//=== Component props ===//

interface AppointmentMessageInputProps {
    onMessageSubmit: (message: string) => void;
    onNextStep: () => void;
}

//=== Component ===//

const AppointmentMessageInput: React.FC<AppointmentMessageInputProps> = ({ onMessageSubmit, onNextStep }) => {

	const [message, setMessage] = useState<string>("");

	const handleSubmit = () => {
		onMessageSubmit(message);
	};

	return (
		<MessageInputContainer>
			<TextArea
				placeholder="Please enter the reason for your appointment"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>
			<Button onClick={handleSubmit}>Next</Button>
		</MessageInputContainer>
	);
};

export default AppointmentMessageInput;
