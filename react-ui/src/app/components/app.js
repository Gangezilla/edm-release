import React from 'react';

import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Dashboard from '../views/user/dashboard';
import EDMSlice from '../views/email/edm-slice';
import Header from '../containers/header';
import Home from '../views/app/home';
import LogIn from '../views/user/log-in';
import NotAuthorised from '../views/app/not-authorised';
import NotFound from '../views/app/not-found';
import Profile from '../views/user/profile';
import ResetPassword from '../views/user/reset-password';
import Spinner from '../containers/spinner';

function PrivateRoute ({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/not-authorised', state: {from: props.location}}} />}
    />
  )
}

function NotLoggedInRoute ({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Redirect to={{ pathname: '/dashboard', state: {from: props.location}}} />
        : <Component {...props} />
      }
    />
  )
}

class App extends React.Component {
  componentWillMount() {
    this.props.getInitialConfig();
  }

  render() {
    return (
      <div>
        <Header />
        <Spinner />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route authed={this.props.isLoggedIn} path='/email/create' component={EDMSlice} />
          <Route authed={this.props.isLoggedIn} path="/user/profile/" component={Profile} />
          <NotLoggedInRoute authed={this.props.isLoggedIn} path='/user/log-in/' component={LogIn} />
          <Route path="/user/reset-password/:id/" component={ResetPassword}/>
          <Route authed={this.props.isLoggedIn} path="/user/dashboard/" component={Dashboard} />
          <Route path="/not-authorised/" component={NotAuthorised} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default App;
