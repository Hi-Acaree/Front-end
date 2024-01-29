import React from "react";
import styled from "styled-components";

//=== Styling ===//

const PictureContainer = styled.div`
    /* Picture div styles */
    display: flex;
    justify-content: center;
    align-items: center;
    /* Add your styles for the picture here */
`;

//=== Component Props ===//


interface PictureProps {
    imageUrl: string;
    altText: string;
}

//=== Component ===//

const Picture: React.FC<PictureProps> = ({ imageUrl, altText }) => {
	return (
		<PictureContainer>
			{/* Picture */}
			<img src={imageUrl} alt={altText} />
		</PictureContainer>
	);
};

export default Picture;
