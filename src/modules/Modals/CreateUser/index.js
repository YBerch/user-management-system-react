// @flow
import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showModal, hideModal, createUser, clearUsersError } from '../../../actions/actionCreators';
import * as types from '../../../actions/actionTypes';
import '../style.css';
import './style.css'

type Props = {
  showModal: Function,
  hideModal: Function,
  createUser: Function,
  clearUsersError: Function,
  createdUser: boolean,
  error: boolean,
  errorMessage: string
}

const CreateUserModal = (props: Props): React.Element<any> => {

  const initialCredentials = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    permission: '',
    groups: [],
    password: ''
  };

  const [credentials, setCredentials]: [Object, Function] = useState(initialCredentials);

  if(props.createdUser){
    props.showModal(types.MODAL_TYPE_SUCCESS, {message: 'User successful created!'})
  }

  useEffect(() => {
    if(props.error){
      props.clearUsersError();
      props.showModal(types.MODAL_TYPE_ERROR, {message: props.errorMessage, returnTo: 'CreateUserModal'});
    }
  }, [props.error]);

  const hideModal = e => {
    e.preventDefault();
    props.hideModal()
  };

  const onChange = e => {
    e.preventDefault();
    if(e.target.name === 'groups'){
      setCredentials({
        ...credentials,
        groups: e.target.value.split(',')
      })
    } else {
      setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
      })
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    props.createUser(credentials)
  };

  return(
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={hideModal}>&times;</span>
          <div className='modal-header-title'>Create new user</div>
        </div>
        <div className="modal-body">
          <form onChange={onChange} className='modal-create-user-form'>
            <input name='firstName' placeholder='first name' defaultValue='test'/>
            <input name='lastName' placeholder='last name' defaultValue='test'/>
            <input name='email' placeholder='email'/>
            <input name='phone' placeholder='phone'/>
            <input name='permission' placeholder='permission' defaultValue='user'/>
            <input name='groups' placeholder='groups' defaultValue='5c35e70976f6e5d76be76f8b,5c35e70976f6e5d76be76f8e,5c35e70976f6e5d76be76f8d,5c35e70976f6e5d76be76f8c'/>
            <input name='password' placeholder='password' defaultValue='test'/>
            <button onClick={onSubmit}>Create</button>
          </form>
        </div>
        <div className="modal-footer">
          <div className='modal-footer-title'>Modal Footer</div>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = ({ users }) => ({
  createdUser: users.createdUser,
  error: users.error,
  errorMessage: users.errorMessage
});

const mapDispatchToProps = dispatch => bindActionCreators({
  showModal,
  hideModal,
  createUser,
  clearUsersError
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUserModal);
