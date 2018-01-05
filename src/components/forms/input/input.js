import * as React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Message } from 'semantic-ui-react';

export const renderInput = ({
  input,
  icon,
  disabled,
  label,
  placeholder,
  type,
  autoFocus,
  meta: { dirty, touched, error },
  ...props
}) => (
  <Form.Field
    error={!!(touched && error)}
    placeholder={placeholder}
    icon={icon}
    iconposition='left'
    disabled={disabled}
  >
    {label && <label>{label}</label>}
    <Input
      {...input}
      autoFocus={autoFocus}
      disabled={disabled}
      placeholder={placeholder}
      type={type}
      {...props}
    />
    <Message
      error
      visible={!!error && touched}
      content={error}/>
  </Form.Field>
);

renderInput.propTypes = {
  input: PropTypes.any,
  icon: PropTypes.string,
  disabled: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  meta: PropTypes.object
};
