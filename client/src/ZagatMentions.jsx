import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const MentionsContainer = styled.div`
  width: 100%;
`;

const ArticleContainer = styled.a`
  display: flex;
`;

const ArticleImage = styled.img`
  width: 120px;
  height: 120px;
`;

const ArticleTitle = styled.figcaption`
  width: 158px;
  padding: 22px 14px;
  text-decoration: none;
  color: #101820;
  font-size: 19px;
  letter-spacing: .013em;
  text-overflow: ellipsis;
`;

const ButtonStyling = styled.button`
  width: 176px;
  height: 34px;
  padding: 1px 6px;
  color: #b70038;
  border: #b70038 2px solid;
  background-color: white;
  cursor: pointer;
  font-size: 16px;
  letter-spacing: .086em;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;

  &:hover ${ButtonStyling} {
    background-color: #b70038;
    color: white;
  }
`;

class ZagatMentions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MentionsContainer>
        <ArticleContainer href="#" className='article'>
        {this.props.articles.map((article, i) => (
          <div key={i}>
            <ArticleImage src={`https://tagaz-similar-restaurant-service.s3.us-east-2.amazonaws.com/FEC_photos/${article.image}.jpg`} alt='dining' />
            <ArticleTitle>{article.title}</ArticleTitle>
          </div>
            ))}
            </ArticleContainer>
        <ButtonContainer>
          <ButtonStyling type="button">SHOW ALL</ButtonStyling>
        </ButtonContainer>
      </MentionsContainer>
    );
  }
}

export default ZagatMentions;

