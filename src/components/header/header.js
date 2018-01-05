import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Image, Menu, Button, Icon } from 'semantic-ui-react';

export class DashHeader extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    callback: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      scrollOnTop: true
    };
  }

  handleScroll = (e) => {
    if (window.pageYOffset > 0) {
      this.setState({ scrollOnTop: false });
    } else {
      this.setState({ scrollOnTop: true });
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const { scrollOnTop } = this.state;
    let adjustMenuIcon = scrollOnTop ? '' : ' fixed-to-side';

    return (
      <Menu>
        <Menu.Item position='left' className='borderless'>
          <div className={adjustMenuIcon}>
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
        <Menu.Item position='right' className='logo borderless'>
          <Header as='h2' textAlign='center' style={{ backgroundColor: 'transparent' }}>
            <Image src='assets/images/logo.png' size='mini'/>
            {this.props.title}
          </Header>
        </Menu.Item>
      </Menu>

    );
  }
}
