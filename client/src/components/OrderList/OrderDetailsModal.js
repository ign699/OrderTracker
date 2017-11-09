import React from 'react'

const OrderDetailsModal = (props) => {
  return (
    <div className="modal" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <form>
            <div className="modal-header">
              <button type="button" className="close" onClick={props.closeModal}>&times;</button>
              <h4 className="modal-title">Order details: </h4>
            </div>
            <div className="modal-body">
              <table className="orderInfo">
                <tbody>
                  <tr><td className="orderDetail">Customer Name: </td><td>{props.orderInfo.customer.name}</td></tr>
                  <tr><td className="orderDetail">Cost: </td><td>{props.orderInfo.cost?props.orderInfo.cost:"not given"}</td></tr>
                  <tr><td className="orderDetail">Deliver by: </td><td>{props.orderInfo.toBeDeliveredDate.slice(0, 10)}</td></tr>
                  <tr><td className="orderDetail">Pay by: </td><td>{props.orderInfo.toBePaidDate.slice(0, 10)}</td></tr>
                </tbody>
              </table>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Container</th>
                    <th>Quantity</th>
                    <th><button onClick={props.showProductsModal} className="btn btn-success"><i className="fa fa-pencil-square-o" aria-hidden="true"></i>Edit</button></th>
                  </tr>
                </thead>
                <tbody>
                {props.details.map(detail => <tr><td>{detail.product.name}</td><td>{detail.container.name}</td><td>{detail.quantity}</td><td></td></tr>)}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button disabled={!props.saveChangesEnabled} type="submit" className="btn btn-primary" onClick={props.saveChanges}>Save changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};

export default OrderDetailsModal;