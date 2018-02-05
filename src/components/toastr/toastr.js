import React from 'react';
import PropTypes from 'prop-types';
import {
  Message,
  Transition
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { closeToastr as closeToastrAction } from 'redux/modules/toastr';
import './style/toastr.scss';

// ---------------------------------
// Constants
// ---------------------------------

export const toastrType = {
  INFO: 'info',
  SUCCESS: 'success'
};

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
  }

  onDismiss = () => {
    this.setState({ visible: false }); // triggers transiton animation.
    /**
     * Wait until the removal animation is done,
     * then remove the toastr from redux
     */
    setTimeout(
      () => {
        console.log(`removing id ${this.props.toastr.id}`); // eslint-disable-line
        this.props.closeToastr(this.props.toastr.id);
      },
      this.transitionTime
    );
  }

  transitionTime = 600

  render = () => {
    const { toastr } = this.props;
    const { header, content, type } = toastr;
    let message;

    switch (type) {
      case toastrType.INFO:
        message = (
          <Message
            info
            styleName='toastr'
            icon='info circle'
            header={header}
            content={content}
            onDismiss={this.onDismiss}
          />
        );
        break;
      default: // toastrType.SUCCESS
        message = (
          <Message
            success
            styleName='toastr'
            icon='checkmark box'
            header={header}
            content={content}
            onDismiss={this.onDismiss}
          />
        );
    }

    /**
     * The div below is needed:
     * https://github.com/Semantic-Org/Semantic-UI-React/issues/2166#issuecomment-334478073
     */
    return (
      <Transition visible={this.state.visible} animation='fade up' duration={this.transitionTime}>
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
