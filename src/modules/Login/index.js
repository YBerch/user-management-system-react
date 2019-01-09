// @flow
import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../../actions/actionCreators';

type Props = {
  authorize: boolean,
  permission: string,
  login: Function,
  history: Object
}

const Login = (props: Props): React.Element<any> => {

  const [credentials, setCredentials]: [Object, Function] = useState({email: '', password: ''});

  useEffect(() => {
    const permission = props.permission === 'administrator' || props.permission === 'moderator';
    if(props.authorize && permission){
      props.history.push('/users')
    }
  }, [props.authorize]);

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
      <form onChange={onChange}>
        <input type='Email' name='email' placeholder='email'/>
        <input type='Password' name='password' placeholder='password'/>
        <button onClick={onSubmit}>Login</button>
      </form>
    </div>
  )
};

const mapStateToProps = ({ session }) => ({
  authorize: session.authorize,
  permission: session.user.permission
});

const mapDispatchToProps = dispatch => bindActionCreators({
  login
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
