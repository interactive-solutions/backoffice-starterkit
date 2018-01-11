import {
  OPEN_MODAL,
  CLOSE_MODAL
} from 'redux/constants';

type Action = {
  type: string;
}

const INITIAL_STATE = {
  /**
   * null indicates there is no modal
   * that is that the modal is closed.
   */
  modal: null
};

class ModalReducer {
  handle(state = INITIAL_STATE, action: Action) {
    return Object.assign({}, state, {
      modal: this.getModalState(state.resellers, action)
    });
  }

  getModalState(state, action: Action) {
    switch (action.type) {
      case OPEN_MODAL:
        return state;

      case CLOSE_MODAL:
        return state;

      default:
        return state;
    }
  }
}

export const modalReducer = new ModalReducer();
