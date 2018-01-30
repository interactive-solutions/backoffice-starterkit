// @flow
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
// import { withRouter } from 'react-router-dom';
import './style/sticky.scss';

type Callback = {
  func: Function,
  text: string,
  color: string
};
type Props = {
  children?: any;
  // callbacks?: Array<Callback>;
  // navbarOpen: bool;
};
type State = {
  // breadcrumbs: Array<string>;
  scrollOnTop: bool;
};

export class Sticky extends Component<Props, State> {
  static propTypes = {
    // location: PropTypes.object.isRequired,
    // callbacks: PropTypes.array,
    // navbarOpen: PropTypes.bool.isRequired
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      // breadcrumbs: [],
      scrollOnTop: true
    };
  }

  componentWillMount() {
    window.addEventListener('scroll', this.handleScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (e: Object) => {
    if (e.target.scrollTop > 87) {
      this.setState({ scrollOnTop: false });
    } else {
      this.setState({ scrollOnTop: true });
    }
  }

  render() {
    const { scrollOnTop } = this.state;
    const moving = scrollOnTop ? 'stuck' : ' fixed';

    return (
      <div styleName={`${moving} menu-is-big`}>
        {this.props.children}
      </div>
    );
  }
}
