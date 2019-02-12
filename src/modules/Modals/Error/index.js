// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showModal, hideModal } from "../../../actions/actionCreators";
import * as types from '../../../actions/actionTypes';
import './style.css';

type Props = {
  showModal: Function,
  hideModal: Function,
  message: string,
  returnTo: string
}

const Error = (props: Props): React.Element<any> => {

  const hideModal = e => {
    e.preventDefault();
    props.hideModal()
  };

  const redirectTo = e => {
    e.preventDefault();
    switch (props.returnTo){
      case 'CreateUserModal':
        props.showModal(types.MODAL_TYPE_CREATE_USER);
        break;
      case 'CreateGroupModal':
        props.showModal(types.MODAL_TYPE_CREATE_GROUP);
        break;
      default:
        props.hideModal()
    }
  };

  return(
    <div className="modal">
      <div className="modal-content warning-content">
        <div className="modal-header warning-header">
          <span className="close" onClick={hideModal}>&times;</span>
          <div className='modal-header-title'>Warning</div>
        </div>
        <div className="modal-body warning">
          <h1>{props.message}</h1>
        </div>
        <div className='modal-button-container'>
          <div className='modal-button-warning' onClick={redirectTo}>OK</div>
        </div>
      </div>

    </div>
  )
};

const mapDispatchToProps = dispatch => bindActionCreators({
  showModal,
  hideModal
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Error);
