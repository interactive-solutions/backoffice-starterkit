import React from 'react';
import { CoreLayout } from 'layouts/core-layout/core-layout';
import { shallow } from 'enzyme';

describe('(Layout) PageLayout', () => {
  it('renders as a <div>', () => {
    shallow(<CoreLayout/>).should.have.tagName('div');
  });

  it('renders a project title', () => {
    shallow(<CoreLayout/>).find('h1').should.have.text('React Redux Starter Kit');
  });

  it('renders its children inside of the viewport', () => {
    const Child = () => <h2>child</h2>;
    shallow(
      <CoreLayout>
        <Child/>
      </CoreLayout>
    )
      .find('.page-layout__viewport')
      .should.contain(<Child/>);
  });
});
