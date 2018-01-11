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
  handle = (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
      case OPEN_MODAL:
        const { header, content, buttonText } = action;
        return {
          ...state,
          modal:
            { header, content, buttonText }
        };

      case CLOSE_MODAL:
        return {
          ...state,
          modal: null
        };

      default:
        return state;
    }
  }
}

export const modalReducer = new ModalReducer();
