// @flow
import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUsersByGroup, removeGroupFromUser } from '../../../actions/actionCreators';
import UserItem from './UserItem/index';
import { uniqueKey } from '../../../helpers/index';
import './style.css';

type Props = {
  currentGroup: Object,
  groupUsers: Object,
  getUsersByGroup: Function,
  removeGroupFromUser: Function,
  isFetching: boolean
};

const GroupUsers = ({currentGroup, ...props}: Props): React.Element<any> => {

  const [group, setGroup]: [Object, Function] = useState({});

  useEffect(() => {
    setGroup(currentGroup);

    if(!props.groupUsers[currentGroup._id]) {
      props.getUsersByGroup({groupId: currentGroup._id});
    }
  }, [props.groupUsers]);

  const removeGroupFromUser = (e, userId) => {
    e.preventDefault();
    props.removeGroupFromUser({userId, groupId: group._id})
  };

  const showTable = () => {
    if(props.groupUsers[group._id] && props.groupUsers[group._id].length){
      return (
        <div>
          <ul className="w3-ul w3-card-4">
            {
              props.groupUsers[group._id].map((item, index): React.Element<any> => (
                  <UserItem key={uniqueKey()} item={item} index={index} removeGroupFromUser={removeGroupFromUser}/>
                )
              )
            }
          </ul>
        </div>
      )
    } else if(!props.isFetching){
      return (
        <div className='empty-list'>User list empty</div>
      )
    }
  };

  return (
    <div className='user-groups-container'>
    {showTable()}
    </div>
  )
};

const mapStateToProps = ({ groups, fetching }) => ({
  groupUsers: groups.groupUsers,
  isFetching: fetching.isFetching
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUsersByGroup,
  removeGroupFromUser
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupUsers);
