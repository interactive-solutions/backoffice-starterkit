import React from 'react';
import { CoreLayout } from 'layouts/core-layout/core-layout';
import { shallow } from 'enzyme';

describe('(Layout) CoreLayout', () => {
  it('renders as a <div>', () => {
    shallow(<CoreLayout/>).should.have.tagName('div');
  });

  it('renders its children inside of the viewport', () => {
    let wrapper = shallow(<CoreLayout/>);
    expect(wrapper.find('children').children()).to.have.length(0);
  });
});
