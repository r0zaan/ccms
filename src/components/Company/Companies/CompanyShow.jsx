import React, { Component } from "react";

import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CardHead from "../../Header/CardHead";
import Swal from "sweetalert2";
import toastr from "reactjs-toastr";
import "reactjs-toastr/lib/toast.css";
class CompanyShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      code: "",
      location: "",
      open: false
    };
  }
  componentDidMount() {
    let { id } = this.props.match.params;
    setTimeout(() => {
      this.setState({
        open: true
      });
    }, 100);
    axios
      .get(`http://localhost/dev/cg-foods/public/resourceApi/companies/${id}`)
      .then(response => {
        let data = response.data;
        this.setState({
          name: data.data.name,
          code: data.data.code,
          location: data.data.location
        });
      });
  }
  handleDelete(id) {
    let deleteUrl =
      "http://localhost/dev/cg-foods/public/resourceApi/companies/";
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this Company!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it"
    }).then(result => {
      if (result.value) {
        axios.delete(deleteUrl + id).then(response => {
          let data = response.data;
          if (data.statusMessage === "success") {
            Swal.fire("Deleted!", "Company has been deleted.", "success");
            toastr.error(response.data.message, "Deleted", {
              displayDuration: 3000
            });
            this.props.history.push("/companies");
          } else {
            toastr.warning(response.data.message, "No Deleted", {
              displayDuration: 3000
            });
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Deleted is Canceled", "error");
      }
    });
  }
  render() {
    const hide = this.state.open ? "div-fade-in" : "div-fade-in hide";
    let { name, code, location } = this.state;
    let { id } = this.props.match.params;
    return (
      <React.Fragment>
        <div className="content-wrapper">
          <CardHead
            titleName="Company Create"
            breadcrumbFirst="Home"
            breadcrumbFirstLink="/"
            breadcrumbSecond="Company"
            breadcrumbSecondLink="/companies"
            breadcrumbThird="Show"
            breadcrumbThirdLink={"/companies/show/"}
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
                      <i className="fas fa-arrow-left mr-2"></i>
                      Back
                    </Link>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label>
                            Name
                            <i className="fas fa-info-circle ml-1"></i>
                          </label>
                          <div>{name}</div>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label>
                            Code
                            <i className="fas fa-info-circle ml-1"></i>
                          </label>
                          <div>{code}</div>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label>Location</label>
                          <div>{location}</div>
                        </div>
                      </div>
                    </div>
                    <Link to={"/companies"} className="btn btn-default btn-sm">
                      <i className="fas fa-times mr-1"></i>
                      Close
                    </Link>
                    <Link
                      to={"/companies/" + id + "/edit"}
                      className="btn btn-sm btn-outline-primary ml-2"
                    >
                      <i className="fas fa-edit mr-1"></i>
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm ml-2 ts-buttom"
                      onClick={() => this.handleDelete(id)}
                      title="Delete"
                    >
                      <i className="fa fa-trash  mr-1"></i>
                      Delete
                    </button>
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

export default CompanyShow;
