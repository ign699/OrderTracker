import React, { Component } from 'react';
import '../App.css';
import OrderForm from './OrderForm/OrderForm'

class App extends Component {
  render() {
    return (
      <div className="App">
        <OrderForm />
      </div>
    );
  }
}

export default App;
