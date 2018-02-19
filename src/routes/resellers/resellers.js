import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Segment } from 'semantic-ui-react';
import { userService } from 'api';
import { CreateUserForm } from 'components/forms';
import { BreadcrumbHeader } from 'components';
import ReactTable from 'react-table';
import { resolveUsers } from 'redux/modules/user';

const mapStateToProps = (state) => ({
  users: state.user.users
});

const mapDispatchToProps = dispatch => ({
  resolveUsers: () => dispatch(resolveUsers())
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Resellers extends Component {
  static propTypes = {
    resolveUsers: PropTypes.func.isRequired,
    users: PropTypes.array
  };

  componentWillMount() {
    this.props.resolveUsers();
  }

  createUser = (values) => {
    userService.create(values)
      .then(() => this.props.getUsers())
      .catch((error) => console.warn(error)); // eslint-disable-line
  }

  render() {
    const columns = [
      { Header: 'uuid', accessor: 'uuid' },
      { Header: 'Username', accessor: 'username' },
      { Header: 'Roles', accessor: 'roles' }
    ];

    const breadcrumbs = [
      { link: 'resellers', name: 'resellers' }
    ];

    const callbacks = [
      { func: () => alert('Yeah!'), text: 'Create user', color: 'blue' } // eslint-disable-line
    ];

    return (
      <Fragment>
        <BreadcrumbHeader
          breadcrumbs={breadcrumbs}
          callbacks={callbacks}
        />
        <Container fluid textAlign='center'>
          <CreateUserForm onSubmit={this.createUser}/>
          <Segment>
            <ReactTable data={this.props.users} columns={columns}/>
          </Segment>
        </Container>
      </Fragment>
    );
  }
}
