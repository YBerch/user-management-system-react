// @flow
import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGroupsByUser, removeGroupFromUser } from '../../../actions/actionCreators';
import GroupItem from './GroupItem/index';
import AddGroupsToUser from '../../../components/ModalsTriggers/AddGroupsToUser/index';
import { uniqueKey } from '../../../helpers/index';
import './style.css';
import { useState } from "react";

type Props = {
  currentUser: Object,
  usersGroups: Object,
  getGroupsByUser: Function,
  removeGroupFromUser: Function,
  isFetching: boolean
};

const UserGroups = ({currentUser, ...props}: Props): React.Element<any> => {

  const [user, setUser]: [Object, Function] = useState({});

  useEffect(() => {
    setUser(currentUser);

    if (!props.usersGroups[currentUser._id]) {
      props.getGroupsByUser({id: currentUser._id, groups: {groups: currentUser.groups}});
    }
  }, [currentUser]);

  const removeGroupFromUser = (e, groupId) => {
    e.preventDefault();
    props.removeGroupFromUser({userId: user._id, groupId})
  };

  const showTable = () => {
    if (props.usersGroups[user._id] && props.usersGroups[user._id].length) {
      return (
        <div className="user-groups-table">
          <ul className="w3-ul w3-card-4">
            {
              props.usersGroups[user._id].map((item, index): React.Element<any> => (
                  <GroupItem key={uniqueKey()} item={item} index={index} removeGroupFromUser={removeGroupFromUser}/>
                )
              )
            }
          </ul>
        </div>
      )
    } else if(!props.isFetching){
      return (
        <div className='empty-list'>Groups list empty</div>
      )
    }
  };

  return (
    <div className='user-groups-container'>
      <AddGroupsToUser/>
      {showTable()}
    </div>
  )
};

const mapStateToProps = ({ users, fetching }) => ({
  usersGroups: users.usersGroups,
  isFetching: fetching.isFetching
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getGroupsByUser,
  removeGroupFromUser
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserGroups);
