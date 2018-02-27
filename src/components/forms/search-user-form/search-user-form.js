import React from 'react';
import PropTypes from 'prop-types';
import { Form, Header, Message, Segment } from 'semantic-ui-react';
import { Input } from 'components/forms';
import { reduxForm, Field } from 'redux-form';

const SearchUserReduxForm = (props) => {
  const { submitting, handleSubmit, onChange, error } = props;

  // onChange needs the setTimeout: https://github.com/erikras/redux-form/issues/537
  const handleChange = (event) => setTimeout(() => handleSubmit(onChange)(event));

  return (
    <Segment compact>
      <Form loading={submitting} onChange={handleChange}>
        <Header as='h3'>Search user</Header>
        <Field
          name='username'
          component={Input}
          placeholder='Username'
          icon='users'
          iconposition='left'
        />
        <Message
          error
          visible={!!error}
          content={error ? error._error : null}
        />
      </Form>
    </Segment>
  );
};

export const SearchUserForm = reduxForm({
  form: 'search-user-form',
  fields: ['username']
})(SearchUserReduxForm);

SearchUserReduxForm.propTypes = {
  onChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  error: PropTypes.object,
  submitting: PropTypes.bool
};
