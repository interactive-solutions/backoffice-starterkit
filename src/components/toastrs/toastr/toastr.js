import React from 'react';
import PropTypes from 'prop-types';
import {
  Message,
  Transition
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
  closeToastr as closeToastrAction,
  toastrType
} from 'redux/modules/toastr';
import './style/toastr.scss';

// ---------------------------------
// Toastr
// ---------------------------------

class Toastr extends React.Component {
  state = {
    visible: false
  }

  componentDidMount() {
    /**
     * Triggers transition animation.
     * I can't get it to trigger the animation without
     * this 'setState'. The element will be rendered twice
     * once with visibility=false then visibility=true
     * that transition will trigger the animation.
     */
    this.setState({ visible: true }); // eslint-disable-line

    // trigger transiton animation.
    // which when it ends trigges this.onTransitionComplete.
    setTimeout(() => { this.setState({ visible: false }); }, 5000);
  }

  onDismiss = () => {
    // trigger transiton animation.
    // which when it ends trigges this.onTransitionComplete.
    this.setState({ visible: false });
  }

  /**
   * Wait until the removal animation is done,
   * then remove the toastr from redux
   */
  onTransitionComplete = () => {
    if (!this.state.visible) {
      this.props.closeToastr(this.props.toastr.id);
    }
  }

  infoToastrProps = {
    styleName: 'info-toastr',
    icon: 'info circle',
    info: true
  }

  successToastrProps = {
    styleName: 'success-toastr',
    icon: 'checkmark box',
    success: true
  }

  render = () => {
    const { toastr } = this.props;
    const { header, content, type } = toastr;
    let additionalProps;

    switch (type) {
      case toastrType.INFO:
        additionalProps = this.infoToastrProps;
        break;
      default: // toastrType.SUCCESS
        additionalProps = this.successToastrProps;
    }

    const message = (
      <Message
        header={header}
        content={content}
        onDismiss={this.onDismiss}
        {...additionalProps}
      />
    );

    /**
     * The div below is needed:
     * https://github.com/Semantic-Org/Semantic-UI-React/issues/2166#issuecomment-334478073
     */
    return (
      <Transition
        visible={this.state.visible}
        animation='fade up'
        duration={600}
        onComplete={this.onTransitionComplete}
      >
        <div styleName='extra-padding'>
          {message}
        </div>
      </Transition>
    );
  }
}

Toastr.propTypes = {
  toastr: PropTypes.object.isRequired,
  closeToastr: PropTypes.func.isRequired
};

// ---------------------------------
// ToastrContainer
// ---------------------------------

const mapDispatchToProps = dispatch => ({
  closeToastr: id => dispatch(closeToastrAction(id))
});

const ToastrContainer =
  connect(
    null,
    mapDispatchToProps,
  )(Toastr);

ToastrContainer.propTypes = {
  toastr: PropTypes.object.isRequired
};

export { ToastrContainer as Toastr };
