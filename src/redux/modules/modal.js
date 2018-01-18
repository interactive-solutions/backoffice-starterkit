// ------------------------------------
// Constants
// ------------------------------------

const OPEN_MODAL = 'backoffice:modal:open';
const CLOSE_MODAL = 'backoffice:modal:close';

// ------------------------------------
// Actions
// ------------------------------------

/**
 * @param header The header/title at the top of the modal. Required!
 * @param content The content text of the modal. Optional.
 */
export const openModal = ({ header, content }) => ({
  type: OPEN_MODAL,
  payload: {
    header,
    content
  }
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});

// ------------------------------------
// Reducers
// ------------------------------------

type Action = {
  type: string;
  payload: any;
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
    return Object.assign({}, state, {
      modal: this.handleModal(state.modal, action)
    });
  }

  handleModal = (state, action: Action) => {
    switch (action.type) {
      case OPEN_MODAL:
        return action.payload;

      case CLOSE_MODAL:
        return null;

      default:
        return state;
    }
  }
}

export const modalReducer = new ModalReducer();
