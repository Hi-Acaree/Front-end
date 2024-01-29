import React from "react";
import styled from "styled-components";

//=== Styling ===//

const FooterContainer = styled.div`
    /* Footer div styles */
    display: flex;
    justify-content: center;
    align-items: center;
    /* Add your styles for the footer here */
`;

//=== Component ===//


const Footer: React.FC = () => {
	return (
		<FooterContainer>
			{/* Footer */}
			<h2>Footer</h2>
		</FooterContainer>
	);
};

export default Footer;
