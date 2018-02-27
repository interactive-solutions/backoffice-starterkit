import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Segment } from 'semantic-ui-react';
import { SearchUserForm } from 'components/forms';
import { BreadcrumbHeader } from 'components';
import ReactTable from 'react-table';
import { getUsers, searchUsers } from 'redux/modules/user';
import { openModal, openFormModal, OPEN_CREATE_USER_MODAL } from 'redux/modules/modal';

const mapStateToProps = (state) => ({
  users: state.user.users
});

const mapDispatchToProps = dispatch => ({
  openModal: (props) => dispatch(openModal(props)),
  getUsers: () => dispatch(getUsers()),
  searchUsers: (username) => dispatch(searchUsers(username)),
  openCreateUserModal: () => dispatch(openFormModal('Create new user', OPEN_CREATE_USER_MODAL))
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Users extends Component {
  static propTypes = {
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.array
  };

  componentWillMount() {
    this.props.getUsers();
  }

  searchUser = (values) => {
    this.props.searchUsers(values.username)
      .catch(() => {
        this.props.openModal({
          header: 'Search fail!',
          content: 'Un unexpected error occurred.'
        });
      });
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
          <SearchUserForm onChange={this.searchUser}/>
          <Segment>
            <ReactTable data={this.props.users} columns={columns}/>
          </Segment>
        </Container>
      </Fragment>
    );
  }
}
