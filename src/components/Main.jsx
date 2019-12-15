import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard/Dashboard";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import User from "./User/User";
import UserForm from "./User/UserForm";
import Product from "./Product/Product";
import CompanyIndex from "./Company/Companies/CompanyIndex";
import CompanyForm from "./Company/Companies/CompanyForm";
import CompanyShow from "./Company/Companies/CompanyShow";
import CompanyImport from "./Company/Companies/CompanyImport";
import CityForm from "./City/CityForm";
import CityIndex from "./City/CityIndex";
import CityShow from "./City/CityShow";
import CityImport from "./City/CityImport";

class Main extends Component {
  state = {};
  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <Header />
        <Router>
          <Sidebar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/companies" component={CompanyIndex} />
            <Route exact path="/companies/create" component={CompanyForm} />
            <Route exact path="/companies/:id" component={CompanyShow} />
            <Route
              exact
              path="/companies/upload/data"
              component={CompanyImport}
            />
            <Route exact path="/companies/:id/edit" component={CompanyForm} />
            {/* City */}
            <Route exact path="/cities" component={CityIndex} />
            <Route exact path="/cities/create" component={CityForm} />
            <Route exact path="/cities/:id" component={CityShow} />
            <Route exact path="/cities/upload/data" component={CityImport} />
            <Route exact path="/cities/:id/edit" component={CityForm} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default Main;
