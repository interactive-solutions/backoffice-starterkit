import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Segment } from 'semantic-ui-react';
// import { resellerService } from 'api';
// import { userService } from 'api';
// import { CreateResellersForm } from 'components/forms';
import ReactTable from 'react-table';
// import { getResellers } from 'redux/modules/resellers';
import { resolveUsers } from 'redux/modules/user';

const mapStateToProps = (state) => ({
  users: state.user.users
});

const mapDispatchToProps = dispatch => ({
  // getResellers: () => dispatch(getResellers())
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

  // createReseller = (values) => {
  //   resellerService.create(values)
  //     .then(() => this.props.getResellers())
  //     .catch((error) => console.warn(error)); // eslint-disable-line
  // }

  render() {
    const columns = [
      { Header: 'uuid', accessor: 'uuid' },
      { Header: 'Username', accessor: 'username' },
      { Header: 'Roles', accessor: 'Roles' }
    ];

    return (
      <Container fluid textAlign='center'>
        {/* <CreateResellersForm onSubmit={this.createReseller}/> */}
        <Segment>
          <ReactTable data={this.props.users} columns={columns}/>
        </Segment>
      </Container>
    );
  }
}
