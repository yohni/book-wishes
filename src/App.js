import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './container/Home';
import Library from './container/Library';
import Login from './container/Login';

function App({ contract, nearConfig }) {
  console.log(nearConfig);
  return (
    <Router>
      <Switch>
        <Route path="/library">
          <Library />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
