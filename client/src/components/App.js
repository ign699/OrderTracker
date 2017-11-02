import React, { Component } from 'react';
import '../App.css';
import OrderForm from './OrderForm/OrderForm'
import OrderList from "./OrderList/OrderList";

class App extends Component {
  state = {
    loaded: true
  };


  checkLoaded = (change) => {
    this.setState({loaded: change});
  };


  render() {
    return (
      <div className="App">
        <OrderList loaded={this.state.loaded} changeLoaded={this.checkLoaded}/>
      </div>
    );
  }
}

export default App;
