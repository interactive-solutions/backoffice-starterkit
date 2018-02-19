import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Segment } from 'semantic-ui-react';
import { userService } from 'api';
import { CreateUserForm } from 'components/forms';
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

    return (
      <Container fluid textAlign='center'>
        <CreateUserForm onSubmit={this.createUser}/>
        <Segment>
          <ReactTable data={this.props.users} columns={columns}/>
        </Segment>
      </Container>
    );
  }
}
