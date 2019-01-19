// @flow
import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUser } from '../../../actions/actionCreators';
import GroupItem from './GroupItem';
import { uniqueKey } from '../../../helpers';
import './style.css';

type Props = {
  data: Object,
  updateUser: Function
};

const UserGroups = ({data, ...props}: Props): React.Element<any> => {

  const [editState, setEditState]: [boolean, Function] = useState(false);
  const [updateData, setUpdateData]: [Object, Function] = useState({});

  useEffect(() => {
    setUpdateData(data)
  }, [data]);

  const onChange = e => {
    e.preventDefault();
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value
    })
  };

  const onEditButton = e => {
    e.preventDefault();
    setEditState(!editState);
    console.log(updateData)
  };

  const onSave = e => {
    e.preventDefault();
    props.updateUser(updateData)
  };

  const showSaveButton = () => {
    if(editState){
      return (
        <div onClick={onSave} className='save-button'>
          Save
        </div>
      )
    }
  };

  const showTable = () => {
    if(data.length){
      return (
        <table className='groups-table' border="true">
          <thead>
          <tr>
            <td>#</td>
            <td>Name</td>
            <td>Created</td>
          </tr>
          </thead>
          <tbody>
          {
            data.map((item, index): React.Element<any> => <GroupItem key={uniqueKey()} item={item} index={index}/>)
          }
          </tbody>
        </table>
      )
    } else {
      return (
        <div className='empty-list'>Groups list empty</div>
      )
    }
  }

  return (
    <div className='user-groups-container'>
    {showTable()}
    </div>
  )
};

const mapDispatchToProps = dispatch => bindActionCreators({
  updateUser
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(UserGroups);
