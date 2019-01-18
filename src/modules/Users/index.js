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

  const setPage = page => {
    props.setCurrentPageUsers(+page);
  };

  /** execute when component did update **/
  useEffect(() => {
    if(props.usersData[props.currentPage]){
      if(props.usersData[props.currentPage] !== usersList) {
        setUsersList(props.usersData[props.currentPage])
      }
    } else {
        props.getUsersList({page: props.currentPage, size: 20});
    }
  }, [props.usersData]);

  /** execute  when component will unmount **/
  useEffect(() => {
    return () => {
      props.setCurrentPageUsers(1);
    }
  }, []);

  const showTable = () => {
    return (
      <div className='users-table-container'>
        <table className='users-table' border="true">
          <thead>
          <tr>
            <td>id</td>
            <td>Name</td>
            <td>Email</td>
            <td>Phone</td>
            <td>Address</td>
            <td>Birth date</td>
            <td>Permission</td>
          </tr>
          </thead>
          <tbody>
          {
            usersList.map((item, index): React.Element<any> => <UserItem key={uniqueKey()} item={item} index={index}/>)
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
      <Pagination currentPage={props.currentPage} setPage={setPage} totalSize={props.usersData.totalSize}/>
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
