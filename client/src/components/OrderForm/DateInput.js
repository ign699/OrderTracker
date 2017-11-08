import React, { Component } from 'react';


const DateInput = (props) => {
  return(
    <div>
      <label>{props.label}</label>
      <input type="date" value={props.value} className="input input-lg" onChange={props.onChange}/>
    </div>
  )
};

export default DateInput;