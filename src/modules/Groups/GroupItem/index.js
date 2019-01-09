// @flow
import * as React from 'react';
import { Link } from 'react-router-dom'

type Props = {
  item: Object,
  index: number
}

const GroupItem = ({item, index}: Props): React.Element<any> => {
  return (
    <tr>
      <td>{index+1}</td>
      <td><Link to={`/groups/${item._id}`}>{item.name}</Link></td>
      <td>{new Date(item.created).toISOString().substring(0, 10)}</td>
    </tr>
  )
};

export default GroupItem;
