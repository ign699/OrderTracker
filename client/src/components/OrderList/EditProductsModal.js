import React from 'react'
import "./OrderList.css"
import NumberInput from "../OrderForm/NumberInput";
import SelectInput from "../OrderForm/SelectInput";

const EditProdcutsModal = (props) => {
  return (
    <div className="modal modal-products" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <form>
            <div className="modal-header">
              <button type="button" className="close" onClick={props.closeProductsModal}>&times;</button>
              <h4 className="modal-title">Editing entries: </h4>
            </div>
            <div className="modal-body">
              <table>
                <thead>
                <tr>
                  <th>Product</th>
                  <th>Container</th>
                  <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(props.products).map(product =>
                  <tr>
                    <td>{product}</td>
                    <td>
                      <SelectInput value={props.details[product]["container"]} onChange={props.handleContainerChange(product)}
                                   options={Object.keys(props.containers)} boxSize="small"/>
                    </td>
                    <td>
                      <NumberInput value={props.details[product]["amount"]} onChange={props.handleAmountChange(product)}
                                   step={props.details[product]["container"]==="kilo"?"0.001":"1"} boxSize="small"/>
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button disabled={!props.productDetailsChanged} onClick={props.applyProductChanges} type="submit" className="btn btn-primary">Apply</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};

export default EditProdcutsModal;

