import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Form, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Input } from 'components/forms';
import { reduxForm, Field } from 'redux-form';
import { FORM_ERROR_REQUIRED_FIELD } from 'components/forms/errors';
// update this to redux-form

const validate = (values, props) => {
  let errors = {};

  if (!values.username || values.username.length === 0) {
    errors.username = FORM_ERROR_REQUIRED_FIELD;
  }

  if (!props.submitting && (!values.password || (values.password && values.password.length === 0))) {
    errors.password = FORM_ERROR_REQUIRED_FIELD;
  }

  return errors;
};

const LoginReduxForm = (props) => {
  const { submitting, onSubmit, handleSubmit, error } = props;
  console.warn(props);
  return (
    <div>
      <Image centered size="large" src="/assets/images/logo.png"/>
      <Segment stacked>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Header as="h3">Sign in to Backoffice</Header>
          <Field
            name="username"
            component={Input}
            placeholder="Username"
            icon="users"
            iconposition="left"/>
          <Field
            name="password"
            component={Input}
            placeholder="Password"
            icon="users"
            iconposition="left"
            type="password"/>
          <Button
            type="submit"
            color="blue"
            fluid size="large"
            loading={submitting}>
              Login
          </Button>
          <Message
            error
            visible={!!error}
            content={error ? error._error : null}/>
        </Form>
        <Message>
          <Link to="/reset-password">Forgot password?</Link>
        </Message>
      </Segment>
    </div>
  );
};

export const LoginForm = reduxForm({
  form: 'login-form',
  fields: ['username', 'password'],
  validate
})(LoginReduxForm);

LoginReduxForm.propTypes = {
  onSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  error: PropTypes.object,
  submitting: PropTypes.bool
};
