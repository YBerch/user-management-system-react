// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useState, useEffect } from 'react';
import { logout } from '../../actions/actionCreators';
import { Link } from 'react-router-dom';
import './style.css';

type Props = {
  logout: Function
}

const SideBar = (props: Props): React.Element<any> => {

  const [sideBarVisibility, setSideBarVisibility]: [boolean, Function] = useState(false);

  useEffect(() => {
    const contentElement: HTMLElement | null = document.getElementById('main');
    if (contentElement) {
      if (sideBarVisibility) {
        contentElement.style.marginLeft = '250px';
      } else {
        contentElement.style.marginLeft = '100px';
      }
    }
  }, [sideBarVisibility]);

  const toggleSideBar = () => {
    setSideBarVisibility(!sideBarVisibility)
  };

  const logout = e => {
    e.preventDefault();
    props.logout();
  };

  return(
    <div>
      <div style={{width: sideBarVisibility ? '250px' : '100px'}} className='sidebar'>
        <a href="#" className="closebtn" onClick={toggleSideBar}>&#9776;</a>
        <Link to='/users'>
          <i className="fa fa-fw fa-user"></i>
          <span className='sidebar-item-title'>
               Users
            </span>
        </Link>
        <Link to='/groups'>
          <i className="fa fa-fw fa-group"></i>
          <span className='sidebar-item-title'>
               Groups
            </span>
        </Link>
        <a href="#home" onClick={logout} className='logout-button'>
          <i className="fa fa-fw fa-sign-out"></i>
          <span className='sidebar-item-title'>Logout</span>
        </a>
        {/*<a href="#services"><i className="fa fa-fw fa-wrench"></i> Services</a>*/}
        {/*<a href="#clients"><i className="fa fa-fw fa-user"></i> Clients</a>*/}
        {/*<a href="#contact"><i className="fa fa-fw fa-envelope"></i> Contact</a>*/}
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
)(SideBar);
