import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./container/Home";
import Login from "./container/Login";
import Library from "./container/Library";
import { AuthProvider, useAuthContext } from "./context";
import { ToastContainer } from "react-toastify";

function App({ contract, nearConfig, currentUser, wallet }) {
  const value = { contract, nearConfig, currentUser, wallet };
  return (
    <div className="font-lato">
      <AuthProvider value={value}>
        <Router>
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
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthProvider>
    </div>
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
