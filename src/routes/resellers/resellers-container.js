import { connect } from 'react-redux';
import { Resellers } from './resellers';
import { getResellers } from 'redux/modules/resellers';

const mapStateToProps = (state) => ({
  resellers: state.resellers.resellers
});

const mapDispatchToProps = dispatch => ({
  getResellers: () => dispatch(getResellers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Resellers);
