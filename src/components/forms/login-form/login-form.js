import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Button, Form, Header, Image, Message, Segment } from 'semantic-ui-react';

// update this to redux-form

export const LoginForm = (props) => {
  let error = null;
  if (props.errorMessage) {
    error = props.errorMessage;
  }

  return (
    <div>
      <Image centered size="large" src="/assets/images/logo.png"/>
      <Segment stacked>
        <Form>
          <Header as="h3">Sign in to Backoffice</Header>
          <Form.Input
            placeholder="E-mail"
            icon="users"
            iconposition="left"
            value={props.username}
            onChange={props.onChangeUsername}
            type="email"
          />
          <Form.Input
            placeholder="Password"
            value={props.password}
            onChange={props.onChangePassword}
            type="password"
          />
          <Button color="blue" fluid size="large" onClick={props.onSubmit}>Login</Button>
          <Message
            error
            visible={!!error}
            content={props.errorMessage}/>
        </Form>
        <Message>
          <Link to="/reset-password">Forgot password?</Link>
        </Message>
      </Segment>
    </div>
  );
};

LoginForm.propTypes = {
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
  password: PropTypes.string,
  onChangePassword: PropTypes.func,
  onSubmit: PropTypes.func,
  errorMessage: PropTypes.string
};
