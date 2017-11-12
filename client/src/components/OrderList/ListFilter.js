import React, { Component } from 'react';


const ListFilter = (props) => {
  return (
    <div className="pull-left ListFilter">
      <select onChange={props.handleCustomerFilterChange} value={props.currentCustomerFilter} className="input-sm">
        <option value={-1}>All</option>
        {props.customers.map(customer => <option value={customer._id}>{customer.name}</option>)}
      </select>
    </div>
  )
};

export default ListFilter;