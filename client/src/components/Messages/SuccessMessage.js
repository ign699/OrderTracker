import React, { Component } from 'react';

const SuccessMessage = (props) => {
  return (
    <div className={"alert alert-success fade in " + (this.state.success ? "show-info" : "hide-info")}>
      <a className="close" onClick={() => this.setState({success: false})}>&times;</a>
      <strong>Success!</strong>
      <br/>
      Order successfully added!
    </div>
  )
};
