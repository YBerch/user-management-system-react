// @flow
import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser, clearCurrentUser, deleteUser, showModal, clearUsersError } from '../../actions/actionCreators';
import Info from './Info';
import UserGroups from './UserGroups';
import './style.css';
import * as types from "../../actions/actionTypes";

type Props = {
  usersList: Array<Object>,
  currentUser: Object,
  match: Object,
  getUser: Function,
  clearCurrentUser: Function,
  deleteUser: Function,
  showModal: Function,
  clearUsersError: Function,
  deletedUser: boolean,
  history: Object,
  error: boolean,
  errorMessage: string
}

const User = (props: Props): React.Element<any> => {

  const [currentUser, setCurrentUser]: [Object, Function] = useState({});

  useEffect(() => {

    /** fetch single user or put current user to the state **/
    if(!props.currentUser) {
      props.getUser(props.match.params.id);
    } else {
      setCurrentUser(props.currentUser)
    }

    /** remove current user from the redux store when component will unmount **/
    return () => props.currentUser && props.clearCurrentUser();
  }, [props.currentUser]);

  useEffect(() => {
    props.deletedUser && props.history.push('/users');
    if(props.error){
      props.clearUsersError();
      props.showModal(types.MODAL_TYPE_ERROR, {message: props.errorMessage});

    }
  }, [props.deletedUser, props.error]);

  const showContent = () => {
    if(Object.keys(currentUser).length) {
      return (
        <div>
          <div className='row'>
            <div className='column left'>
              <div className='user-title'>User Info:</div>
              <Info currentUser={currentUser}/>
            </div>
            <div className='column right'>
              <div className='user-title'>User Groups:</div>
              <UserGroups currentUser={currentUser}/>
            </div>
          </div>
          <div onClick={onDeleteUser} className={`delete-button ${currentUser.groups.length ? 'disabled' : ''}`}>
            Delete user
          </div>
        </div>
      )
    }
  };

  const onDeleteUser = e => {
    e.preventDefault();
    props.deleteUser(currentUser._id);
  };

  return(
    <div>
      <div className='user-content'>
        {showContent()}
      </div>
    </div>
  )
};

const mapStateToProps = ({ users }) => ({
  usersList: users.data.list,
  currentUser: users.currentUser,
  deletedUser: users.deletedUser,
  error: users.error,
  errorMessage: users.errorMessage
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUser,
  clearCurrentUser,
  deleteUser,
  showModal,
  clearUsersError
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
