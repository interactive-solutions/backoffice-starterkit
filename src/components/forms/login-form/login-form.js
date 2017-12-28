import React from 'react';
import { Form, Message } from 'semantic-ui-react';

export const LoginForm = (props) => {
  // const getErrorMessage = props.error.response.data.error_description;
  return (
    <div className="main-container">
      <div className="center">
        <a className="logo mb15"/>
        <Form className="pb10">
          <div className="container-styled">
            <h3 className="text-center mb10">Sign in to Epulze Backoffice</h3>
            <Form.Field>
              <input
                placeholder="E-mail"
                icon="users"
                iconposition="left"
                value={props.username}
                onChange={props.onChangeUsername}
                type="email"
              />
            </Form.Field>
            <Form.Field>
              <input
                  placeholder="Password"
                  value={props.password}
                  onChange={props.onChangePassword}
                  type="password"
                />
            </Form.Field>
            <Form.Field>
              <div
                  role="link"
                  className="mb5 ui button primary fluid"
                  onClick={props.onSubmit}
                >
                  Submit
                </div>
              {
                  props.errorFlag
                    ? <Message
                      error
                      visible
                      content={getErrorMessage()}
                    />
                    : null
                }
            </Form.Field>
          </div>
          <div className="m20 block">
            <div
              role="link"
              className="mb5 ui basic button secondary fluid"
              onClick={props.onResetPasswordClick}
            >
              Forgot password?
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};
