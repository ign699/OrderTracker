import React from 'react';

const EditDetailsModal = (props) => {
  return (
    <div className="modal modal-products" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <form>
            <div className="modal-header">
              <button type="button" className="close" onClick={props.closeEditDetailsModal}>&times;</button>
              <h4 className="modal-title">Edit Details: </h4>
            </div>
            <div className="modal-body">
              <select className="input-lg">
                {props.customers.map(customer => <option value={customer._id}>{customer.name}</option>)}
              </select>
              <select type="date"></select>
              <select type="date"></select>

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

export default EditDetailsModal;