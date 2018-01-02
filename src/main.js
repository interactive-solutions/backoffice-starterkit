import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './redux/store/create-store';
import history from 'utils/history';
import 'semantic-ui-css/semantic.min.css';
import './styles/main.scss';
import 'api';
// Store Initialization
// ------------------------------------
const store = createStore(window.__INITIAL_STATE__);

// Render Setup
// ------------------------------------
const MOUNT_NODE = document.getElementById('root');

let render = () => {
  const App = require('./containers/App').App;
  const routes = require('./routes/index').default(store);

  ReactDOM.render(
    <App store={store} routes={routes} history={history}/>,
    MOUNT_NODE
  );
};

// Development Tools
// ------------------------------------
if (__DEV__) {
  if (module.hot) {
    const renderApp = render;
    const renderError = (error) => {
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error}/>, MOUNT_NODE);
    };

    render = () => {
      try {
        renderApp();
      } catch (e) {
        console.error(e);
        renderError(e);
      }
    };

    // Setup hot module replacement
    module.hot.accept([
      './containers/App',
      './routes/index'
    ], () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      })
    );
  }
}

// Let's Go!
// ------------------------------------
if (!__TEST__) render();
