// @flow
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Menu, Button, Header } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { NavbarContext } from 'components/navbar/navbar-context';
import './style/breadcrumb.scss';

type Callback = {
  func: Function,
  text: string,
  color: string
};

type Props = {
  callbacks?: Array<Callback>;
  header?: string;
  breadcrumbs: Array<Object>
};

type State = {
  scrollOnTop: bool;
};

export class Breadcrumbs extends Component<Props, State> {
  static propTypes = {
    callbacks: PropTypes.array,
    navbarOpen: PropTypes.bool.isRequired,
    breadcrumbs: PropTypes.array
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
    const { id, scrollTop } = e.target;
    /**
     * Make sure that we don't react to
     * EVERY scroll event. We only care about scroll
     * events generated by #content-container.
     */
    if (id !== 'content-container') {
      return;
    }

    if (scrollTop > 72) {
      this.setState({ scrollOnTop: false });
    } else {
      this.setState({ scrollOnTop: true });
    }
  };

  renderCrumbs() {
    return this.props.breadcrumbs.map((crumb: string, index: number) => (
      <Fragment key={index}>
        <Breadcrumb.Section><Link to={crumb.link}>{ crumb.name }</Link></Breadcrumb.Section>
        { index + 1 !== this.props.breadcrumbs.length && <Breadcrumb.Divider>/</Breadcrumb.Divider> }
      </Fragment>
    ));
  }

  renderCallbacks() {
    if (!this.props.callbacks) {
      return null;
    }

    const buttons = this.props.callbacks.map((item: Callback, index: number) => (
      <Button onClick={item.func} key={index} color={item.color}>
        {item.text}
      </Button>
    ));

    return (
      <Breadcrumb>
        {buttons}
      </Breadcrumb>
    );
  }

  renderHeader() {
    if (this.props.header) {
      return (
        <Header as='h3' content={this.props.header}/>
      );
    }

    return null;
  }

  render() {
    const { scrollOnTop } = this.state;
    const moving = scrollOnTop ? 'stuck' : ' fixed';

    return (
      <NavbarContext.Consumer>
        {(context) => {
          const adaptToNavbar = context.isNavbarBig ? '' : ' wider';
          return (
            <Fragment>
              <Menu id='menu' styleName={moving + adaptToNavbar}>
                <Menu.Item position='left' styleName='borderless'>
                  <Breadcrumb size='big'>
                    {this.renderCrumbs()}
                  </Breadcrumb>
                </Menu.Item>
                <Menu.Item styleName='borderless'>
                  {this.renderHeader()}
                </Menu.Item>
                <Menu.Item position='right' styleName='borderless'>
                  {this.renderCallbacks()}
                </Menu.Item>
              </Menu>
            </Fragment>
          );
        }}
      </NavbarContext.Consumer>
    );
  }
}

export const BreadcrumbHeader = withRouter(Breadcrumbs);
