/**
 * Even though the class name is WarningModalContainer
 * I want to access it as WarningModal.
 * This allows the class name to change while
 * code that depends upon it still refers to WarningModal.
 */
export { WarningModalContainer as WarningModal } from './warning-modal-container';
