// @flow
import { CREATE_RESELLERS_SUCCESS } from './resellers';
// ------------------------------------
// Constants
// ------------------------------------

const OPEN_MODAL = 'backoffice:modal:open';
const CLOSE_MODAL = 'backoffice:modal:close';
const OPEN_FORM_MODAL = 'backoffice:form-modal:open';

// types of modals
export const OPEN_CREATE_USER_MODAL = 'backoffice:form-modal:create-user';

// ------------------------------------
// Type definitions
// ------------------------------------

type Action = {
  type: string;
  payload: any;
};

type State = {
  modal: any;
  formModal: any;
};

type Payload = {
  header: string;
  content?: string;
  form?: Object;
  initialValues?: Object
} ;

// ------------------------------------
// Actions
// ------------------------------------

/**
 * @param header The header/title at the top of the modal. Required!
 * @param content The content text of the modal. Optional.
 */
export const openModal = ({ header, content }: Payload) => ({
  type: OPEN_MODAL,
  payload: {
    header,
    content
  }
});

export const openFormModal = (header: string, form: string, initialValues?: Object) => ({
  type: OPEN_FORM_MODAL,
  payload: {
    header,
    form,
    initialValues
  }
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});


// ------------------------------------
// Reducers
// ------------------------------------

const INITIAL_STATE = {
  /**
   * null indicates there is no modal
   * that is that the modal is closed.
   */
  modal: null,
  formModal: null
};

class ModalReducer {
  handle = (state: State = INITIAL_STATE, action: Action) => Object.assign({}, state, {
    modal: this.handleModal(state.modal, action),
    formModal: this.handleFormModal(state.formModal, action)
  })

  handleModal = (state: State, action: Action) => {
    switch (action.type) {
      case OPEN_MODAL:
        return action.payload;

      case CLOSE_MODAL:
        return null;

      default:
        return state;
    }
  }

  handleFormModal = (state: State, action: Action) => {
    switch (action.type) {
      case OPEN_FORM_MODAL:
        return action.payload;

      case CLOSE_MODAL:
      case CREATE_RESELLERS_SUCCESS:
        return null;

      default:
        return state;
    }
  }
}

export const modalReducer = new ModalReducer();
