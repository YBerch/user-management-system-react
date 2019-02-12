// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { history } from '../../../store';
import { setCurrentUser } from '../../../actions/actionCreators';

type Props = {
  item: Object,
  index: number,
  page: number,
  size: number,
  setCurrentUser: Function
}

const UserItem = ({ item, index, page, size, ...props }: Props): React.Element<'tr'> => {

  const userSelect = e => {
    e.preventDefault();
    props.setCurrentUser(item);
    history.push(`/users/${item._id}`)
  };

  return (
    <tr onClick={userSelect}>
      <td>{page * size - size + index+1}</td>
      <td>
        <div>{item.firstName} {item.lastName}</div>
      </td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
      <td>{item.address}</td>
      <td>{item.dateOfBirth && new Date(item.dateOfBirth).toISOString().substring(0, 10)}</td>
      <td>{item.permission}</td>
    </tr>
  )
};

const mapDispatchToProps = dispatch => bindActionCreators({
  setCurrentUser
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(UserItem);
