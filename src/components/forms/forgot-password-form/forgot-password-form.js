import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Form, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Input } from 'components/forms';
import { reduxForm, Field } from 'redux-form';
import { FORM_ERROR_REQUIRED_FIELD } from 'components/forms/errors';

const validate = (values, props) => {
  let errors = {};

  if (!values.email) {
    errors.email = FORM_ERROR_REQUIRED_FIELD;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  /* if (!props.submitting && (!values.password || (values.password && values.password.length === 0))) {
    errors.password = FORM_ERROR_REQUIRED_FIELD;
  } */

  return errors;
};

const ForgotPasswordReduxForm = (props) => {
  const { submitting, onSubmit, handleSubmit, error } = props;

  return (
    <div>
      <Image centered size='large' src='/assets/images/logo.png'/>
      <Segment stacked>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Header as='h3'>Reset your password</Header>
          <Field
            name='email'
            component={Input}
            placeholder='E-mail'
            icon='users'
            iconposition='left'/>
          <Button
            type='submit'
            color='blue'
            fluid size='large'
            loading={submitting}>
              Reset password
          </Button>
          <Message
            error
            visible={!!error}
            content={error ? error._error : null}/>
        </Form>
        <Message>
          <Link to='/login'>Back to Login</Link>
        </Message>
      </Segment>
    </div>
  );
};

export const ForgotPasswordForm = reduxForm({
  form: 'forgot-password-form',
  fields: ['email'],
  validate
})(ForgotPasswordReduxForm);

ForgotPasswordReduxForm.propTypes = {
  onSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  error: PropTypes.object,
  submitting: PropTypes.bool
};
