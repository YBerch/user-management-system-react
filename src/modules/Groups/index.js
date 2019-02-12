// @flow
import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGroupsList, setCurrentPageGroups } from '../../actions/actionCreators';
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
  const [page, setCurrentPage] = useState(1);
  const size = 20;

  const setPage = page => {
    props.setCurrentPageGroups(+page);
    setCurrentPage(+page)
  };

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

  const showTable = () => {
    return (
      <div className='groups-table-container'>
        <table className='groups-table'>
          <thead>
          <tr>
            <th>№</th>
            <th>Name</th>
            <th>Created</th>
          </tr>
          </thead>
          <tbody>
          {
            groupsList.map((item, index): React.Element<any> =>
              <GroupItem key={uniqueKey()} item={item} index={index} page={page} size={size}/>)
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
      <Pagination currentPage={props.currentPage} setPage={setPage} totalSize={props.groupsData.totalSize} size={size}/>
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
  setCurrentPageGroups
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Groups);
