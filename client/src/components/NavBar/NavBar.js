import React, { Component } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import {Link} from 'react-router-dom'
class NavBar extends React.Component {
  state = {
    showDropdown: false
  };

  toggleShowDropdown = () => {
    this.setState(prevState => ({showDropdown: !prevState.showDropdown}))
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-default" role="navigation">

          <div className="navbar-header">
            <button onClick={this.toggleShowDropdown} type="button" className="navbar-toggle">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand">Brand</a>
          </div>


          <div className={this.state.showDropdown?"navbar-collapse":" collapse navbar-collapse"}>
            <ul className="nav navbar-nav">
              <li onClick={this.toggleShowDropdown}><Link to={"/orders"}>Orders</Link></li>
              <li onClick={this.toggleShowDropdown}><Link to={"/addorder"}>Add Order</Link></li>
              <li onClick={this.toggleShowDropdown}><Link to={"/customeradmin"}>Customer admin</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
};

export default NavBar;