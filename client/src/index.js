
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from './layouts/Admin';
import Auth from "./layouts/Auth";
import PublicLayout from './layouts/Public/PublicLayout';
import routes from "./routes";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'react-toastify/dist/ReactToastify.css';

import { createBrowserHistory } from 'history'
import store from './redux/store';
import { Provider } from "react-redux";
const getRoutes = (routes) => {
  return routes.map((prop, key) => {
    if (prop.subMenu) {
      return prop.subMenu.map((prop, key) => {
        return (
          <Route exact path={prop.layout + prop.path} component={prop.component} key={key} />
        );
      });
    }
    return (
      <Route exact path={prop.layout + prop.path} component={prop.component} key={key} />
    );
  });
};

ReactDOM.render(

  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Route path="/public" exact render={(props) => <PublicLayout {...props} />} />
        {
          getRoutes(routes)
        }
        {
          // getPostsAPIRoutes(routes)
        }
        {/* <Route component={NotFound} /> */}
        <Redirect from="/editProfile" to="/admin/EditProfile" />
        <Redirect from="/auth" to="/auth/login" />
        <Redirect from="/login" to="/auth/login" />
        <Redirect from="/setNewPassword" to="/auth/setNewPassword" />
        <Redirect from="/resetPassword" to="/auth/resetPassword" />
        <Redirect from="/otpAuthentication" to="/auth/otpAuthentication" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
