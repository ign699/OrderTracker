import React, { Component } from 'react';
import axios from 'axios'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../OrderForm.css';

class OrderForm extends Component {
  state = {
    customers: [],
    products: [],
    containers: [],
    types: [],
    details: {},
    price: 0,
    customer: "",
    deliverBy: "",
    payBy: "",
    customerValid: false,
    success: false
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

      response[0].data.forEach(customer => customers[customer.name] = customer._id);
      response[2].data.forEach(container => containers[container.name] = container._id);
      response[1].data.forEach(product => {
        products[product.name] = product._id;
        details[product.name] = {amount: "", container: Object.keys(containers)[0]}
      });
      response[3].data.forEach(type => types[type.name] = type._id);
      this.setState({
        deliverBy: OrderForm.daysFromNow(0),
        payBy: OrderForm.daysFromNow(14),
        customer: "Select customer..",
        type: Object.keys(types)[0]
      });
      this.setState({
        customers: customers,
        products: products,
        containers: containers,
        types: types,
        details: details
      });

      this.props.changeState(true);
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const details = [];
    this.validateSubmit();

    for(let detail in this.state.details) {
      let entry = this.state.details[detail];
      if(entry.amount !== "") {
        details.push({product: this.state.products[detail], quantity: entry.amount, container: this.state.containers[entry.container]})
      }
    }

    if(this.state.customerValid) {
      const body = {
        toBePaidDate: this.state.payBy,
        toBeDeliveredDate: this.state.deliverBy,
        cost: parseFloat(this.state.price),
        type: this.state.types[this.state.type],
        customer: this.state.customers[this.state.customer],
        details: details
      };
      axios.post('/orders/add', body).then((response) => {
        if(response.status === 200) {
          const newDetails = {};
          Object.keys(this.state.products).forEach(key =>
            newDetails[key] = {amount: "", container: Object.keys(this.state.containers)[0]}
          );
          this.setState( prevState => ({
            deliverBy: OrderForm.daysFromNow(0),
            payBy: OrderForm.daysFromNow(14),
            customer: "Select customer..",
            type: Object.keys(prevState.types)[0],
            details: newDetails,
            price: 0,
            success: true,
          }));

        }
      });
    }
  };

  handleFormChange = (input) => (event) => {
    this.setState({[input]: event.target.value})
  };

  handleCustomer = (event) => {
    this.validateSubmit(event.target.value);
    this.setState({customer: event.target.value});
  };

  handleEntriesChange = (product, type) => (event) => {
    const value = event.target.value;
    this.setState(prevState => {
      const details = prevState.details;
      details[product][type] = value;
      return {
        details: details
      }
    })
  };

  validateSubmit = (name) => {
    if(!Object.keys(this.state.customers).includes(name)) {
      this.setState({customerValid: false})
    } else {
      this.setState({customerValid: true})
    }
  };
  render() {
    if(this.props.loaded){
      return (
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form-group">

            <label>Customer</label>
            <select value={this.state.customer} className={"input input-lg " + (this.state.customerValid ? "" : "error")} onChange={this.handleCustomer}>
              <option disabled hidden>Select customer..</option>
              {Object.keys(this.state.customers).map(customer => <option>{customer}</option>)}
            </select>


            <label>Deliver by</label>
            <input type="date" value={this.state.deliverBy} className="input input-lg" onChange={this.handleFormChange("deliverBy")}/>

            <label>Pay by</label>
            <input type="date" value={this.state.payBy} className="input input-lg" onChange={this.handleFormChange("payBy")}/>

            <label>Order type</label>
            <select value={this.state.type} onChange={this.handleFormChange("type")} className="input input-lg">
              {Object.keys(this.state.types).map(type => <option>{type}</option>)}
            </select>

            <label>Price</label>
            <input type="number" step="0.01" value={this.state.price} min="0" max="10000" className="input input-lg" onChange={this.handleFormChange("price")}/>

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
                <td><select value={this.state.details[product]["container"]} className="input input-sm" onChange={this.handleEntriesChange(product, "container")}>{Object.keys(this.state.containers).map(container => <option>{container}</option>)}</select></td>
                <td><input value={this.state.details[product]["amount"]} className="input input-sm" type="number" onChange={this.handleEntriesChange(product, "amount")}/></td>
              </tr>
            )}
            </tbody>
          </table>
          <button disabled={!this.state.customerValid} className="btn btn-primary btn">Submit</button>
          <div className={"alert alert-success fade in " + (this.state.success?"show-info":"hide-info")} >
            <a className="close" onClick={() => this.setState({success: false})}>&times;</a>
            <strong>Success!</strong>
            <br />
            Order successfully added!
          </div>
        </form>

      )
    } else {
      return (<div className="spinner"><i className="fa fa-spinner" aria-hidden="true"></i></div>)
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