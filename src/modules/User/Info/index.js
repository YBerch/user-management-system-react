// @flow
import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUser } from '../../../actions/actionCreators';
import './style.css';

type Props = {
  currentUser: Object,
  updateUser: Function
};

const Info = ({currentUser, ...props}: Props): React.Element<any> => {

  const [editState, setEditState]: [boolean, Function] = useState(false);
  const [updateData, setUpdateData]: [Object, Function] = useState({});

  useEffect(() => {
    setUpdateData(currentUser)
  }, [currentUser]);

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

  return (
    <div className='user-info-container'>
      <div onClick={onEditButton} className='edit-button'>
        Edit
        <i className="fa fa-fw fa-edit"> </i>
      </div>
      <div className={`user-info ${editState ? 'edit' : ''}`} onChange={onChange}>
        <span>First name:</span>
        <input name='firstName' placeholder='first name' defaultValue={updateData.firstName}/>

        <span>Last name:</span>
        <input name='lastName' placeholder='last name' defaultValue={updateData.lastName}/>

        <span>Email:</span>
        <input name='email' placeholder='email' defaultValue={updateData.email}/>

        <span>Phone:</span>
        <input name='phone' placeholder='phone' defaultValue={updateData.phone}/>

        <span>Permission:</span>
        <input list='hosting-plan' type='text' name='permission' defaultValue={updateData.permission}/>
        <datalist id="hosting-plan">
          <option value="small"/>
          <option value="medium"/>
          <option value="large"/>
        </datalist>
      </div>
      {showSaveButton()}
    </div>
  )
};

const mapDispatchToProps = dispatch => bindActionCreators({
  updateUser
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Info);
