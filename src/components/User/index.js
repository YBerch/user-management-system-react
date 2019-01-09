// @flow
import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser, clearCurrentUser } from '../../actions/actionCreators';

type Props = {
  usersList: Array<Object>,
  currentUser: Object,
  match: Object,
  getUser: Function,
  clearCurrentUser: Function
}

const User = (props: Props): React.Element<any> => {

  const [currentUser, setCurrentUser]: [Object, Function] = useState({});

  useEffect(() => {

    /** fetch single user or put current user to the state **/
    if(!props.currentUser) {
      props.getUser(props.match.params.id);
    } else {
      setCurrentUser(props.currentUser)
    }

    /** remove current user from the redux store when component will unmount **/
    return () => props.currentUser && props.clearCurrentUser();
  }, [props.currentUser]);

  return(
    <div>{JSON.stringify(currentUser)}</div>
  )
};

const mapStateToProps = ({ users }) => ({
  usersList: users.data.list,
  currentUser: users.currentUser
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUser,
  clearCurrentUser
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
