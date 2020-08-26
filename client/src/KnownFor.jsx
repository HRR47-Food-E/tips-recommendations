import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const KnownForContainer = styled.div`
  width: 100%;
  margin: 0px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const StyledFeature = styled.figure`
  display: flex;
  align-items: baseline;
`;

const KnownForIcon = styled.img`
  width: 96px;
  height: 72px;
`;

const KnownForFont = styled.figcaption`
  color: #101820;
  font-size: 15px;
  letter-spacing: .013em;
  text-align: center;
`;

const icons = ['http://localhost:3003/dist/icons/kids.svg', 'http://localhost:3003/dist/icons/lunch.svg', 'http://localhost:3003/dist/icons/placeholder.svg', 'http://localhost:3003/dist/icons/takeout.svg'];

class KnownFor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <KnownForContainer>
        {this.props.features.map((feature, i) => (
          <figure key={i} className='feature'>
            <KnownForIcon src={icons[Math.floor(Math.random() * (4))]} alt='icon'/>
            <KnownForFont>{feature.title}</KnownForFont>
          </figure>
        ))}
      </KnownForContainer>
    );
  }
}

export default KnownFor;

