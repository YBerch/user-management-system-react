// @flow
import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser, deleteUser, showModal, clearUsersError } from '../../actions/actionCreators';
import Info from './Info/index';
import UserGroups from './UserGroups/index';
import * as types from '../../actions/actionTypes';
import './style.css';

type Props = {
  usersList: Array<Object>,
  currentUser: Object,
  match: Object,
  getUser: Function,
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
    if(!props.currentUser || props.currentUser._id !== props.match.params.id) {
      props.getUser(props.match.params.id);
    } else {
      setCurrentUser(props.currentUser)
    }
  }, [props.currentUser, props.match.params.id]);

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
              <div onClick={onDeleteUser} className={`delete-button`}>
                Delete user
              </div>
            </div>
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
  deleteUser,
  showModal,
  clearUsersError
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
