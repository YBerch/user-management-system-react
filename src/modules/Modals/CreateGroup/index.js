// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showModal, hideModal, createGroup, clearGroupsError } from "../../../actions/actionCreators";
import { useState, useEffect } from 'react';
import * as types from "../../../actions/actionTypes";

type Props = {
  showModal: Function,
  hideModal: Function,
  createGroup: Function,
  clearGroupsError: Function,
  createdGroup: boolean,
  error: boolean,
  errorMessage: string
}

const CreateGroupModal = (props: Props): React.Element<any> => {

  const initialCredentials = {
    name: ''
  };

  const [credentials, setCredentials]: [Object, Function] = useState(initialCredentials);

  if(props.createdGroup){
    props.showModal(types.MODAL_TYPE_SUCCESS, {message: 'Group successful created!'})
  }

  useEffect(() => {
    if(props.error){
      props.clearGroupsError();
      props.showModal(types.MODAL_TYPE_ERROR, {message: props.errorMessage, returnTo: 'CreateGroupModal'});
    }
  }, [props.error]);

  const hideModal = (e) => {
    e.preventDefault();
    props.hideModal()
  };

  const onChange = e => {
    e.preventDefault();
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  };

  const onSubmit = e => {
    e.preventDefault();
    props.createGroup(credentials)
  };

  return(
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={hideModal}>&times;</span>
          <div className='modal-header-title'>Create new Group</div>
        </div>
        <div className="modal-body">
          <form onChange={onChange} className='modal-create-user-form'>
            <input name='name' placeholder='name'/>
            <div className='modal-button-container'>
              <div
                className={`modal-button-save ${Object.values(credentials).some(item => !item) ? 'disabled' : ''}`}
                onClick={onSubmit}>Create</div>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
};

const mapStateToProps = ({ groups }) => ({
  createdGroup: groups.createdGroup,
  error: groups.error,
  errorMessage: groups.errorMessage
});

const mapDispatchToProps = dispatch => bindActionCreators({
  showModal,
  hideModal,
  createGroup,
  clearGroupsError
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGroupModal);
