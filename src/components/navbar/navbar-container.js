import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import {
  Header,
  RightSidebar
} from 'components';
import { Footer } from 'components/footer/footer';
import { Toastrs } from 'components/toastrs/toastrs';
import { sideMenuContent } from './side-menu-content';
import { Navbar } from './navbar';
import './style/navbar.scss';

export class NavbarContainer extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
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
      const activeItem = path.charAt(1) + path.slice(2);
      this.setState({ activeItem });
    }
  }

  setActiveItem = (link) => {
    this.setState({ activeItem: link });
    this.props.history.push(link);
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
      <div id='navbar-container' styleName='flex height-100vh'>
        <div id='navbar' styleName='flex min-height-100'>
          <Navbar
            visible={navbarIsVisible}
            sideMenuContent={sideMenuContent}
            activeItem={this.state.activeItem}
            setActiveItem={this.setActiveItem}
          />
        </div>

        <div id='content-container' styleName='flex-1 content-container'>
          <Header
            callback={this.toggleNavbar}
            toggleRightSidebar={this.toggleRightSidebar}
            title='Interactive Solutions'
          />
          <div styleName='sidebar-and-toastrs-container'>
            <RightSidebar
              visible={rightSidebarIsVisible}
              toggleRightSidebar={this.toggleRightSidebar}
            />
            <Toastrs/>
          </div>
          <div id='main-container'>
            {this.props.children}
          </div>
          <Footer/>
        </div>
      </div>
    );
  }
}
