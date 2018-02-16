import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Segment } from 'semantic-ui-react';
import { resellerService } from 'api';
import { CreateResellersForm } from 'components/forms';
import ReactTable from 'react-table';
import { getResellers } from 'redux/modules/resellers';

const mapStateToProps = (state) => ({
  resellers: state.resellers.resellers
});

const mapDispatchToProps = dispatch => ({
  getResellers: () => dispatch(getResellers())
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Resellers extends Component {
  static propTypes = {
    getResellers: PropTypes.func.isRequired,
    resellers: PropTypes.array
  };

  componentWillMount() {
    this.props.getResellers();
  }

  createReseller = (values) => {
    resellerService.create(values)
      .then(() => this.props.getResellers())
      .catch((error) => console.warn(error)); // eslint-disable-line
  }

  render() {
    const columns = [
      { Header: 'uuid', accessor: 'uuid' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'BillingId', accessor: 'billingId' }
    ];

    return (
      <Container fluid textAlign='center'>
        <CreateResellersForm onSubmit={this.createReseller}/>
        <Segment>
          <ReactTable data={this.props.resellers} columns={columns}/>
        </Segment>
      </Container>
    );
  }
}
