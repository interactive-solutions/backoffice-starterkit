import {
  OPEN_MODAL,
  CLOSE_MODAL
} from 'redux/constants';

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
