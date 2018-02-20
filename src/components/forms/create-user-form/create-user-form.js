import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Header, Grid, Message, Modal } from 'semantic-ui-react';
import { Input } from 'components/forms';
import { reduxForm, Field } from 'redux-form';
import { userService } from 'api';
import {
  openModal,
  closeModal
} from 'redux/modules/modal';
import { openToastr } from 'redux/modules/toastr';
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

const onSubmit = (values, dispatch) => {
  userService.create(values.username, values.roles)
    .then(() => {
      dispatch(closeModal()); // close this modal
      dispatch(openToastr({
        header: 'Created user succeeded!',
        content: 'Successfully created new user.'
      }));
    })
    .catch(() => {
      dispatch(openModal({
        header: 'Failed to create a new user!',
        content: 'A new user could not be created.'
      }));
    });
};

const CreateUserReduxForm = (props) => {
  const { submitting, handleSubmit, error } = props;

  return (
    <Fragment>
      <Modal.Content>
        <Form loading={submitting} widths='equal'>
          <Header as='h3'>Create new user</Header>
          <Grid columns={2}>
            <Grid.Column verticalAlign='middle'>
              <Field
                name='username'
                component={Input}
                placeholder='Username'
                icon='users'
                iconposition='left'
              />
            </Grid.Column>
            <Grid.Column verticalAlign='middle'>
              <Field
                name='roles'
                component={Input}
                placeholder='Roles'
                icon='users'
                iconposition='left'
              />
            </Grid.Column>
          </Grid>
          <Message
            error
            visible={!!error}
            content={error ? error._error : null}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button primary onClick={handleSubmit(onSubmit)}>
          Add
        </Button>
      </Modal.Actions>
    </Fragment>
  );
};

export const CreateUserForm = reduxForm({
  form: 'create-user-form',
  fields: ['username', 'roles'],
  validate
})(CreateUserReduxForm);

CreateUserReduxForm.propTypes = {
  handleSubmit: PropTypes.func,
  error: PropTypes.object,
  submitting: PropTypes.bool
};
