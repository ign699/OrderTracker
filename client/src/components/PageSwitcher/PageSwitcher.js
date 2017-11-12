import React, { Component } from 'react';

const PageSwitcher = (props) => {
  return (
    <ul className="pager">
      <li className={props.hasPrevious?"":"disabled"} onClick={(e) => props.hasPrevious?props.changePage(-1):e.preventDefault()}><a> Previous</a></li>
      <li><span className="page">{props.page}</span></li>
      <li className={props.hasNext?"":"disabled"} onClick={(e) => props.hasNext?props.changePage(1):e.preventDefault()}><a>Next</a></li>
    </ul>
  )
};

export default PageSwitcher;


