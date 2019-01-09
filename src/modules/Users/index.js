// @flow
import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUsersList, setCurrentPage, clearUsersData } from '../../actions/actionCreators';
import CreateUserModalTrigger from '../../components/ModalsTriggers/CreateUser';
import UserItem from './UserItem';
import Pagination from '../../components/Pagination';
import { uniqueKey } from '../../helpers';
import './style.css';

type Props = {
  getUsersList: Function,
  setCurrentPage: Function,
  clearUsersData: Function,
  usersData: Object,
  createdUser: boolean,
  currentPage: number
};

const Users = (props: Props): React.Element<any> => {

  const [usersList, setUsersList]: [Array<Object>, Function] = useState([]);
  // const [currentPage, setCurrentPage]: [number, Function] = useState(1);

  const setPage = page => {
    props.setCurrentPage(+page);
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
  });

  /** execute when createdUser prop changes **/
  useEffect(() => {
    if(props.createdUser) {
      props.clearUsersData();
    }
  }, [props.createdUser]);

  /** execute  when component will unmount **/
  useEffect(() => {
    return () => {
      props.setCurrentPage(1);
      props.clearUsersData();
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
  createdUser: users.createdUser
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUsersList,
  setCurrentPage,
  clearUsersData
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
