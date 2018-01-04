import { connect } from 'react-redux';
import { Resellers } from './resellers';
import { getResellers } from 'redux/actions';

const mapStateToProps = (state) => ({
  resellers: state.resellers.resellers
});

const mapDispatchToProps = dispatch => ({
  getResellers: () => dispatch(getResellers())
});

export const ResellersContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Resellers);
