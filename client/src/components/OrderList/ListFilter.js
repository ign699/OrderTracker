import React, { Component } from 'react';


const ListFilter = (props) => {
  return (
    <div className="pull-left ListFilter">
      <select className="input-sm" onChange={props.reloadOrders}>
        <option selected disabled hidden>Select customer to filter by...</option>
        {props.customers.map(customer => <option value={customer._id}>{customer.name}</option>)}
      </select>
    </div>
  )
};

export default ListFilter;