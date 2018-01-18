export const sideMenuContent = [
  {
    menuItem: { caption: 'Dashboard', icon: 'block layout', link: 'dashboard' }
  },

  {
    menuItem: { caption: 'Resellers', icon: 'users', link: 'resellers' }
    // subMenu: ['All users', 'Registration', 'Download user report']
  },

  {
    menuItem: {
      caption: 'Log out',
      icon: 'log out',
      callback: instance => instance.props.logout()
    }
  }

];
