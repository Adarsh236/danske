import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Header from "components/Header";

import Home from "pages/Home";
import Database from "pages/Database";

export function Controller() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/database" component={Database} exact />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}
