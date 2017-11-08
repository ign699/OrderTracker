import React, {Component} from 'react';
import axios from 'axios'
import DateInput from "./DateInput"
import SelectInput from "./SelectInput";
import NumberInput from "./NumberInput";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import './OrderForm.css';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";


class OrderForm extends Component {
  state = {
    customers: [],
    products: [],
    containers: [],
    types: [],
    details: {},
    price: "",
    customer: "",
    deliverBy: "",
    payBy: "",
    success: false,
    loaded: false
  };

  changeLoadedState = (state) => {
    this.setState({loaded: state})
  };

  componentDidMount = () => {
    axios.all([
      axios.get('customers'),
      axios.get('products'),
      axios.get('containers'),
      axios.get('types')
    ]).then(response => {
      const customers = {};
      const products = {};
      const containers = {};
      const types = {};
      const details = {};

      response[0].data.forEach(customer => customers[customer.name] = {id: customer._id, container:customer.prefferedContainer.name});
      response[2].data.forEach(container => containers[container.name] = container._id);
      response[1].data.forEach(product => {
        products[product.name] = product._id;
        details[product.name] = {amount: "", container: Object.keys(containers)[0]}
      });
      response[3].data.forEach(type => types[type.name] = type._id);
      this.setState({
        deliverBy: OrderForm.daysFromNow(0),
        payBy: OrderForm.daysFromNow(14),
        customer: Object.keys(customers)[0],
        type: Object.keys(types)[0],
        customers: customers,
        products: products,
        containers: containers,
        types: types,
        details: details
      });
      this.changeLoadedState(true);
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const details = [];

    for (let detail in this.state.details) {
      let entry = this.state.details[detail];
      if (entry.amount !== "") {
        details.push({
          product: this.state.products[detail],
          quantity: entry.amount,
          container: this.state.containers[entry.container]
        })
      }
    }


    const body = {
      toBePaidDate: this.state.payBy,
      toBeDeliveredDate: this.state.deliverBy,
      cost: parseFloat(this.state.price),
      type: this.state.types[this.state.type],
      customer: this.state.customers[this.state.customer].id,
      details: details
    };

    axios.post('/orders/add', body).then((response) => {
      if (response.status === 200) {
        const newDetails = {};
        Object.keys(this.state.products).forEach(key =>
          newDetails[key] = {amount: "", container: Object.keys(this.state.containers)[0]}
        );
        this.setState(prevState => ({
          deliverBy: OrderForm.daysFromNow(0),
          payBy: OrderForm.daysFromNow(14),
          customer: Object.keys(prevState.customers)[0],
          type: Object.keys(prevState.types)[0],
          details: newDetails,
          price: 0,
          success: true,
        }));

      }
    });
  };

  handleFormChange = (input) => (event) => {
    this.setState({[input]: event.target.value})
  };


  handleContainerChange = (product) => (event) => {
    const value = event.target.value;
    this.setState(prevState => {
      const details = prevState.details;
      details[product].container = value;
      details[product].amount = "";
      return {
        details: details
      }
    });
  };

  handleAmountChange = (product) => (event) => {
    const value = event.target.value;
    this.setState(prevState => {
      const details = prevState.details;
      details[product].amount = value;
      return {
        details: details
      }
    });
  };

  handleCustomerContainerChange = (event) => {
    const customer = event.target.value;
    const container = this.state.customers[customer].container;
    console.log(container);
    this.setState(prevState => {
        const details = prevState.details;
        Object.keys(details).forEach(detail => details[detail].container = container);
        return {
          details: details
        }
      }
    )
  };

  render() {
    if (this.state.loaded) {
      return (
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form-group">

            <SelectInput value={this.state.customer} onChange={(event) => {this.handleCustomerContainerChange(event);this.handleFormChange("customer")(event)}}
                         label="Customer" options={Object.keys(this.state.customers)} boxSize="big"/>
            <DateInput value={this.state.deliverBy} label="Deliver by" onChange={this.handleFormChange("deliverBy")}/>
            <DateInput value={this.state.payBy} label="Pay by" onChange={this.handleFormChange("payBy")}/>
            <SelectInput value={this.state.type} onChange={this.handleFormChange("type")} label="Order type"
                         options={Object.keys(this.state.types)} boxSize="big"/>
            <NumberInput step="0.01" value={this.state.price} label="Price" onChange={this.handleFormChange("price")} boxSize="big"/>
          </div>

          <table>
            <thead>
            <tr>
              <th>Product</th>
              <th>Container</th>
              <th>Amount</th>
            </tr>
            </thead>
            <tbody>
            {Object.keys(this.state.products).map(product =>
              <tr>
                <td>{product}</td>
                <td>
                  <SelectInput value={this.state.details[product]["container"]} onChange={this.handleContainerChange(product)}
                            options={Object.keys(this.state.containers)} boxSize="small"/>
                </td>
                <td>
                    <NumberInput value={this.state.details[product]["amount"]} onChange={this.handleAmountChange(product)}
                    step={this.state.details[product]["container"]==="kilo"?"0.001":"1"} boxSize="small"/>
                </td>
              </tr>
            )}
            </tbody>
          </table>
          <button onClick={this.handleSubmit} className="btn btn-primary btn">Submit</button>
          <div className={"alert alert-success fade in " + (this.state.success ? "show-info" : "hide-info")}>
            <a className="close" onClick={() => this.setState({success: false})}>&times;</a>
            <strong>Success!</strong>
            <br/>
            Order successfully added!
          </div>
        </form>

      )
    } else {
      return <LoadingSpinner/>

    }

  }
}

OrderForm.daysFromNow = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return year + '-' + month + '-' + day;
};


export default OrderForm;