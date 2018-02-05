import uniqueId from 'lodash.uniqueid';

// ------------------------------------
// Type definitions
// ------------------------------------

type Action = {
  type: string;
  payload: any;
}

// ------------------------------------
// Constants
// ------------------------------------

const OPEN_NOTIFICATION = 'backoffice:toastr:open';
const CLOSE_NOTIFICATION = 'backoffice:toastr:close';

// ------------------------------------
// Actions
// ------------------------------------

export const openToastr = ({ header, content, type }) => ({
  type: OPEN_NOTIFICATION,
  payload: {
    type,
    header,
    content
  }
});

export const closeToastr = (id : string) => ({
  type: CLOSE_NOTIFICATION,
  payload: {
    id
  }
});

// ------------------------------------
// Reducers
// ------------------------------------

const INITIAL_STATE = {
  /**
   * An object of toastrs.
   * An empty object means that there
   * are currently no toastrs.
   */
  toastrs: {}
};

class ToastrReducer {
  handle = (state = INITIAL_STATE, action: Action) => Object.assign({}, state, {
    toastrs: this.handleToastr(state.toastrs, action)
  })

  handleToastr = (state, action: Action) => {
    switch (action.type) {
      case OPEN_NOTIFICATION: {
        const id = uniqueId();
        return {
          ...state, // all previous toastrs

          [id]: { // the new toastr
            ...action.payload,
            id
          }
        };
      }

      case CLOSE_NOTIFICATION: {
        const { [action.payload.id]: objectToRemove, ...rest } = state;
        return rest;
      }

      default:
        return state;
    }
  }
}

export const toastrReducer = new ToastrReducer();
