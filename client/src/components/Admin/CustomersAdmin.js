import React, { Component } from 'react';
import axios from 'axios'
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import AddCustomerModal from "./AddCustomerModal"
import PageSwitcher from "../PageSwitcher/PageSwitcher";

class CustomersAdmin extends Component {
  state = {
    customers: {},
    customer: "",
    containers: {},
    container: "",
    loaded: false,
    showModal: false,
    customerValid: true,
    page: 1,
    length: 0,
    hasPrevious: false,
    hasNext: false
  };

  componentDidMount = () => {
    axios.all([
      axios.get('/api/customers/1/10'),
      axios.get('/api/containers')
    ]).then((response) => {
      const customers = Object.create(null);
      response[0].data.results.forEach(customer => customers[customer.name] = {id: customer._id, container: customer.prefferedContainer.name});
      const containers = Object.create(null);
      response[1].data.forEach(container => containers[container.name] = container._id);
      this.setState({
        customers: customers,
        containers: containers,
        container: Object.keys(containers)[0],
        loaded: true,
        hasNext: response[0].data.hasNext
      })
    })
  };

  customerChange = (event) => {
    const newValue = event.target.value;
    if(Object.keys(this.state.customers).includes(newValue)) {
      this.setState({
        customer: newValue,
        customerValid: false
      })
    } else {
      this.setState({
        customer: newValue,
        customerValid: true
      })
    }
  };
  containerChange = (event) => {
    this.setState({container: event.target.value})
  };

  createCustomer = (event) => {
    event.preventDefault();
    const body = {
      name: this.state.customer,
      container: this.state.containers[this.state.container]
    };
    axios.post('/api/customer', body)
      .then((response) => {
        console.log(response);
        this.setState({
          loaded: false,
          customer: "",
          showModal: false,
          customerValid: true,
        });
        axios.get("/api/customers")
          .then((response) => {
            const customers = Object.create(null);
            response.data.forEach(customer => customers[customer.name] = {id: customer._id, container: customer.prefferedContainer.name});
            this.setState({
              customers: customers,
              loaded: true
            })
          })
      })
  };

  changePage = (to) => {
    this.setState({
      loaded: false
    })
    const newPage = this.state.page + to;
    axios.get('/api/customers/' + newPage + '/10')
      .then(response => {
        const customers = Object.create(null);
        response.data.results.forEach(customer => customers[customer.name] = {id: customer._id, container: customer.prefferedContainer.name});
        this.setState({
          customers: customers,
          hasNext: response.data.hasNext,
          page: newPage,
          hasPrevious: newPage!==1,
          loaded: true
        })
      })
  };

  render() {
    const {
      hasNext,
      hasPrevious,
      page,
    } = this.state;
    if(this.state.loaded) {
      return (
        <div>
          <button className="btn btn-success" onClick={() => this.setState({showModal: true})}><i className="fa fa-user-o" aria-hidden="true"></i>  Add customer</button>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>
                  Name
                </th>
                <th>
                  Preffered container
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(this.state.customers).map(customer => <tr><td>{customer}</td><td>{this.state.customers[customer].container}</td></tr>)}
            </tbody>
          </table>
          <PageSwitcher hasNext={hasNext}
                        hasPrevious={hasPrevious}
                        page={page}
                        changePage={this.changePage}/>
          {this.state.showModal?<AddCustomerModal createCustomer={this.createCustomer} container={this.state.container} containerChange={this.containerChange} customer={this.state.customer} customerValid={this.state.customerValid} customerChange={this.customerChange} containers={Object.keys(this.state.containers)} closeModal={() => this.setState({showModal: false})}/>:""}

        </div>
      )
    } else {
      return (<LoadingSpinner />)
    }
  }
}

export default CustomersAdmin;