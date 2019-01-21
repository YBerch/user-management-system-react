// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import * as types from '../../actions/actionTypes';
import CreateUserModal from './CreateUser';
import CreateGroupModal from './CreateGroup';
import AddGroupsToUser from './AddGroupsToUser';
import Success from './Success';
import Error from './Error';

type Props = {
  +type: string,
  +props: Object
}

const MODAL_COMPONENTS = {
  [types.MODAL_TYPE_CREATE_USER]: CreateUserModal,
  [types.MODAL_TYPE_CREATE_GROUP]: CreateGroupModal,
  [types.MODAL_TYPE_ADD_GROUPS_TO_USER]: AddGroupsToUser,
  [types.MODAL_TYPE_SUCCESS]: Success,
  [types.MODAL_TYPE_ERROR]: Error
};

const RootModal = ({ type, props }: Props): React.Node => {
  if (!type) {
    return null;
  }
  const ModalComponent = MODAL_COMPONENTS[type];
  return <ModalComponent {...props} />;
};

const mapStateToProps = ({modal}) => (
  modal
);

export default connect(
  mapStateToProps
)(RootModal);
