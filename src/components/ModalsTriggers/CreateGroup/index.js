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

const CreateGroupModalTrigger = (props: Props): React.Element<any> => {

  const createGroup = () => {
    props.showModal(types.MODAL_TYPE_CREATE_GROUP)
  };

  return(
    <div className='group-create-button' onClick={createGroup}>
      <span className='plus-icon fa fa-plus'></span>
      <span>Add group</span>
    </div>
  )
};

const mapDispatchToProps = dispatch => bindActionCreators({
  showModal
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(CreateGroupModalTrigger);
