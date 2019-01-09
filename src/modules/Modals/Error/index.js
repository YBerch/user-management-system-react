// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showModal, hideModal } from "../../../actions/actionCreators";
import * as types from '../../../actions/actionTypes';

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
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={hideModal}>&times;</span>
          <div className='modal-header-title'>Error</div>
        </div>
        <div className="modal-body">
          <h1>{props.message}</h1>
        </div>
        <button onClick={redirectTo}>Ok</button>
        <div className="modal-footer">
          <div className='modal-footer-title'>Modal Footer</div>
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
