/**
 * Currently used in the right sidebar.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Message
} from 'semantic-ui-react';
import { Input } from 'components/forms';
import { reduxForm, Field } from 'redux-form';
import { FORM_ERROR_REQUIRED_FIELD } from 'components/forms/errors';
import { isValidPassword } from '../utils';

const validate = ({ oldPassword, newPassword, confirmPassword }) => {
  const errors = {};

  if (!oldPassword) {
    errors.oldPassword = FORM_ERROR_REQUIRED_FIELD;
  }
  if (!newPassword) {
    errors.newPassword = FORM_ERROR_REQUIRED_FIELD;
  }
  if (!confirmPassword) {
    errors.confirmPassword = FORM_ERROR_REQUIRED_FIELD;
  }
  if (Object.values(errors).length > 0) {
    return errors;
  }

  if (!isValidPassword(newPassword)) {
    errors.newPassword = 'Password must be at least 5 characters';
  }
  if (newPassword !== confirmPassword) {
    errors.confirmPassword = "The passwords don't match";
  }

  return errors;
};

const ChangePasswordReduxForm = (props) => {
  const { submitting, onSubmit, handleSubmit, error } = props;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Field
        label='Old password'
        name='oldPassword'
        component={Input}
        icon='lock'
        type='password'
        iconposition='left'
      />
      <Field
        label='New password'
        name='newPassword'
        component={Input}
        icon='lock'
        type='password'
        iconposition='left'
      />
      <Field
        label='Confirm new password'
        name='confirmPassword'
        component={Input}
        icon='lock'
        type='password'
        iconposition='left'
      />
      <Button
        type='submit'
        color='blue'
        loading={submitting}
      >
          Save
      </Button>
      <Message
        error
        visible={!!error}
        content={error ? error._error : null}
      />
    </Form>
  );
};

export const ChangePasswordForm = reduxForm({
  form: 'change-password-form',
  fields: ['oldPassword', 'newPassword', 'confirmPassword'],
  validate
})(ChangePasswordReduxForm);

ChangePasswordReduxForm.propTypes = {
  onSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  error: PropTypes.object,
  submitting: PropTypes.bool
};
