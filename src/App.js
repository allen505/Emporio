import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '../node_modules/antd/es/button'

class App extends React.Component{
  render() {
    return (
      <div className="App">
        <Button type="primary">Button</Button>
      </div>
    );
  }
}

export default App;
