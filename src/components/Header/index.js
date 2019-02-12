// @flow
import * as React from 'react';
import SearchBar from '../../components/SearchBar';
import logo from '../../logo.svg';
import './style.css';

const Header = (): React.Element<any> => {

  return (
    <div className="header">
      <div className="logo">
        <img src={logo} className="project-logo" alt="logo" />
        <span>User Managemant System</span>
      </div>
      <div className="header-right">
        <SearchBar />
      </div>
    </div>
  )
};

export default Header;
