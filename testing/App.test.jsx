// TESTS RENDERING

import React from 'react';
import { shallow, mount } from 'enzyme';
import { describe, expect, test } from '@jest/globals';
import sinon from 'sinon';
import App from '../client/App.jsx';

// TO DO: IMPORT ADDITIONAL COMPONENTS

// SHALLOW RENDERING
// TO DO: REPLACE DETAILS ONCE FRONTEND IS IMPLEMENTED
describe('<App />', () => {
  test('renders three <Foo /> components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Foo)).to.have.lengthOf(3);
  });

  test('renders an `.icon-star`', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.icon-star')).to.have.lengthOf(1);
  });

  test('renders children when passed in', () => {
    const wrapper = shallow((
      <App>
        <div className="unique" />
      </App>
    ));
    expect(wrapper.contains(<div className="unique" />)).to.equal(true);
  });

  test('simulates click events', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow(<App onButtonClick={onButtonClick} />);
    wrapper.find('button').simulate('click');
    expect(onButtonClick).to.have.property('callCount', 1);
  });
});

// FULL RENDERING
describe('<App />', () => {
  test('calls componentDidMount', () => {
    sinon.spy(App.prototype, 'componentDidMount');
    const wrapper = mount(<App />);
    expect(App.prototype.componentDidMount).to.have.property('callCount', 1);
  });

  test('allows us to set props', () => {
    const wrapper = mount(<App bar="baz" />);
    expect(wrapper.props().bar).to.equal('baz');
    wrapper.setProps({ bar: 'foo' });
    expect(wrapper.props().bar).to.equal('foo');
  });

  test('simulates click events', () => {
    const onButtonClick = sinon.spy();
    const wrapper = mount((
      <App onButtonClick={onButtonClick} />
    ));
    wrapper.find('button').simulate('click');
    expect(onButtonClick).to.have.property('callCount', 1);
  });
});
