// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/actionCreators';
import SearchBar from '../../components/SearchBar';
import './style.css';

type Props = {
  logout: Function
}

const Header = (props: Props): React.Element<any> => {

  const logout = () => {
    props.logout()
  };

  return (
    <div className="header">
      <a href="#default" className="logo">User Managemant System</a>
      <div className="header-right">
        <SearchBar />
        <a className="active" onClick={logout}>Logout</a>
      </div>
    </div>
  )
};

const mapDispatchToProps = dispatch => bindActionCreators({
  logout
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Header);
