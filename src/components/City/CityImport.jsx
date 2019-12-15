import React, { Component } from "react";
import CardHead from "../Header/CardHead";
import ReactTooltip from "react-tooltip";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import toastr from "reactjs-toastr";
import "reactjs-toastr/lib/toast.css";
class CityImport extends Component {
  state = {
    open: false
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        open: true
      });
    }, 100);
  }
  render() {
    const hide = this.state.open ? "div-fade-in" : "div-fade-in hide";
    return (
      <div className="content-wrapper">
        <CardHead
          titleName="Company Excel Upload"
          breadcrumbFirst="Home"
          breadcrumbFirstLink="/"
          breadcrumbSecond="Company"
          breadcrumbSecondLink="/companies"
          breadcrumbThird="Upload"
          breadcrumbThirdLink="/companies/upload/data"
        />
        <section className="content">
          <div className="row ">
            <div className={"col-md-12 " + hide}>
              <div className="card card-info">
                <div className="card-header">
                  <h3 className="card-title">Form</h3>
                  <Link
                    to={"/companies"}
                    className="float-right btn btn-sm btn-secondary"
                  >
                    <i className="fas fa-arrow-left mr-1"></i>
                    Back
                  </Link>
                </div>

                <div className="card-body">
                  <form onSubmit={this.onSubmit} method={"POST"}>
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label htmlFor="customFile">Custom File</label>
                          <div className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="customFile"
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="customFile"
                            >
                              Choose file
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-sm btn-info">
                      <i className="fa fa-upload mr-1"></i>
                      Upload
                    </button>
                    <ReactTooltip effect="solid" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default CityImport;
