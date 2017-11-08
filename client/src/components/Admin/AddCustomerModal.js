import React, { Component } from 'react';
import SelectInput from "../OrderForm/SelectInput"
import axios from 'axios'
import "./Admin.css"

const AddCustomerModal = (props) => {

  const validateSubmit = () => {

  };

  return (
    <div className="modal" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
        <form>
          <div className="modal-header">
            <button type="button" className="close" onClick={props.closeModal}>&times;</button>
            <h4 className="modal-title">Add new customer: </h4>
          </div>

          <div className="modal-body">
            <div className={"form-group " + (props.customerValid?"":"has-error")}>
              <label className="control-label">New customers name: </label>
              <input value={props.customer} placeholder="Enter customers name..." type="text" className="form-control" onChange={props.customerChange}/>
              {props.customerValid?"":<span className="help-block">This name is already taken!</span>}

            </div>

            <SelectInput value={props.container} onChange={props.containerChange} label="Customers preffered container"
                         options={props.containers} boxSize="big"/>
          </div>

          <div className="modal-footer">
            <button disabled={!(props.customerValid&&props.customer.length>0)} onClick={props.createCustomer} type="submit" className="btn btn-primary">Add</button>
          </div>
        </form>
        </div>
      </div>
    </div>
  )
};


export default AddCustomerModal;