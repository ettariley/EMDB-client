import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'react-bootstrap';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

import MainView from './components/main-view/main-view';

// Import statement to indicate you need to bundle './index.scss'
import './index.scss';

// Create Redux store
const store = createStore(moviesApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Main component
class EMDBApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container className='bg-dark'>
          <MainView />
        </Container>
      </Provider>
    );
  }
}

// Finds root of app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(EMDBApplication), container);