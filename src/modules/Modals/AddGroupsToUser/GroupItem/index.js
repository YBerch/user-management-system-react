// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentGroup } from '../../../../actions/actionCreators';
import { getRandomColor } from '../../../../helpers';
import './style.css';

type Props = {
  item: Object,
  index: number,
  addGroup: Function
}

const GroupItem = ({item, index, ...props}: Props): React.Element<any> => {

  return (
    <li className="w3-bar">
      <span className="close-button w3-xlarge w3-right fa fa-plus" onClick={e => props.addGroup(e, item._id)}> </span>
      <div className='group-logo' style={{backgroundColor: getRandomColor()}}>{item.name[0].toUpperCase()}</div>
      <div className="w3-bar-item">
        <span className="w3-large">{item.name}</span><br/>
        <span>Web Designer</span>
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
