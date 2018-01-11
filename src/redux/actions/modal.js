import {
  OPEN_MODAL,
  CLOSE_MODAL
} from 'redux/constants';

export const openModal = ({ header, content, buttonText, icon }) => ({
  type: OPEN_MODAL,
  payload: {
    header,
    content,
    buttonText,
    icon
  }
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});
