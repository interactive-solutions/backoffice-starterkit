/**
 * Even though the class name is AlertModalContainer
 * I want to access it as AlertModal.
 * This allows the class name to change while
 * code that depends upon it still refers to AlertModal.
 */
export { WarningModalContainer as WarningModal } from './warning-modal-container';
