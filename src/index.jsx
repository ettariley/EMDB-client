import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view';
import { Container } from 'react-bootstrap';

// Import statement to indicate you need to bundle './index.scss'
import './index.scss';

// Main component
class EMDBApplication extends React.Component {
  render() {
    return (
      <Container className='bg-dark'>
        <MainView />
      </Container>
    );
  }
}

// Finds root of app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(EMDBApplication), container);