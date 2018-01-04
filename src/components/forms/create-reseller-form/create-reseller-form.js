import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Header, Grid, Message, Segment } from 'semantic-ui-react';
import { Input } from 'components/forms';
import { reduxForm, Field } from 'redux-form';
import { FORM_ERROR_REQUIRED_FIELD } from 'components/forms/errors';
// update this to redux-form

const validate = (values, props) => {
  let errors = {};

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
    <Segment>
      <Form onSubmit={handleSubmit(onSubmit)} loading={submitting} widths="equal">
        <Header as="h3">Create new reseller</Header>
        <Grid columns={3}>
          <Grid.Column verticalAlign="middle">
            <Field
              name="name"
              component={Input}
              placeholder="Name"
              icon="users"
              iconposition="left"/>
          </Grid.Column>
          <Grid.Column verticalAlign="middle">
            <Field
              name="billingId"
              component={Input}
              placeholder="BillingId"
              icon="users"
              iconposition="left"/>
          </Grid.Column>
          <Grid.Column verticalAlign="middle">
            <Button
              type="submit"
              color="blue"
              fluid size="large"
            >
              Create
            </Button>
          </Grid.Column>
        </Grid>
        <Message
          error
          visible={!!error}
          content={error ? error._error : null}/>
      </Form>
    </Segment>
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
