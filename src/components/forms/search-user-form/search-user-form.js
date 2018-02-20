import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Header, Message, Segment } from 'semantic-ui-react';
import { Input } from 'components/forms';
import { reduxForm, Field } from 'redux-form';
// import { userService } from 'api';
// import { openModal } from 'redux/modules/modal';
import { FORM_ERROR_REQUIRED_FIELD } from 'components/forms/errors';

const validate = (values, props) => {
  const errors = {};

  if (!values.username || values.username.length === 0) {
    errors.username = FORM_ERROR_REQUIRED_FIELD;
  }

  if (!props.submitting && (!values.bilingId || (values.bilingId && values.bilingId.length === 0))) {
    errors.bilingId = FORM_ERROR_REQUIRED_FIELD;
  }

  return errors;
};

// const onSubmit = (values, dispatch) => {
//   userService.search(values.username)
//     .then(() => {
//       // update data table
//     })
//     .catch(() => {
//       dispatch(openModal({
//         header: 'Search failed!',
//         content: 'An error occured when searching.'
//       }));
//     });
// };

const SearchUserReduxForm = (props) => {
  const { submitting, handleSubmit, onSubmit, error } = props;

  return (
    <Segment compact>
      <Form loading={submitting}>
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
        <Button primary onClick={handleSubmit(onSubmit)}>
          Search
        </Button>
      </Form>
    </Segment>
  );
};

export const SearchUserForm = reduxForm({
  form: 'search-user-form',
  fields: ['username'],
  validate
})(SearchUserReduxForm);

SearchUserReduxForm.propTypes = {
  onSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  error: PropTypes.object,
  submitting: PropTypes.bool
};
