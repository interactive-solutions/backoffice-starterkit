import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Form, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Input } from 'components/forms';
import { reduxForm, Field } from 'redux-form';
import { FORM_ERROR_REQUIRED_FIELD } from 'components/forms/errors';
import { isValidPassword } from '../utils';

const validate = ({ password, confirmPassword }) => {
  const errors = {};

  if (!password) {
    errors.password = FORM_ERROR_REQUIRED_FIELD;
  }
  if (!confirmPassword) {
    errors.confirmPassword = FORM_ERROR_REQUIRED_FIELD;
  }
  if (Object.values(errors).length > 0) {
    return errors;
  }

  if (!isValidPassword(password)) {
    errors.password = 'Password must be at least 5 characters';
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = "The passwords don't match";
  }

  return errors;
};

const ResetPasswordReduxForm = (props) => {
  const { submitting, onSubmit, handleSubmit, error } = props;

  return (
    <div>
      <Image centered size='large' src='/assets/images/logo.png'/>
      <Segment stacked>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Header as='h3'>Enter new password</Header>
          <Field
            name='password'
            component={Input}
            placeholder='New password'
            icon='lock'
            type='password'
            iconposition='left'/>
          <Field
            name='confirmPassword'
            component={Input}
            placeholder='Enter your new password again'
            icon='lock'
            type='password'
            iconposition='left'/>
          <Button
            type='submit'
            color='blue'
            fluid size='large'
            loading={submitting}>
              Update password
          </Button>
          <Message
            error
            visible={!!error}
            content={error ? error._error : null}/>
        </Form>
        <Message>
          <Link to='/login'>To Login</Link>
        </Message>
      </Segment>
    </div>
  );
};

export const ResetPasswordForm = reduxForm({
  form: 'reset-password-form',
  fields: ['password', 'confirmPassword'],
  validate
})(ResetPasswordReduxForm);

ResetPasswordReduxForm.propTypes = {
  onSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  error: PropTypes.object,
  submitting: PropTypes.bool
};
