import React, { createContext, useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Home from './container/Home';
import Library from './container/Library';
import Login from './container/Login';

const AuthContext = createContext();

function App({ contract, nearConfig, currentUser }) {
  return (
    <AuthContext.Provider value={currentUser}>
      <Router>
        <Switch>
          <PrivateRoute path="/library">
            <Library />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/" exact>
            <Home />
          </PrivateRoute>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

const PrivateRoute = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    return <Redirect to="/login" />;
  }

  return (
    <Route path="/" exact>
      <Home />
    </Route>
  );
};

export default App;
