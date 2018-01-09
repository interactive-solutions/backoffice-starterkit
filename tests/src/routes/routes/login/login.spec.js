import React from 'react';
import { Login } from 'routes/login/login';
import createStore from 'redux/store/create-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render } from 'enzyme';

describe('(View) Login', () => {
  let _component;

  const props = {
    push: () => {},
    resolveUser: () => {}
  };

  beforeEach(() => {
    _component = render(
      <Provider store={createStore()}>
        <MemoryRouter initialEntries={[ '/login' ]}>
          <Login {...props}/>
        </MemoryRouter>
      </Provider>);
  });

  it('Renders a welcome message', () => {
    const welcome = _component.find('h3');
    expect(welcome).to.exist();
    expect(welcome.text()).to.match(/Sign in to Backoffice/);
  });

  it('Renders an logo image', () => {
    const logo = _component.find('img');
    expect(logo).to.exist();
  });
});
