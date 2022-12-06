import React from "react";
import { Route, Switch } from "react-router-dom";

import LayoutDefault from "./layouts/LayoutDefault";

// import PrivateRoute from "./components/common/PrivateRoute"

import NotFound from "./containers/NotFound";
import WellProfile from "./containers/WellProfile";
import AccountSettings from "./containers/AccountSettings";

const BaseRouter = () => (
  <Switch>
    <LayoutDefault>
      <Switch>
        <Route exact path="/" component={WellProfile} />,
        <Route path="/account-settings" component={AccountSettings} />
        <Route component={NotFound} />
      </Switch>
    </LayoutDefault>
  </Switch>
);

export default BaseRouter;
