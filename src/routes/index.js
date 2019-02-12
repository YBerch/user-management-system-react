// @flow
import * as React from 'react';
import { Switch, Route } from 'react-router';
import { Breadcrumbs } from "react-breadcrumbs";
import CrumbRoute from "../components/Breadcrumb";
import RootModal from '../modules/Modals';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Login from '../components/Login';
import Users from '../modules/Users';
import User from '../modules/User';
import Group from '../modules/Group';
import Groups from '../modules/Groups';
import NotFound from '../components/NotFound';
import '../assets/main.css';
import '../components/Breadcrumb/style.css';

const Crumb = (): React.Element<any> => {
  return (
    <Switch>
      <Route exact path="/users/" component={ Users }/>
      <Route exact path="/groups/" component={ Groups }/>
      <CrumbRoute title="User" path="/users/:id" component={ User }/>
      <CrumbRoute title="Group" path="/groups/:id" component={ Group }/>
    </Switch>
  )
};

export const authRoutes = (
  <div>
    <main>
      <SideBar />
      <div id='main' className='content'>
        <Header />
        <div className='breadcrumbs-container'>
          <Breadcrumbs separator="  >  " />
        </div>
        <Switch>
          <Route exact path='/' component={ Login } />
          <CrumbRoute title="Users" path="/users" component={ Crumb } />
          <CrumbRoute title="Groups" path="/groups" component={ Crumb } />

          <Route path='*' component={NotFound} />
        </Switch>
      </div>
      <RootModal />
    </main>
  </div>
);

export const nonAuthRoutes = (
  <div>
    <main>
      <Switch>
        <Route exact path='/' component={Login} />

        <Route path='*' component={NotFound} />
      </Switch>
      <RootModal />
    </main>
  </div>
);