import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const WhatToOrderContainer = styled.div`
  width: 100%;
  margin: 0px;
  display: flex;
  justify-content: space-between;
`;

const StyledDishContainer = styled.div`
  margin: 17px 0px 0px 0px;
`;

const StyledImage = styled.img`
  width: 260px;
  height: 176px;
`;

const StyledCaption = styled.figcaption`
  color: white;
  margin: -40px 16px 0px 16px;
  max-height: 72px;
  font-size: 24px;
  overflow: hidden;
  letter-spacing: .004em;
`;

class WhatToOrder extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <WhatToOrderContainer>
        <StyledDishContainer className='dish'>
          <StyledImage src={`https://tagaz-similar-restaurant-service.s3.us-east-2.amazonaws.com/FEC_photos/${this.props.dishImage1}.jpg`} alt="food"/>
          <StyledCaption>{this.props.dishName1}</StyledCaption>
        </StyledDishContainer>
        <StyledDishContainer className='dish'>
          <StyledImage src={`https://tagaz-similar-restaurant-service.s3.us-east-2.amazonaws.com/FEC_photos/${this.props.dishImage2}.jpg`} alt="food"/>
          <StyledCaption>{this.props.dishName2}</StyledCaption>
        </StyledDishContainer>
        <StyledDishContainer className='dish'>
          <StyledImage src={`https://tagaz-similar-restaurant-service.s3.us-east-2.amazonaws.com/FEC_photos/${this.props.dishImage3}.jpg`} alt="food"/>
          <StyledCaption>{this.props.dishName3}</StyledCaption>
        </StyledDishContainer>
      </WhatToOrderContainer>
    );
  }
}

export default WhatToOrder;