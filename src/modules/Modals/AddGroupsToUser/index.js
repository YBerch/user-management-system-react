// @flow
import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  showModal,
  hideModal,
  getGroupsList,
  setCurrentPageGroups,
  addGroupToUser,
  clearUsersError
} from '../../../actions/actionCreators';
import GroupItem from './GroupItem';
import Pagination from '../../../components/Pagination';
import * as types from '../../../actions/actionTypes';
import { uniqueKey } from "../../../helpers";
import '../style.css';
import './style.css'

type Props = {
  showModal: Function,
  hideModal: Function,
  clearUsersError: Function,
  error: boolean,
  errorMessage: string,
  getGroupsList: Function,
  setCurrentPageGroups: Function,
  addGroupToUser: Function,
  groupsData: Object,
  currentPage: number,
  currentUser: Object,
  addedGroup: boolean
}

const CreateUserModal = (props: Props): React.Element<any> => {

  const [groupsList, setGroupsList]: [Array<Object>, Function] = useState([]);

  const size = 20;

  const setPage = page => {
    props.setCurrentPageGroups(+page);
  };

  if(props.addedGroup){
    // props.showModal(types.MODAL_TYPE_SUCCESS, {message: 'Group successful added!'})
  }

  useEffect(() => {
    if(props.error){
      props.clearUsersError();
      props.showModal(types.MODAL_TYPE_ERROR, {message: props.errorMessage, returnTo: 'CreateUserModal'});
    }
  }, [props.error]);

  /** execute when component did update **/
  useEffect(() => {
    if(props.groupsData[props.currentPage]){
      if(props.groupsData[props.currentPage] !== groupsList) {
        setGroupsList(props.groupsData[props.currentPage])
      }
    } else {
      props.getGroupsList({page: props.currentPage, size});
    }
  }, [props.groupsData, props.currentPage]);

  /** execute  when component will unmount **/
  useEffect(() => {
    return () => {
      props.setCurrentPageGroups(1);
    }
  }, []);

  const hideModal = e => {
    e.preventDefault();
    props.hideModal()
  };

  const addGroup = (e, groupId: string) => {
    e.preventDefault();
    props.addGroupToUser({userId: props.currentUser._id, groupId})
  };

  return(
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={hideModal}>&times;</span>
          <div className='modal-header-title'>Add Group To User</div>
        </div>
        <div className="modal-body">
          <div className='add-groups-to-user-modal-container'>
            <ul className="w3-ul w3-card-4">
              {
                groupsList.map((item, index): React.Element<any> => (
                    <GroupItem
                      key={uniqueKey()}
                      item={item}
                      index={index}
                      addGroup={addGroup}
                      currentUser={props.currentUser}
                    />
                  )
                )
              }
            </ul>
          </div>
          <Pagination currentPage={props.currentPage} setPage={setPage} totalSize={props.groupsData.totalSize} size={size}/>
        </div>
        <div className="modal-footer">
          <div className='modal-footer-title'>Modal Footer</div>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = ({ groups, users }) => ({
  groupsData: groups.data,
  currentPage: groups.currentPage,
  addedGroup: users.addedGroup,
  currentUser: users.currentUser
});

const mapDispatchToProps = dispatch => bindActionCreators({
  showModal,
  hideModal,
  getGroupsList,
  setCurrentPageGroups,
  addGroupToUser,
  clearUsersError
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUserModal);
