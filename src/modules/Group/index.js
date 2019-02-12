// @flow
import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGroup, deleteGroup, showModal, clearGroupsError } from '../../actions/actionCreators';
import Info from './Info/index';
import GroupUsers from './GroupUsers/index';
import * as types from "../../actions/actionTypes";
import './style.css';

type Props = {
  currentGroup: Object,
  getGroup: Function,
  deleteGroup: Function,
  deletedGroup: boolean,
  clearGroupsError: Function,
  showModal: Function,
  match: Object,
  history: Object,
  error: boolean,
  errorMessage: string
}

const Group = (props: Props): React.Element<any> => {

  const [currentGroup, setCurrentGroup]: [Object, Function] = useState({});

  useEffect(() => {

    /** fetch single group or put current group to the state **/
    if(!props.currentGroup || props.currentGroup._id !== props.match.params.id) {
      props.getGroup(props.match.params.id);
    } else {
      setCurrentGroup(props.currentGroup)
    }
  },[props.currentGroup, props.match.params.id]);

  useEffect(() => {
    props.deletedGroup && props.history.push('/groups');
    if(props.error){
      props.clearGroupsError();
      props.showModal(types.MODAL_TYPE_ERROR, {message: props.errorMessage});
    }
  }, [props.deletedGroup, props.error]);

  const showContent = () => {
    if(Object.keys(currentGroup).length) {
      return (
        <div>
          <div className='row'>
            <div className='column left'>
              <div className='user-title'>Group Info:</div>
              <Info currentGroup={currentGroup}/>
            </div>
            <div className='column right'>
              <div className='user-title'>Users:</div>
              <GroupUsers currentGroup={currentGroup}/>
              <div onClick={onDeleteGroup} className={`delete-button`}>
                Delete Group
              </div>
            </div>
          </div>
        </div>
      )
    }
  };

  const onDeleteGroup = e => {
    e.preventDefault();
    props.deleteGroup(currentGroup._id)
  };

  return(
    <div>
      {showContent()}
    </div>
  )
};

const mapStateToProps = ({ groups }) => ({
  currentGroup: groups.currentGroup,
  deletedGroup: groups.deletedGroup,
  error: groups.error,
  errorMessage: groups.errorMessage
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getGroup,
  deleteGroup,
  clearGroupsError,
  showModal
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Group);
