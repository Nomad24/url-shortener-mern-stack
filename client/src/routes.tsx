import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CreatePage from "./pages/createPage";
import AuthPage from "./pages/authPage";
import HomePage from "./pages/home.page";
import DetailPage from "./pages/detail.page";
import LinksPage from "./pages/links.page";
import BrandsPage from "./pages/brands.page";

interface createPage {
  isAuth: boolean;
}

const UseRoutes: React.FC<createPage> = (props) => {
  if (props.isAuth) {
    return (
      <Switch>
        <Route path="/create" exact>
          <CreatePage />
        </Route>
        <Route path="/detail/:id">
          <DetailPage />
        </Route>
        <Route path="/links">
          <LinksPage />
        </Route>
        <Route path="/brand-links">
          <BrandsPage />
        </Route>
        <Redirect to="/create" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/auth">
        <AuthPage />
      </Route>
      <Route path="/" exact>
          <HomePage />
        </Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default UseRoutes;
