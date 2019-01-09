// @flow
import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGroupsList } from '../../actions/actionCreators';
import CreateGroupModalTrigger from '../../components/ModalsTriggers/CreateGroup';
import GroupItem from './GroupItem';
import { uniqueKey } from "../../helpers";
import './style.css';

type Props = {
  getGroupsList: Function,
  groupsList: Array<Object>,
  createdGroup: boolean
};

const Groups = (props: Props): React.Element<any> => {

  const [groupsList, setGroupsList]: [Array<Object>, Function] = useState([]);

  if(props.groupsList !== groupsList){
    setGroupsList(props.groupsList)
  }

  if(props.createdGroup){
    props.getGroupsList();
  }

  useEffect(() => {
    props.getGroupsList();
  }, []);

  const showTable = () => {
    return (
      <div className='groups-table-container'>
        <table className='groups-table' border="true">
          <thead>
          <tr>
            <td>#</td>
            <td>Name</td>
            <td>Created</td>
          </tr>
          </thead>
          <tbody>
          {
            groupsList.map((item, index): React.Element<any> => <GroupItem key={uniqueKey()} item={item} index={index}/>)
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
    </div>
  )
};

Groups.defaultProps = {
  groupsList: []
};

const mapStateToProps = ({ groups }) => ({
  groupsList: groups.data.list,
  createdGroup: groups.createdGroup
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getGroupsList
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Groups);
