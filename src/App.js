import React, { Component } from 'react';
import { Provider } from 'react-redux';
import logo from './logo.svg';
import TestComponent from './components/TestComponent';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <img src={logo} className="App-logo" alt="logo" />
        <TestComponent/>
      </div>
    );
  }
}

export default App;
