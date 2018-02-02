import React from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  Icon,
  Menu,
  Segment,
  Button,
  Tab,
  Divider,
  Transition
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { logout } from 'redux/modules/user';
import { openNotification } from 'redux/modules/notification';
import { ChangePasswordForm } from 'components/forms';
import { notificationType } from 'components/notification/notification';
import { MenuItem } from './menu-item';
import './style/right-sidebar.scss';

class RightSidebar extends React.Component {
  state = { activeIndex: 1 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { visible } = this.props;

    const panes = [
      {
        menuItem: <Button key='tab1' styleName='tab-selector'>Notifications</Button>,
        render: () => <Tab.Pane styleName='tab-pane'/>
      },
      {
        menuItem: <Button key='tab2' icon='setting' styleName='tab-selector'/>,
        render: () => {
          const { activeIndex } = this.state;

          return (
            <Tab.Pane styleName='tab-pane'>

              {/* Settings tab title */}
              <Menu.Item name='settings' styleName='settings-title'>
                <Segment basic compact size='massive' styleName='basic-compact-segment'>
                  <Icon name='setting'/>
                  Settings
                </Segment>
                <Segment basic compact styleName='basic-compact-segment'>
                  Manage your account
                </Segment>
              </Menu.Item>

              <Divider fitted/>

              {/* 'Change password' menu item */}
              <Accordion>
                <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick} styleName='no-padding'>
                  <MenuItem text='Change password' icon={activeIndex === 0 ? 'minus' : 'plus'}/>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                  <Segment basic width='16' textAlign='left' styleName='menu-item-form'>
                    <ChangePasswordForm
                      onSubmit={this.props.changePassword} // eslint-disable-line
                    />
                  </Segment>
                </Accordion.Content>
              </Accordion>

              <Divider fitted/>

              <MenuItem text='Log out' icon='log out' callback={this.props.logout}/>

              <Divider fitted/>
            </Tab.Pane>
          );
        }
      }
    ];
    return (
      <Transition visible={visible} animation='fly left' duration={600}>
        <div styleName='right-sidebar'>
          <Tab panes={panes} styleName='sidebar-tab'/>
        </div>
      </Transition>
    );
  }
}

RightSidebar.propTypes = {
  visible: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout());
    dispatch(push('login'));
  },
  /**
   * This is just temporary
   * until API for change-password is implemented
   */
  changePassword: () =>
    dispatch(openNotification({
      header: 'Password changed',
      content: 'Your password has been successfully changed',
      type: notificationType.SUCCESS
    }))
});

const RightSidebarContainer =
  connect(
    null,
    mapDispatchToProps,
  )(RightSidebar);

export { RightSidebarContainer as RightSidebar };
