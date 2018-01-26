import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Image, Menu, Button, Icon } from 'semantic-ui-react';
// import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
// import { logout } from 'redux/modules/user';
import Logo from 'assets/svg/is_tab_black.svg';
import './style/header.scss';

export class DashHeader extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    callback: PropTypes.func,
    history: PropTypes.func, // eslint-disable-line
    // logout: PropTypes.func,
    toggleRightSidebar: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      scrollOnTop: true
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (window.pageYOffset > 0) {
      this.setState({ scrollOnTop: false });
    } else {
      this.setState({ scrollOnTop: true });
    }
  }

  render() {
    const { scrollOnTop } = this.state;
    const adjustMenuIcon = scrollOnTop ? '' : ' fixed-to-side';

    return (
      <Menu borderless style={{ marginBottom: '0px' }}>
        <Menu.Item position='left' styleName='borderless'>
          <div styleName={adjustMenuIcon}>
            <Button
              primary
              basic
              icon
              size='big'
              onClick={this.props.callback}
            >
              <Icon name='sidebar' inverted={!scrollOnTop}/>
            </Button>
          </div>
        </Menu.Item>
        <Menu.Item position='left' styleName='logo borderless'>
          <Header as='h2' textAlign='center' style={{ backgroundColor: 'transparent' }}>
            <Image src={Logo} size='mini'/>
            {this.props.title}
          </Header>
        </Menu.Item>
        <Menu.Item onClick={this.props.toggleRightSidebar}>
          <Header as='h3'>
            <Icon name='tasks' size='tiny'/>
          </Header>
        </Menu.Item>
      </Menu>

    );
  }
}
