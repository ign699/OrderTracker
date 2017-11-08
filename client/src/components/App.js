import React, { Component } from 'react';
import '../App.css';
import OrderForm from './OrderForm/OrderForm'
import OrderList from "./OrderList/OrderList";
import NavBar from "./NavBar/NavBar"
import CustomersAdmin from "./Admin/CustomersAdmin"
import {BrowserRouter as Router, Route} from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <div className="App">

        <Router>
          <div>
            <NavBar />
            <Route path={"/addorder"} component={OrderForm}/>
            <Route path={"/orders"} component={OrderList}/>
            <Route path={"/customeradmin"} component={CustomersAdmin}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
