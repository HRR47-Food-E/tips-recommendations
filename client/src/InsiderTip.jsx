import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const InsiderTipContainer = styled.div`
  width: 100%;
`;

const StyledBorder = styled.hr`
  margin: 0 auto;
  border-top: 1px #d0d2d3 solid;
  width: 30%;
`;

const StyledTip = styled.p`
  margin: 0 auto;
  padding: 23px 0px;
  width: 100%;
  font-size: 22px;
  letter-spacing: .004em;
  line-height: 32px;
  text-align: center;
`;

class InsiderTip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <InsiderTipContainer>
        <StyledBorder/>
        <StyledTip>{this.props.tip}</StyledTip>
        <StyledBorder/>
      </InsiderTipContainer>
    );
  }
}

export default InsiderTip;