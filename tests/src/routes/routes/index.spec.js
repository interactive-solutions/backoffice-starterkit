import { createRoutes } from 'routes';
import { shallow } from 'enzyme';

describe('(Route) createRoutes', () => {
  let _component;

  beforeEach(() => {
    _component = shallow(createRoutes());
  });

  it('Should return a route configuration object', () => {
    expect(typeof _component).to.equal('object');
  });

  it('Contains a route component', () => {
    expect(_component.find('Route')).length.to.be.at.least(4);
  });

  it('Containes a Switch component', () => {
    expect(_component.find('Switch')).length.to.be.at.least(2);
  });
});
