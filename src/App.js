import React, { useContext } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Home from './container/Home';
import Login from './container/Login';
import Library from './container/Library';
import { AuthProvider, useAuthContext } from './context';

function App({ contract, nearConfig, currentUser, wallet }) {
  const value = { contract, nearConfig, currentUser, wallet };
  return (
    <AuthProvider value={value}>
      <Router basename="/book-wishes">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/library">
            <Library />
          </PrivateRoute>
          <PrivateRoute path="/" exact>
            <Home />
          </PrivateRoute>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

const PrivateRoute = ({ path, exact, children }) => {
  const { currentUser } = useAuthContext();

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <Route path={path} exact={exact}>
      {children}
    </Route>
  );
};

export default App;
