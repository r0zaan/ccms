import React, { Component } from "react";
import CardHead from "../../Header/CardHead";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import MyText from "../../Form/MyText";
import axios from "axios";
import toastr from "reactjs-toastr";
import "reactjs-toastr/lib/toast.css";
class CompanyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      code: "",
      location: "",
      open: false,
      validation: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    let { id } = this.props.match.params;
    if (id) {
      axios
        .put(
          `http://localhost/dev/cg-foods/public/resourceApi/companies/${id}`,
          {
            name: this.state.name,
            code: this.state.code,
            location: this.state.location
          }
        )
        .then(response => {
          let data = response.data;
          if (data.statusMessage === "success") {
            toastr.success(data.message, "Success", {
              displayDuration: 3000
            });
            this.props.history.push("/companies");
          } else if (data.statusMessage === "fail") {
            toastr.error(data.message, "Fail", {
              displayDuration: 3000
            });
            console.log(data.errors);
            this.setState({ validation: data.errors });
          } else {
            console.log("Something is Work");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      axios
        .post(`http://localhost/dev/cg-foods/public/resourceApi/companies`, {
          name: this.state.name,
          code: this.state.code,
          location: this.state.location
        })
        .then(response => {
          let data = response.data;
          if (data.statusMessage === "success") {
            toastr.success(data.message, "Success", {
              displayDuration: 3000
            });
            this.props.history.push("/companies");
          } else if (data.statusMessage === "fail") {
            toastr.error(data.message, "Fail", {
              displayDuration: 3000
            });
            console.log(data.errors);
            this.setState({ validation: data.errors });
          } else {
            console.log("Something is Work");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
  checkValidation(data) {
    if (data in this.state.validation) {
      return "is-invalid";
    } else {
      return "";
    }
  }
  handleUserInput(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }
  editChangeData(id) {
    if (id) {
      axios
        .get(`http://localhost/dev/cg-foods/public/resourceApi/companies/${id}`)
        .then(response => {
          let data = response.data;
          if (data.statusMessage === "success") {
            this.setState({
              name: data.data.name,
              code: data.data.code,
              location: data.data.location
            });
          } else {
            toastr.error(data.message, "Fail", {
              displayDuration: 3000
            });
            this.props.history.push("/companies");
          }
        });
    }
  }
  componentDidMount() {
    //slow loading
    let { id } = this.props.match.params;
    this.editChangeData(id);

    setTimeout(() => {
      this.setState({
        open: true
      });
    }, 100);
  }
  render() {
    let { id } = this.props.match.params;
    const hide = this.state.open ? "div-fade-in" : "div-fade-in hide";
    id = id ? "Update" : "Create";
    let method = id ? "PATCH" : "POST";
    return (
      <React.Fragment>
        <div className="content-wrapper">
          <CardHead
            titleName="Company Create"
            breadcrumbFirst="Home"
            breadcrumbFirstLink="/"
            breadcrumbSecond="Company"
            breadcrumbSecondLink="/companies"
            breadcrumbThird="Create"
            breadcrumbThirdLink="/companies/create"
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
                    <form onSubmit={this.onSubmit} method={method}>
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="form-group">
                            <label>
                              Name
                              <i
                                className="fas fa-info-circle ml-1"
                                data-tip="Minimun 6 letter"
                              ></i>
                            </label>
                            <MyText
                              name="name"
                              placeholder="Enter Name"
                              value={this.state.name}
                              onChange={event => this.handleUserInput(event)}
                              className={this.checkValidation("name")}
                              validationData={this.state.validation["name"]}
                            />
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group">
                            <label>
                              Code
                              <i
                                className="fas fa-info-circle ml-1"
                                data-tip="Mandatory"
                              ></i>
                            </label>
                            <MyText
                              name="code"
                              placeholder="Enter Code"
                              value={this.state.code}
                              onChange={event => this.handleUserInput(event)}
                              className={this.checkValidation("code")}
                              validationData={this.state.validation["code"]}
                            />
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group">
                            <label>Location</label>
                            <MyText
                              name="location"
                              placeholder="Enter Location"
                              value={this.state.location}
                              onChange={event => this.handleUserInput(event)}
                              className={this.checkValidation("location")}
                              validationData={this.state.validation["location"]}
                            />
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-sm btn-info">
                        <i className="fa fa-check mr-1"></i>
                        {id}
                      </button>
                      <ReactTooltip effect="solid" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default CompanyForm;
