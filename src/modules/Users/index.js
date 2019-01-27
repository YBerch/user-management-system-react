// @flow
import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUsersList, setCurrentPageUsers, clearUsersData } from '../../actions/actionCreators';
import CreateUserModalTrigger from '../../components/ModalsTriggers/CreateUser';
import UserItem from './UserItem';
import Pagination from '../../components/Pagination';
import { uniqueKey } from '../../helpers';
import './style.css';

type Props = {
  getUsersList: Function,
  setCurrentPageUsers: Function,
  usersData: Object,
  currentPage: number
};

const Users = (props: Props): React.Element<any> => {

  const [usersList, setUsersList]: [Array<Object>, Function] = useState([]);
  const [page, setCurrentPage] = useState(1);
  const size = 20;

  const setPage = page => {
    props.setCurrentPageUsers(+page);
    setCurrentPage(+page)
  };

  /** execute when component did update **/
  useEffect(() => {
    if(props.usersData[props.currentPage]){
      if(props.usersData[props.currentPage] !== usersList) {
        setUsersList(props.usersData[props.currentPage])
      }
    } else {
        props.getUsersList({page: props.currentPage, size});
    }
  }, [props.usersData, props.currentPage]);

  /** execute  when component will unmount **/
  useEffect(() => {
    return () => {
      props.setCurrentPageUsers(1);
    }
  }, []);

  const showTable = () => {
    return (
      <div className='users-table-container'>
        <table className='users-table'>
          <thead>
          <tr>
            <th>№</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Birth date</th>
            <th>Permission</th>
          </tr>
          </thead>
          <tbody>
          {
            usersList.map((item, index): React.Element<any> =>
              <UserItem key={uniqueKey()} item={item} index={index} page={page} size={size}/>)
          }
          </tbody>
        </table>
      </div>
    )
  };

  return (
    <div>
      <div className='users-buttons-container'>
        <CreateUserModalTrigger />
      </div>
      {showTable()}
      <Pagination currentPage={props.currentPage} setPage={setPage} totalSize={props.usersData.totalSize} size={size}/>
    </div>
  )
};

const mapStateToProps = ({ users }) => ({
  usersData: users.data,
  currentPage: users.currentPage,
  createdUser: users.createdUser,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUsersList,
  setCurrentPageUsers,
  clearUsersData
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
