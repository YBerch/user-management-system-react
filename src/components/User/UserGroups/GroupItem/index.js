// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { history } from '../../../../store';
import { setCurrentGroup } from '../../../../actions/actionCreators';

type Props = {
  item: Object,
  index: number,
  setCurrentGroup: Function
}

const GroupItem = ({item, index, ...props}: Props): React.Element<any> => {

  const userSelect = e => {
    e.preventDefault();
    props.setCurrentGroup(item);
    history.push(`/groups/${item._id}`)
  };

  return (
    <tr>
      <td>{index+1}</td>
      <td>
        <div onClick={userSelect}>{item.name}</div>
      </td>
      <td>{new Date(item.created).toISOString().substring(0, 10)}</td>
    </tr>
  )
};

const mapDispatchToProps = dispatch => bindActionCreators({
  setCurrentGroup
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(GroupItem);
