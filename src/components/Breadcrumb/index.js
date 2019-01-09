// @flow
import * as React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { Breadcrumb } from "react-breadcrumbs";

type Props = {
  component: React.ComponentType<any>,
  includeSearch: boolean,
  render: Function,
  currentUser: Object,
  currentGroup: Object,
  title: string
}

const BreadCrumb = ({ component: Component, includeSearch = false, render, ...props } : Props): React.Element<any> => {

  /** set crumb title **/
  const setTitle = (): string => {
    switch (props.title) {
      case 'Users':
      case 'Groups':
        return props.title;
      case 'User':
        const currentUser: Object = props.currentUser;
        return currentUser && `${currentUser.firstName} ${currentUser.lastName}`;
      case 'Group':
        const currentGroup: Object = props.currentGroup;
        return currentGroup && currentGroup.name;
      default:
        return props.title;
    }
  };

  const renderCrumb = routeProps => {
    const title = setTitle();

    return (
      <Breadcrumb data={{
        title,
        pathname: routeProps.match.url,
        search: includeSearch ? routeProps.location.search : null
      }}>
        {Component ? <Component {...routeProps} /> : render(routeProps)}
      </Breadcrumb>
    )
  };

  return (
    <Route {...props} render={renderCrumb}/>
  )
};

const mapStateToProps = ({ users, groups }) => ({
  currentUser: users.currentUser,
  currentGroup: groups.currentGroup
});

export default connect(
  mapStateToProps
)(BreadCrumb);