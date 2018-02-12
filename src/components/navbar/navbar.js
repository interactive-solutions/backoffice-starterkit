import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import { Header, RightSidebar } from 'components';
import { Footer } from 'components/footer/footer';
import { Sticky } from 'components/sticky/sticky';
import { Toastrs } from 'components/toastrs/toastrs';
import { sideMenuContent } from './side-menu-content';
import { MinifiedNavbar } from './small-navbar';
import { BigNavbar } from './big-navbar';
import './style/navbar.scss';

export class Navbar extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired, // eslint-disable-line
    logout: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      activeItem: 'Dashboard',
      navbarIsVisible: true,
      rightSidebarIsVisible: false
    };
  }

  componentWillMount() {
    this.setActiveItemByRoute(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setActiveItemByRoute(nextProps);
  }

  setActiveItemByRoute(props) {
    if (props.location) {
      const path = props.location.pathname;
      const activeItem = path.charAt(1).toUpperCase() + path.slice(2);
      this.setState({ activeItem });
    }
  }

  setActiveItem = (e, { name }) => {
    e.stopPropagation();
    this.setState({ activeItem: name });
    this.props.history.push(name.toLowerCase().replace(' ', ''));
  }

  toggleNavbar = () => {
    this.setState({ navbarIsVisible: !this.state.navbarIsVisible });
  }

  toggleRightSidebar = () => {
    this.setState({ rightSidebarIsVisible: !this.state.rightSidebarIsVisible });
  }

  render() {
    const {
      navbarIsVisible,
      rightSidebarIsVisible
    } = this.state;

    return (
      <div id='navbar-container' styleName='flex min-height-100'>
        <div id='navbar' styleName='flex min-height-100'>
          <BigNavbar
            visible={navbarIsVisible}
            sideMenuContent={sideMenuContent}
            activeItem={this.state.activeItem}
            setActiveItem={this.setActiveItem}
          />

          {/* <MinifiedNavbar
            visible={!navbarIsVisible}
            activeItem={this.state.activeItem}
            logout={this.props.logout}
            history={this.props.history}
          /> */}
        </div>

        <div styleName='flex-1 min-height-100'>
          <Header
              callback={this.toggleNavbar}
              toggleRightSidebar={this.toggleRightSidebar}
              title='Interactive Solutions'
          />
          <Sticky>
            <RightSidebar
              visible={rightSidebarIsVisible}
              toggleRightSidebar={this.toggleRightSidebar}
            />
            <Toastrs/>
          </Sticky>
          <Container fluid styleName='main-container'>
            {this.props.children}
          </Container>
          <Footer/>
        </div>
      </div>
    );
  }
}
