// @flow
import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateGroup } from '../../../actions/actionCreators';
import './style.css';

type Props = {
  currentGroup: Object,
  updateGroup: Function
};

const Info = ({currentGroup, ...props}: Props): React.Element<any> => {

  const [editState, setEditState]: [boolean, Function] = useState(false);
  const [updateData, setUpdateData]: [Object, Function] = useState({});

  useEffect(() => {
    setUpdateData(currentGroup)
  }, [currentGroup]);

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
  };

  const onSave = e => {
    e.preventDefault();
    props.updateGroup(updateData)
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

  return (
    <div className='user-info-container'>
      <div onClick={onEditButton} className='edit-button'>
        Edit
        <i className="fa fa-fw fa-edit"> </i>
      </div>
      <div className={`user-info ${editState ? 'edit' : ''}`} onChange={onChange}>
        <span>Group name:</span>
        <input name='name' placeholder='name' defaultValue={updateData.name}/>
      </div>
      {showSaveButton()}
    </div>
  )
};

const mapDispatchToProps = dispatch => bindActionCreators({
  updateGroup
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Info);
