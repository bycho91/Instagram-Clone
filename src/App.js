import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import * as ROUTES from "./constants/routes";
const Dashboard = lazy(() => import("./pages/dashboard"));
const Login = lazy(() => import("./pages/login"));
const Signup = lazy(() => import("./pages/signup"));
const Profile = lazy(() => import("./pages/profile"));
const NotFound = lazy(() => import("./pages/not-found"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route exact path={ROUTES.LOGIN} component={Login} />
          <Route exact path={ROUTES.SIGN_UP} component={Signup} />
          <Route exact path={ROUTES.PROFILE} component={Profile} />
          <Route exact path={ROUTES.DASHBOARD} component={Dashboard} />
          <Route exact path={ROUTES.NOT_FOUND} component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
