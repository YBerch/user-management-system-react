// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showModal } from '../../../actions/actionCreators';
import * as types from '../../../actions/actionTypes';

type Props = {
  showModal: Function
}

const CreateGroupModalTrigger = (props: Props): React.Element<any> => {

  const createGroup = () => {
    props.showModal(types.MODAL_TYPE_CREATE_GROUP)
  };

  return(
    <div onClick={createGroup}>Add group</div>
  )
};

const mapDispatchToProps = dispatch => bindActionCreators({
  showModal
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(CreateGroupModalTrigger);
