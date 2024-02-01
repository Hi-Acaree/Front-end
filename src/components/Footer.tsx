import React from "react";
import styled from "styled-components";
//=== Styling ===//

const FooterContainer = styled.footer`
  /* Footer div styles */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #333; /* Dark background for contrast */
  color: #fff; /* Light text for readability */
  font-size: 0.9rem;
  border-top: 1px solid #444; /* Slight border for visual separation */
  width: 100%;
  bottom: 0;
  left: 0;
  /* If you want to fix the footer to the bottom of the page, uncomment the next two lines */
  /* position: fixed; */
  /* z-index: 10; */
`;

/**
 * Footer component
 * @returns Footer component
 */

//=== Component ===//

const Footer: React.FC = () => {
	return (
		<FooterContainer>
			{/* Footer content */}
			<p>&copy; {new Date().getFullYear()} Acaree. All rights reserved.</p>
		</FooterContainer>
	);
};

export default Footer;
