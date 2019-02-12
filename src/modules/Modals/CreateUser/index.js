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
    permission: 'user',
    groups: [],
    password: ''
  };

  const [credentials, setCredentials]: [Object, Function] = useState(initialCredentials);
  const [emailValid, setEmailValid]: [boolean, Function] = useState(true);
  const [phoneValid, setPhoneValid]: [boolean, Function] = useState(true);

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

  const emailValidation = (value: string) => {
    return !!value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm);
  };

  const phoneValidation = (value: string) => {
    return !!value.match(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g) && value.length > 12;
  };

  const commonValidation = () => (
    Object.values(credentials).some(item => !item) && emailValid && phoneValid
  );

  const onChange = e => {
    e.preventDefault();

    switch (e.target.name){
      case 'email':
        setEmailValid(emailValidation(e.target.value));
        break;
      case 'phone':
        setPhoneValid(phoneValidation(e.target.value));
        break;
    }
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
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
            <input name='firstName' placeholder='first name'/>
            <input name='lastName' placeholder='last name'/>
            <input className={`${!emailValid ? 'validation-warning' : ''}`} name='email' placeholder='email'/>
            <input className={`${!phoneValid ? 'validation-warning' : ''}`} name='phone' placeholder='phone'/>
            <select className='permission-select' name='permission'>
              <option value='user'>user</option>
              <option value='moderator'>moderator</option>
              <option value='administrator'>administrator</option>
            </select>
            <input type='password' name='password' placeholder='password'/>
            <div className='modal-button-container'>
              <div
                className={`modal-button-save ${commonValidation() ? 'disabled' : ''}`}
                onClick={onSubmit}>Create</div>
            </div>
          </form>
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
