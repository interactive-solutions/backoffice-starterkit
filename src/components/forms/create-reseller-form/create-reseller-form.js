import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Header, Grid, Message, Modal } from 'semantic-ui-react';
import { Input } from 'components/forms';
import { reduxForm, Field } from 'redux-form';
import { FORM_ERROR_REQUIRED_FIELD } from 'components/forms/errors';
// update this to redux-form

const validate = (values, props) => {
  const errors = {};

  if (!values.name || values.name.length === 0) {
    errors.name = FORM_ERROR_REQUIRED_FIELD;
  }

  if (!props.submitting && (!values.bilingId || (values.bilingId && values.bilingId.length === 0))) {
    errors.bilingId = FORM_ERROR_REQUIRED_FIELD;
  }

  return errors;
};

const ResellersReduxForm = (props) => {
  const { submitting, onSubmit, handleSubmit, error } = props;

  return (
    <Fragment>
      <Modal.Content>
        <Form loading={submitting} widths='equal'>
          <Header as='h3'>Create new reseller</Header>
          <Grid columns={2}>
            <Grid.Column verticalAlign='middle'>
              <Field
                name='name'
                component={Input}
                placeholder='Name'
                icon='users'
                iconposition='left'
              />
            </Grid.Column>
            <Grid.Column verticalAlign='middle'>
              <Field
                name='billingId'
                component={Input}
                placeholder='BillingId'
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

export const CreateResellersForm = reduxForm({
  form: 'create-resellers-form',
  fields: ['name', 'billingId'],
  validate
})(ResellersReduxForm);

ResellersReduxForm.propTypes = {
  onSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  error: PropTypes.object,
  submitting: PropTypes.bool
};
