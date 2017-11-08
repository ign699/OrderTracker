import React, { Component } from 'react';

const NumberInput = (props) => {
  return (
    <div>
      {props.label?<label>{props.label}</label>:""}
      <input type="number" min="0" step={props.step} value={props.value} className={"input input-" + (props.boxSize==="big"?"lg":"sm")}
             onChange={props.onChange}/>
    </div>
  )
};

export default NumberInput;