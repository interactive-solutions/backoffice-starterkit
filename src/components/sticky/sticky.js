// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style/sticky.scss';

type Props = {
  children?: any;
};
type State = {
  scrollOnTop: bool;
};

export class Sticky extends Component<Props, State> {
  static propTypes = {
    children: PropTypes.any
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
    const { scrollingElement } = e.target;
    if (scrollingElement.scrollTop > 15) {
      this.setState({ scrollOnTop: false });
    } else {
      this.setState({ scrollOnTop: true });
    }
  }

  render() {
    const { scrollOnTop } = this.state;
    const moving = scrollOnTop ? 'stuck' : ' fixed';

    return (
      <div styleName={moving}>
        {this.props.children}
      </div>
    );
  }
}
