// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentGroup } from '../../../../actions/actionCreators';
import './style.css';

type Props = {
  item: Object,
  index: number,
  addGroup: Function
}

const GroupItem = ({item, index, ...props}: Props): React.Element<any> => {

  const checkAddedGroup = props.currentUser && props.currentUser.groups.indexOf(item._id) !== -1;

  return (
    <li className='w3-bar'>
      <span
        className={`add-group-button w3-xlarge w3-right
        ${props.currentUser && (checkAddedGroup ? 'fa fa-check disabled-item' : 'fa fa-plus')}`}
        onClick={e => props.addGroup(e, item._id)}
      > </span>
      <div className={`group-item ${checkAddedGroup ? 'added-group' : ''}`}>
        <div className='group-logo'>{item.name[0].toUpperCase()}</div>
        <div className="w3-bar-item">
          <span className="w3-large">{item.name}</span><br/>
          <span>Description</span>
        </div>
      </div>
    </li>
  )
};

const mapDispatchToProps = dispatch => bindActionCreators({
  setCurrentGroup
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(GroupItem);
