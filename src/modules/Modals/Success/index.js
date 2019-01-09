// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideModal } from "../../../actions/actionCreators";

type Props = {
  hideModal: Function,
  message: string
}

const Success = (props: Props): React.Element<any> => {

  const hideModal = (e) => {
    e.preventDefault();
    props.hideModal()
  };

  return(
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={hideModal}>&times;</span>
          <div className='modal-header-title'>Success</div>
        </div>
        <div className="modal-body">
          <h1>{props.message}</h1>
        </div>
        <button onClick={hideModal}>Ok</button>
        <div className="modal-footer">
          <div className='modal-footer-title'>Modal Footer</div>
        </div>
      </div>

    </div>
  )
};

const mapDispatchToProps = dispatch => bindActionCreators({
  hideModal
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Success);
