import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Form, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Input } from 'components/forms';
import { reduxForm, Field } from 'redux-form';
import { FORM_ERROR_REQUIRED_FIELD } from 'components/forms/errors';
import Logo from 'assets/svg/is_tab_black.svg';
import { isValidEmail } from '../utils';
import './style/forgot-password-form.scss';

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = FORM_ERROR_REQUIRED_FIELD;
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

const ForgotPasswordReduxForm = (props) => {
  const { submitting, onSubmit, handleSubmit, error } = props;

  return (
    <div>
      <Image centered size='large' src={Logo}/>
      <Segment stacked>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Header as='h3'>Request a new password</Header>
          <p styleName='form-description'>
            Enter your e-mail address and receive an e-mail that instructs you how to select a new password.
          </p>
          <Field
            name='email'
            component={Input}
            placeholder='Enter your e-mail address'
            icon='users'
            type='email'
            iconposition='left'
          />
          <Button
            type='submit'
            color='blue'
            fluid
            size='large'
            loading={submitting}
          >
              Submit
          </Button>
          <Message
            error
            visible={!!error}
            content={error ? error._error : null}
          />
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
