import React, { Component } from "react";
import CardHead from "../Header/CardHead";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import MyText from "../Form/MyText";
import axios from "axios";
import toastr from "reactjs-toastr";
import "reactjs-toastr/lib/toast.css";
import Select from "react-select";
import MySelect from "../Form/MySelect";
class CityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      status: 1,
      status_data: [
        {
          value: 0,
          label: "In-Active"
        },
        {
          value: 1,
          label: "Active"
        }
      ],
      district_id: 0,
      districts: "",
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
        .put(`http://192.168.11.92/ccms/public/api/cities/${id}`, {
          name: this.state.name,
          status: this.state.status,
          district_id: this.state.district_id
        })
        .then(response => {
          let data = response.data;
          if (data.statusMessage === "Success") {
            toastr.success(data.message, "Success", {
              displayDuration: 3000
            });
            this.props.history.push("/cities");
          } else if (data.statusMessage === "Fail") {
            toastr.error(data.message, "Fail", {
              displayDuration: 3000
            });
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
        .post(`http://192.168.11.92/ccms/public/api/cities`, {
          name: this.state.name,
          status: this.state.status,
          district_id: this.state.district_id
        })
        .then(response => {
          let data = response.data;
          if (data.statusMessage === "Success") {
            toastr.success(data.message, "Success", {
              displayDuration: 3000
            });
            this.props.history.push("/cities");
          } else if (data.statusMessage === "Fail") {
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
        .get(`http://192.168.11.92/ccms/public/api/cities/${id}`)
        .then(response => {
          let data = response.data;
          if (data.statusMessage === "Success") {
            this.setState({
              name: data.data.name,
              status: data.data.status,
              district_id: data.data.district_id
            });
          } else {
            toastr.error(data.message, "Fail", {
              displayDuration: 3000
            });
            this.props.history.push("/cities");
          }
        });
    }
  }
  componentDidMount() {
    //slow loading
    let districts = [];
    let { id } = this.props.match.params;
    this.editChangeData(id);
    axios
      .get(`http://192.168.11.92/ccms/public/api/cities/create`)
      .then(response => {
        let data = response.data;
        if (data.statusMessage === "Success") {
          data.data.map(item =>
            districts.push({
              value: item.id,
              label: item.name,
              name: "district_id"
            })
          );
          this.setState({
            districts: districts
          });
        } else {
          toastr.error(data.message + " Please Refresh", "Fail", {
            displayDuration: 3000
          });
          districts.push({
            value: 0,
            label: "Loading"
          });
          this.setState({
            districts: districts
          });
        }
      })
      .catch(error => {
        districts.push({
          value: 0,
          label: "Loading"
        });
        this.setState({
          districts: districts
        });
      });
    setTimeout(() => {
      this.setState({
        open: true
      });
    }, 100);
  }
  render() {
    let { id } = this.props.match.params;
    let {
      status_data,
      status,
      districts,
      district_id,
      open,
      name,
      validation
    } = this.state;
    const hide = open ? "div-fade-in" : "div-fade-in hide";
    let button = id ? "Update" : "Create";
    let method = id ? "PATCH" : "POST";
    return (
      <React.Fragment>
        <div className="content-wrapper">
          <CardHead
            titleName="City Create"
            breadcrumbFirst="Home"
            breadcrumbFirstLink="/"
            breadcrumbSecond="Cities"
            breadcrumbSecondLink="/cities"
            breadcrumbThird="Create"
            breadcrumbThirdLink="/cities/create"
          />
          <section className="content">
            <div className="row ">
              <div className={"col-md-12 " + hide}>
                <div className="card card-info">
                  <div className="card-header">
                    <h3 className="card-title">Form</h3>
                    <Link
                      to={"/cities"}
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
                              value={name}
                              onChange={event => this.handleUserInput(event)}
                              className={this.checkValidation("name")}
                              validationData={validation["name"]}
                            />
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group">
                            <label>
                              District
                              <i
                                className="fas fa-info-circle ml-1"
                                data-tip="Mandatory"
                              ></i>
                            </label>
                            <MySelect
                              options={districts ? districts : []}
                              name="district_id"
                              value={district_id}
                              className="form-control form-control-sm"
                              onChange={event => this.handleUserInput(event)}
                              placeholder="Enter District"
                              validationData={validation["district_id"]}
                            />
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group">
                            <label>Status</label>
                            <MySelect
                              options={status_data}
                              name="status"
                              placeholder="Enter Status"
                              value={status}
                              onChange={event => this.handleUserInput(event)}
                              className={this.checkValidation("location")}
                              validationData={validation["location"]}
                            />
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-sm btn-info">
                        <i className="fa fa-check mr-1"></i>
                        {button}
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

export default CityForm;
