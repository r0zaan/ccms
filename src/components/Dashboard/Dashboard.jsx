import React, { Component } from "react";
import CardHead from "../Header/CardHead";

class Dashboard extends Component {
  state = {};
  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <div className="content-wrapper">
          <CardHead titleName="Dashboard" />
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
