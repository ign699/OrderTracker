import React, { Component } from 'react';
import PageSwitcher from './PageSwitcher'
import axios from 'axios';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./OrderList.css"
import OrderDetailsModal from "./OrderDetailsModal";
import EditProductsModal from "./EditProductsModal"
import ListFilter from "./ListFilter";

class OrderList extends React.Component {
    state = {
      page: 1,
      length: 10,
      orders: [],
      hasNext: false,
      hasPrevious: false,
      loaded: false,
      showModal: false,
      details: [],
      currentOrderId: "",
      index: 0,
      showProductsModal: false,
      products: {},
      containers: {},
      newDetails: {},
      customers: [],
      productDetailsChanged: false,
      saveChangesEnabled: false
    };

    changeLoadedState = (state) => {
      this.setState({loaded: state})
    };

    resetNewDetails = () => {
      this.setState(prevState => {
        const newDetails = {};
        Object.keys(prevState.products).forEach(product => {
          newDetails[product] = {amount: "", container: Object.keys(prevState.containers)[0]}
        });
        return {
          newDetails: newDetails
        }
      });
    };

    componentDidMount = () => {
      axios.get("/api/orders/" + this.state.page + "/" + this.state.length)
        .then(results => {
          this.setState({
            orders: results.data.results,
            hasNext: results.data.hasNext
          });
          this.changeLoadedState(true);
        });
      axios.all([axios.get("/api/products"), axios.get("/api/containers"), axios.get("/api/customers")])
        .then(response => {
          const products = {};
          const containers = {};

          response[0].data.forEach(product => products[product.name] = product._id);
          response[1].data.forEach(container => containers[container.name] = container._id);

          const newDetails = {};

          response[0].data.forEach(product => {
            products[product.name] = product._id;
            newDetails[product.name] = {amount: "", container: Object.keys(containers)[0]}
          });

          this.setState({
            products: products,
            containers: containers,
            newDetails: newDetails,
            customers: response[2].data
          })

      })
    };


  handleContainerChange = (product) => (event) => {
    const value = event.target.value;
    this.setState(prevState => {
      const details = prevState.newDetails;
      details[product].container = value;
      details[product].amount = "";
      return {
        newDetails: details,
        productDetailsChanged: true
      }
    });
  };

  handleAmountChange = (product) => (event) => {
    const value = event.target.value;
    this.setState(prevState => {
      const details = prevState.newDetails;
      details[product].amount = value;
      return {
        newDetails: details,
        productDetailsChanged: true
      }
    });
  };

    changePage = (value) => {
      this.changeLoadedState(false);
        axios.get("/api/orders/" + (this.state.page + value) + "/" + this.state.length)
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

    closeModal = () => {
      this.resetNewDetails();
      this.setState({
        showModal: false,
        saveChangesEnabled: false
      })
    };

    showProductsModal = (e) => {
      e.preventDefault();
      this.setState({showProductsModal: true});
      this.setState(prevState => {
        prevState.details.forEach(detail => {
          prevState.newDetails[detail.product.name].container = detail.container.name;
          prevState.newDetails[detail.product.name].amount = detail.quantity;
        })
      })
    };

    closeProductsModal = () => {
      this.resetNewDetails();
      this.setState({
        showProductsModal: false,
        productDetailsChanged: false
      })
    };

    applyProductChanges = (e) => {
      e.preventDefault();
      this.setState(prevState => {
        const details = [];
        Object.keys(prevState.newDetails).forEach(product => {
          if(prevState.newDetails[product].amount !== "") {
            details.push({
              container: {name: prevState.newDetails[product].container},
              product: {name: product},
              quantity: prevState.newDetails[product].amount,
            })
          }
        });
        return {
          details: details,
          showProductsModal: false,
          saveChangesEnabled: true
        }
      })
    };

    rowClick = (event) => {
      const id = event.target.parentNode.dataset.orderid;
      const index = event.target.parentNode.rowIndex-1;
      console.log(this.state.orders[index]);
      axios.get("/api/order/details/" + id)
        .then(results => {
          this.setState({
            details: results.data.details,
            showModal: true,
            index: index,
            currentOrderId: id
          })
        });
    };

    saveChanges = (e) => {
      e.preventDefault();
      const details = [];

      for (let detail in this.state.newDetails) {
        let entry = this.state.newDetails[detail];
        if (entry.amount !== "") {
          details.push({
            product: this.state.products[detail],
            quantity: entry.amount,
            container: this.state.containers[entry.container],
          })
        }
      }
      console.log(details);
      axios.post('/api/orders/update/products/' + this.state.currentOrderId,{details: details});
      this.setState({
        showModal: false,
        saveChangesEnabled: false
      });
      this.resetNewDetails();
    };

    reloadOrders = (event) => {
      this.setState({
        loaded: false
      });
      const target = event.target;
      const customerId = target.options[target.selectedIndex].value;
      axios.get("/api/orders/" + customerId + "/" + "1" + "/" + "10" )
        .then(results => {
          this.setState({
            orders: results.data.results,
            hasNext: results.data.hasNext,
            hasPrevious: false,
            page: 1
          });
          this.changeLoadedState(true);
        })
    };
    render() {
      if(this.state.loaded) {
        return (
          <div>
            <ListFilter reloadOrders={this.reloadOrders} customers={this.state.customers} />
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
              {this.state.orders.map((order, i) => <tr key={order._id} data-orderid={order._id} onClick={this.rowClick}><td>{order.customer.name}</td><td>{order.toBePaidDate.slice(0, 10)}</td><td>{order.toBeDeliveredDate.slice(0,10)}</td><td>{order.cost}</td></tr>)}
              </tbody>
            </table>
            <PageSwitcher page={this.state.page} changePage={this.changePage} hasPrevious={this.state.hasPrevious} hasNext={this.state.hasNext}/>
            {this.state.showModal?<OrderDetailsModal saveChangesEnabled={this.state.saveChangesEnabled} saveChanges={this.saveChanges} showProductsModal={this.showProductsModal} orderInfo={this.state.orders[this.state.index]}  details={this.state.details} closeModal={this.closeModal}/>:""}
            {this.state.showProductsModal?<EditProductsModal applyProductChanges={this.applyProductChanges} productDetailsChanged={this.state.productDetailsChanged} handleContainerChange={this.handleContainerChange} handleAmountChange={this.handleAmountChange} containers={this.state.containers} products={this.state.products} details={this.state.newDetails} closeProductsModal={this.closeProductsModal}/>:""}
          </div>
        )
      } else {
        return <LoadingSpinner />
      }

    }
}

export default OrderList;