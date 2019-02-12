// @flow
import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login, showModal, clearSessionError } from '../../actions/actionCreators';
import logo from '../../logo.svg';
import './style.css';
import * as types from "../../actions/actionTypes";

type Props = {
  authorize: boolean,
  permission: string,
  login: Function,
  showModal: Function,
  clearSessionError: Function,
  history: Object,
  error: boolean,
  errorMessage: string
}

const Login = (props: Props): React.Element<any> => {

  const [credentials, setCredentials]: [Object, Function] = useState({email: '', password: ''});

  useEffect(() => {
    const permission = props.permission === 'administrator' || props.permission === 'moderator';
    if(props.authorize && permission){
      props.history.push('/users');
    }
  }, [props.authorize]);

  useEffect(() => {
    if(props.error) {
      props.showModal(types.MODAL_TYPE_ERROR, {message: props.errorMessage});
      props.clearSessionError();
    }
  }, [props.error]);

  const onChange = e => {
    e.preventDefault();
      setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
      })
  };

  const onSubmit = e => {
    e.preventDefault();
    props.login(credentials)
  };

  return(
    <div>
      <div className="logo">
        <img src={logo} className="project-logo" alt="logo" />
        <span>User Managemant System</span>
      </div>
      <div className='login-form-container'>
        <form className='login-form' onChange={onChange}>
          <input type='Email' name='email' placeholder='email'/>
          <input type='Password' name='password' placeholder='password'/>
          <button className='login-button' onClick={onSubmit}>Login</button>
        </form>
      </div>
    </div>
  )
};

const mapStateToProps = ({ session }) => ({
  authorize: session.authorize,
  permission: session.user.permission,
  error: session.error,
  errorMessage: session.errorMessage
});

const mapDispatchToProps = dispatch => bindActionCreators({
  login,
  showModal,
  clearSessionError
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
