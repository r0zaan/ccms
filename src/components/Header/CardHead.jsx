import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
class CardHead extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">
                {this.props.titleName}
                <Link
                  to={window.location.pathname}
                  className="btn btn-sm btn-default ml-2"
                >
                  <i className="fas fa-redo"></i> Refresh
                </Link>
              </h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                {this.props.breadcrumbFirst ? (
                  <li className="breadcrumb-item">
                    <Link to={this.props.breadcrumbFirstLink}>
                      {this.props.breadcrumbFirst}
                    </Link>
                  </li>
                ) : (
                  <li className="breadcrumb-item">
                    <Link to={"/"}>Home</Link>
                  </li>
                )}
                {this.props.breadcrumbSecond ? (
                  <li className="breadcrumb-item">
                    <Link to={this.props.breadcrumbSecondLink}>
                      {this.props.breadcrumbSecond}
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                {this.props.breadcrumbThird ? (
                  <li className="breadcrumb-item">
                    <Link to={this.props.breadcrumbThirdLink}>
                      {this.props.breadcrumbThird}
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardHead;
