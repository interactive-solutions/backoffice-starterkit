import { Login } from 'routes/login/login';

describe('(Route) Login', () => {
  let _component;

  beforeEach(() => {
    _component = Login.component();
  });

  it('Should return a route configuration object', () => {
    expect(typeof Login).to.equal('object');
  });

  it('Should define a route component', () => {
    expect(_component.type).to.equal('div');
  });
});
