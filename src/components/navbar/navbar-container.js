import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import { Header, RightSidebar } from 'components';
import { Footer } from 'components/footer/footer';
import { Sticky } from 'components/sticky/sticky';
import { Toastrs } from 'components/toastrs/toastrs';
import { sideMenuContent } from './side-menu-content';
import { Navbar } from './navbar';
import './style/navbar.scss';

export class NavbarContainer extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    //                   the eslint-disable-line below is needed
    location: PropTypes.object.isRequired // eslint-disable-line
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
        <div id='navbar' styleName='flex min-height-100'> {/* todo. test to merge these two tags */}
          <Navbar
            visible={navbarIsVisible}
            sideMenuContent={sideMenuContent}
            activeItem={this.state.activeItem}
            setActiveItem={this.setActiveItem}
          />
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
