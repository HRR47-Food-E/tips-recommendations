import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import WhatToOrder from './WhatToOrder.jsx';
import InsiderTip from './InsiderTip.jsx';
import KnownFor from './KnownFor.jsx';
import ZagatMentions from './ZagatMentions.jsx';

const StyledContainer = styled.div`
  width: 70%;
  max-width: 900px;
  height: auto;
  padding: 0 24px 40px 24px;
  margin-top: 40px;
  font-family: Roboto, "Helvetica Neue", sans-serif;
`;

const StyledTitles = styled.h3`
  padding-top: 33px;
  color: #656666;
  font-size: 16px;
  letter-spacing: .086em;
  text-transform: uppercase;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantName: '',
      dishName1: '',
      dishImage1: '',
      dishName2: '',
      dishImage2: '',
      dishName3: '',
      dishImage3: '',
      tip: '',
      features: [],
      articles: [],
    };
  }

  componentDidMount() {
    const i = window.location.pathname.substring(1, window.location.pathname.length - 1);
    this.fetchRestaurant(i);
  }

  fetchRestaurant(i) {
    axios.get(`http://localhost:3003/api/tips/${i}`)
      .then((response) => {
        const data = response.data[0];
        this.setState({
          restaurantName: data.restaurant_name,
          dishName1: data.dish_name1,
          dishImage1: data.dish_image1,
          dishName2: data.dish_name2,
          dishImage2: data.dish_image2,
          dishName3: data.dish_name3,
          dishImage3: data.dish_image3,
          tip: data.tip,
        });
      })
      .then(() => {
        this.fetchArticles(i);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchArticles(i) {
    axios.get(`http://localhost:3003/api/articles/${i}`)
      .then(({ data }) => {
        this.setState({ articles: data });
      })
      .then(() => {
        this.fetchFeatures(i);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchFeatures(i) {
    axios.get(`http://localhost:3003/api/features/${i}`)
      .then(({ data }) => {
        this.setState({ features: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <StyledContainer>
        <section id='what-to-order'>
          <StyledTitles>WHAT TO ORDER</StyledTitles>
          <WhatToOrder
            dishName1={this.state.dishName1}
            dishImage1={this.state.dishImage1}
            dishName2={this.state.dishName2}
            dishImage2={this.state.dishImage2}
            dishName3={this.state.dishName3}
            dishImage3={this.state.dishImage3}
          />
        </section>

        <section id='insider-tip'>
          <StyledTitles>INSIDER TIP</StyledTitles>
          <InsiderTip tip={this.state.tip} />
        </section>

        <section id='known-for'>
          <StyledTitles>KNOWN FOR</StyledTitles>
          <KnownFor features={this.state.features} />
        </section>

        <section id='articles'>
          <StyledTitles>
            ZAGAT MENTIONS OF {this.state.restaurantName}
          </StyledTitles>
          <ZagatMentions articles={this.state.articles} />
        </section>
      </StyledContainer>
    );
  }
}

export default App;
