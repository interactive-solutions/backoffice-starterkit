// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style/sticky.scss';

type Props = {
  children?: any;
  navbarIsBig: boolean;
};
type State = {
  scrollOnTop: bool;
};

export class Sticky extends Component<Props, State> {
  static propTypes = {
    children: PropTypes.any,
    navbarIsBig: PropTypes.bool.isRequired
  };

  constructor(props: Props) {
    super(props);

    this.state = {
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
    if (e.target.scrollTop > 15) {
      this.setState({ scrollOnTop: false });
    } else {
      this.setState({ scrollOnTop: true });
    }
  }

  render() {
    const { scrollOnTop } = this.state;
    const { navbarIsBig } = this.props;
    const moving = scrollOnTop ? 'stuck' : ' fixed';
    const rightPos = navbarIsBig ? 'navbar-is-big' : 'navbar-is-small';

    return (
      <div styleName={`${moving} ${rightPos}`}>
        {this.props.children}
      </div>
    );
  }
}
