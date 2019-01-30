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

const CreateUserModalTrigger = (props: Props): React.Element<any> => {

  const createUser = () => {
    props.showModal(types.MODAL_TYPE_CREATE_USER)
  };

  return(
    <div className='user-create-button' onClick={createUser}>
      <span className='plus-icon fa fa-plus'></span>
      <span>Add user</span>
    </div>
  )
};

const mapDispatchToProps = dispatch => bindActionCreators({
  showModal
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(CreateUserModalTrigger);
