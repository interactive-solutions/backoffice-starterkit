import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Segment } from 'semantic-ui-react';
import { resellerService } from 'api';
import { CreateResellersForm } from 'components/forms';

import ReactTable from 'react-table';

export class Resellers extends Component {
  static propTypes = {
    getResellers: PropTypes.func.isRequired,
    resellers: PropTypes.array
  };

  componentWillMount() {
    this.props.getResellers();
  }

  createReseller = (values) => {
    resellerService.create(values)
      .then((response) => this.props.getResellers())
      .catch((error) => console.warn(error));
  }

  render() {
    const columns = [
      { Header: 'uuid', accessor: 'uuid' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'BillingId', accessor: 'billingId' }
    ];

    return (
      <Container fluid textAlign="center">
        <CreateResellersForm onSubmit={this.createReseller}/>
        <Segment>
          <ReactTable data={this.props.resellers} columns={columns}/>
        </Segment>
      </Container>
    );
  }
}
