// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showModal } from '../../../actions/actionCreators';
import * as types from '../../../actions/actionTypes';
import './style.css';

type Props = {
  showModal: Function
}

const AddGroupsToUser = (props: Props): React.Element<any> => {

  const addGroups = () => {
    props.showModal(types.MODAL_TYPE_ADD_GROUPS_TO_USER)
  };

  return(
    <div className='add-groups-button' onClick={addGroups}>
      <i className="fa fa-fw fa-plus"> </i>
      Add Groups
    </div>
  )
};

const mapDispatchToProps = dispatch => bindActionCreators({
  showModal
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(AddGroupsToUser);
