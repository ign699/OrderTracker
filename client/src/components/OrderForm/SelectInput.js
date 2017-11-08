import React, { Component } from 'react';

const SelectInput = (props) => {
  return (
    <div>
      {props.label?<label>{props.label}</label>:""}
      <select value={props.value} onChange={props.onChange} className={"input input-" + (props.boxSize==="big"?"lg":"sm")}>
        {props.options.map(option => <option>{option}</option>)}
      </select>
    </div>
  )
};

export default SelectInput;