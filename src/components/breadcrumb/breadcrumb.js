// @flow
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Breadcrumb, Menu, Button, Visibility, Header } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import './style/breadcrumb.scss';

type Callback = {
  func: Function,
  text: string,
  color: string
};

type Props = {
  callbacks?: Array<Callback>;
  // navbarOpen: bool;
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
    console.log(`e.target.scrollTop=${e.target.scrollTop}`); // eslint-disable-line
    // debugger; // eslint-disable-line
    if (e.target.scrollTop > 72) {
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
    if (this.props.callbacks) {
      const buttons = this.props.callbacks.map((item: Callback, index: number) => (
        <Button onClick={item.func} key={index} color={item.color}>
          {item.text}
        </Button>
      )
      );
      return (
        <Menu.Item position='right' styleName='borderless'>
          <Breadcrumb>
            {buttons}
          </Breadcrumb>
        </Menu.Item>
      );
    }
    return null;
  }

  renderHeader() {
    if (this.props.header) {
      return (
        <Menu.Item styleName='borderless'>
          <Header as='h3' content={this.props.header}/>
        </Menu.Item>
      );
    }

    return null;
  }

  render() {
    const { scrollOnTop } = this.state;
    const moving = scrollOnTop ? 'stuck' : ' fixed';
    console.log(`moving=${moving}`); // eslint-disable-line

    return (
      <Fragment>
        <Visibility
          styleName={!scrollOnTop ? 'stuck-placeholder' : ''}
        />
        <Menu ref={(input) => { this.domElement = input; }} id='menu' styleName={moving}>
          <Menu.Item position='left' styleName='borderless'>
            <Breadcrumb size='big'>
              {this.renderCrumbs()}
            </Breadcrumb>
          </Menu.Item>
          {this.renderHeader()}
          {this.renderCallbacks()}
        </Menu>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({ // eslint-disable-line
  // navbarOpen: state.navigation.navbar
});

export const BreadcrumbsContainer = connect(mapStateToProps)(Breadcrumbs);
export const BreadcrumbHeader = withRouter(BreadcrumbsContainer);
