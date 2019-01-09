// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showModal } from '../../../actions/actionCreators';
import * as types from '../../../actions/actionTypes';

type Props = {
  showModal: Function
}

const CreateUserModalTrigger = (props: Props): React.Element<any> => {

  const createUser = () => {
    props.showModal(types.MODAL_TYPE_CREATE_USER)
  };

  return(
    <div className='create-button' onClick={createUser}>Add user</div>
  )
};

const mapDispatchToProps = dispatch => bindActionCreators({
  showModal
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(CreateUserModalTrigger);
