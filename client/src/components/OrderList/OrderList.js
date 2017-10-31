import React, { Component } from 'react';
import axios from 'axios';

class OrderList extends React.Component {
    state = {
        page: 0
    }
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        )
    }
}

export default OrderList;