// @flow
import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUser, getGroupsByUser, removeGroupFromUser } from '../../../actions/actionCreators';
import GroupItem from './GroupItem';
import AddGroupsToUser from '../../../components/ModalsTriggers/AddGroupsToUser';
import { uniqueKey } from '../../../helpers';
import './style.css';
import {useState} from "react";

type Props = {
  currentGroup: Object,
  usersGroups: Object,
  updateUser: Function,
  getGroupsByUser: Function,
  removeGroupFromUser: Function
};

const UserGroups = ({currentGroup, ...props}: Props): React.Element<any> => {

  const [user, setUser]: [Object, Function] = useState({});

  useEffect(() => {
    setUser(currentGroup);

    if(!props.usersGroups[currentGroup._id]) {
      props.getGroupsByUser({id: currentGroup._id, groups: {groups: currentGroup.groups}});
    }
  }, [currentGroup]);

  const removeGroupFromUser = (e, groupId) => {
    e.preventDefault();
    props.removeGroupFromUser({userId: user._id, groupId})
  };

  const showTable = () => {
    if(props.usersGroups[user._id] && props.usersGroups[user._id].length){
      return (
        <div>
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
    } else {
      return (
        <div className='empty-list'>Groups list empty</div>
      )
    }
  };

  return (
    <div className='user-groups-container'>
      <AddGroupsToUser />
    {showTable()}
    </div>
  )
};

const mapStateToProps = ({users}) => ({
  usersGroups: users.usersGroups
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateUser,
  getGroupsByUser,
  removeGroupFromUser
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserGroups);
