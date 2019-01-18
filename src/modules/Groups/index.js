// @flow
import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGroupsList, setCurrentPageGroups, clearGroupsData } from '../../actions/actionCreators';
import CreateGroupModalTrigger from '../../components/ModalsTriggers/CreateGroup';
import GroupItem from './GroupItem';
import Pagination from '../../components/Pagination';
import { uniqueKey } from "../../helpers";
import './style.css';

type Props = {
  getGroupsList: Function,
  setCurrentPageGroups: Function,
  groupsData: Object,
  currentPage: number
};

const Groups = (props: Props): React.Element<any> => {

  const [groupsList, setGroupsList]: [Array<Object>, Function] = useState([]);

  const setPage = page => {
    props.setCurrentPageGroups(+page);
  };

  /** execute when component did update **/
  useEffect(() => {
    if(props.groupsData[props.currentPage]){
      if(props.groupsData[props.currentPage] !== groupsList) {
        setGroupsList(props.groupsData[props.currentPage])
      }
    } else {
      props.getGroupsList({page: props.currentPage, size: 20});
    }
  }, [props.groupsData]);

  /** execute  when component will unmount **/
  useEffect(() => {
    return () => {
      props.setCurrentPageGroups(1);
    }
  }, []);

  const showTable = () => {
    return (
      <div className='groups-table-container'>
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
            groupsList.map((item, index): React.Element<any> => <GroupItem key={uniqueKey()} item={item} index={index}/>)
          }
          </tbody>
        </table>
      </div>
    )
  };

  return(
    <div>
      <div className='groups-buttons-container'>
        <CreateGroupModalTrigger />
      </div>
      {showTable()}
      <Pagination currentPage={props.currentPage} setPage={setPage} totalSize={props.groupsData.totalSize}/>
    </div>
  )
};

const mapStateToProps = ({ groups }) => ({
  groupsData: groups.data,
  currentPage: groups.currentPage,
  createdUser: groups.createdUser,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getGroupsList,
  setCurrentPageGroups,
  clearGroupsData
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Groups);
