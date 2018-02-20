import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Segment } from 'semantic-ui-react';
import { userService } from 'api';
import { SearchUserForm } from 'components/forms';
import { BreadcrumbHeader } from 'components';
import ReactTable from 'react-table';
import { resolveUsers } from 'redux/modules/user';
import { openFormModal, OPEN_CREATE_USER_MODAL } from 'redux/modules/modal';

const mapStateToProps = (state) => ({
  users: state.user.users
});

const mapDispatchToProps = dispatch => ({
  resolveUsers: () => dispatch(resolveUsers()),
  openCreateUserModal: () => dispatch(openFormModal('Create new user', OPEN_CREATE_USER_MODAL))
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Users extends Component {
  static propTypes = {
    resolveUsers: PropTypes.func.isRequired,
    users: PropTypes.array
  };

  componentWillMount() {
    this.props.resolveUsers();
  }

  // createUser = (values) => {
  //   userService.create(values)
  //     .then(() => this.props.getUsers())
  //     .catch((error) => console.warn(error)); // eslint-disable-line
  // }

  searchUser = (values) => {
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
      { link: 'users', name: 'users' }
    ];

    const callbacks = [{
      func: this.props.openCreateUserModal,
      text: 'Create user',
      color: 'blue'
    }];

    return (
      <Fragment>
        <BreadcrumbHeader
          header='Users'
          breadcrumbs={breadcrumbs}
          callbacks={callbacks}
        />
        <Container className='route-container' textAlign='center'>
          <SearchUserForm onSubmit={this.searchUser}/>
          <Segment>
            <ReactTable data={this.props.users} columns={columns}/>
          </Segment>
        </Container>
      </Fragment>
    );
  }
}
