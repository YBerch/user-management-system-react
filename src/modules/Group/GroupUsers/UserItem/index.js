// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { history } from '../../../../store';
import { setCurrentUser } from '../../../../actions/actionCreators';
import './style.css';

type Props = {
  item: Object,
  index: number,
  setCurrentUser: Function,
  removeGroupFromUser: Function
}

const GroupItem = ({item, index, ...props}: Props): React.Element<any> => {

  const groupSelect = e => {
    e.preventDefault();
    props.setCurrentUser(item);
    history.push(`/users/${item._id}`)
  };

  return (
    <li className="w3-bar">
      <span onClick={(e) => props.removeGroupFromUser(e, item._id)} className="close-button w3-xlarge w3-right">&times;</span>
      <div className='user-logo'>{item.firstName[0].toUpperCase()}</div>
      <div onClick={groupSelect} className="w3-bar-item">
        <span className="w3-large">{item.firstName} {item.lastName}</span><br/>
        <span>{item.permission}</span>
      </div>
    </li>
  )
};

const mapDispatchToProps = dispatch => bindActionCreators({
  setCurrentUser
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(GroupItem);
