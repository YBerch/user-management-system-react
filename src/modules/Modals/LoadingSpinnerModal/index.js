// @flow
import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './style.css';

type Props = {
  isFetching: boolean
}

const LoadingSpinner = ({isFetching}: Props): React.Element<any> => {

  const [show, setShow]: [boolean, Function] = useState(false);

  useEffect(() => {
    setShow(isFetching)
  }, [isFetching]);

  const showSpinner = () => {
    return show ? 'block' : 'none'
  };

  return (
    <div style={{display: `${showSpinner()}`}}>
      <div className="lds-ring">
        <div> </div>
        <div> </div>
        <div> </div>
        <div> </div>
      </div>
    </div>
  )
};

const mapStateFromProps = ({fetching}) => ({
  isFetching: fetching.isFetching
});

export default connect(
  mapStateFromProps
)(LoadingSpinner)

