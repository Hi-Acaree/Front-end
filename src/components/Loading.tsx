import React from "react";
import styled from "styled-components";

//=== Styling ===//

const LoadingContainer = styled.div`
    /* Loading div styles */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* Add your styles for the loading container here */
`;

const Spinner = styled.div`
    /* Spinner div styles */
    border: 6px solid #f3f3f3;
    border-top: 6px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
    /* Add your styles for the spinner here */
`;



//=== Component Props ===//

interface LoadingProps {
    // Add props here
    loading?: boolean;
}


//=== Component ===//

const Loading: React.FC<LoadingProps> = () => {
	return (
		<LoadingContainer>
			<Spinner></Spinner>
			<div>Loading...</div>
		</LoadingContainer>
	);
};

export default Loading;
