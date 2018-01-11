import {
  OPEN_MODAL,
  CLOSE_MODAL
} from 'redux/constants';

export const openModal = (header, content, buttonText) => ({
  type: OPEN_MODAL,
  header,
  content,
  buttonText
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});
