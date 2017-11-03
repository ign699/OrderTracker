import React, { Component } from 'react';
import PageSwitcher from './PageSwitcher'
import axios from 'axios';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./OrderList.css"

class OrderList extends React.Component {
    state = {
      page: 1,
      length: 10,
      orders: [],
      hasNext: false,
      hasPrevious: false,
      loaded: false
    };

    changeLoadedState = (state) => {
      this.setState({loaded: state})
    };
    componentDidMount = () => {
      axios.get("orders/" + this.state.page + "/" + this.state.length)
        .then(results => {
          console.log(results.data);
          this.setState({
            orders: results.data.results,
            hasNext: results.data.hasNext
          });
          this.changeLoadedState(true);
        })
    };
    changePage = (value) => {
      this.changeLoadedState(false);
        axios.get("orders/" + (this.state.page + value) + "/" + this.state.length)
          .then((response) => {
            this.setState(prevState => ({
              page: prevState.page + value,
              orders: response.data.results,
              hasNext: response.data.hasNext,
              hasPrevious: (prevState.page + value) !== 1
            }));
            this.changeLoadedState(true)
          })
    };

    render() {
      if(this.state.loaded) {
        return (
          <div>
            <table className="table table-bordered">
              <thead>
              <tr>
                <th>Customer</th>
                <th>Pay by</th>
                <th>Deliver by</th>
                <th>Value</th>
              </tr>
              </thead>
              <tbody>
              {this.state.orders.map((order, i) => <tr><td>{order.customer.name}</td><td>{order.toBePaidDate.slice(0, 10)}</td><td>{order.toBeDeliveredDate.slice(0,10)}</td><td>{order.cost}</td></tr>)}
              </tbody>
            </table>
            <PageSwitcher page={this.state.page} changePage={this.changePage} hasPrevious={this.state.hasPrevious} hasNext={this.state.hasNext}/>
          </div>
        )
      } else {
        return <LoadingSpinner />
      }

    }
}

export default OrderList;