import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { authRoutes, nonAuthRoutes } from './routes';
import LoadingSpinner from './modules/Modals/LoadingSpinnerModal';
import './App.css';

class App extends Component {
  render() {
    let routes;
    if(this.props.authorize && this.props.permission !== 'user'){
      routes = authRoutes
    } else {
      routes = nonAuthRoutes;
      this.props.history.push('/')
    }
    return (
      <div>
        <ConnectedRouter history={this.props.history}>
          {routes}
        </ConnectedRouter>
        <LoadingSpinner/>
      </div>
    );
  }
}

const mapStateToProps = ({ session }) => ({
  authorize: session.authorize,
  permission: session.user.permission
});

export default connect(
  mapStateToProps
)(App);
