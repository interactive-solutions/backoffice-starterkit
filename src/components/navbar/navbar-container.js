import { connect } from 'react-redux';
import { RoutingNavbar } from './navbar';
import { logout } from 'redux/modules/user';

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export const NavbarContainer =
  connect(
    null,
    mapDispatchToProps,
  )(RoutingNavbar);
