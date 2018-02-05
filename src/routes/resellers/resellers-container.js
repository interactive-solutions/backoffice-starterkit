import { connect } from 'react-redux';
import { getResellers } from 'redux/modules/resellers';
import { Resellers } from './resellers';

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
