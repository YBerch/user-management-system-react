// @flow
import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGroup, clearCurrentUser, deleteUser, showModal, clearUsersError } from '../../actions/actionCreators';
import Info from './Info';
import UserGroups from './UserGroups';

type Props = {
  currentGroup: Object
}

const Group = (props: Props): React.Element<any> => {

  const [currentGroup, setCurrentGroup]: [Object, Function] = useState({});

  useEffect(() => {
    // setCurrentGroup(props.currentGroup)

    /** fetch single user or put current user to the state **/
    if(!props.currentGroup) {
      props.getGroup(props.match.params.id);
    } else {
      setCurrentGroup(props.currentGroup)
    }
  },[props.currentGroup]);


  const showContent = () => {
    if(Object.keys(currentGroup).length) {
      return (
        <div>
          <div className='row'>
            <div className='column left'>
              <div className='user-title'>Group Info:</div>
              <Info currentGroup={currentGroup}/>
            </div>
            <div className='column right'>
              <div className='user-title'>Users:</div>
              <UserGroups currentGroup={currentGroup}/>
            </div>
          </div>
          <div className={`delete-button `}>
            Delete user
          </div>
        </div>
      )
    }
  };

  return(
    <div>
      {showContent()}
    </div>
  )
};

const mapStateToProps = ({groups}) => ({
  currentGroup: groups.currentGroup
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getGroup
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Group);
