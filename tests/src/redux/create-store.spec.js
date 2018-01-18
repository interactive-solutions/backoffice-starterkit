import createStore from 'redux/store/create-store';
import { RESOLVE_USER_SUCCESS } from 'redux/modules/user';

describe('(Store) createStore', () => {
  let store;

  before(() => {
    store = createStore();
  });

  it('should have an empty asyncReducers object', () => {
    expect(store.asyncReducers).to.be.an('object');
    expect(store.asyncReducers).to.be.empty();
  });

  describe('(Users)', () => {
    it('store should be initialized with User state', () => {
      const user = {
        username : 'echo'
      };
      store.dispatch({
        type    : RESOLVE_USER_SUCCESS,
        payload : { username: 'echo' }
      });
      expect(store.getState().user.user).to.deep.equal(user);
    });
  });
});
