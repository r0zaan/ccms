import React, { Component } from "react";
import axios from "axios";
import CardHead from "../Header/CardHead";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Table from "../Table/Table";
import Swal from "sweetalert2";
import toastr from "reactjs-toastr";
import "reactjs-toastr/lib/toast.css";

class CityIndex extends Component {
  state = {
    cities: [],
    page: 1,
    data: [],
    searchData: "",
    sizePerPage: 10,
    totalSize: "",
    open: false,
    typing: false,
    loading: true,
    typingTimeout: 0
  };

  handleTableChange = (type, { page, sizePerPage }) => {
    let result;
    const currentIndex = (page - 1) * sizePerPage;
    setTimeout(() => {
      this.setState(() => ({
        page,
        data: this.state.cities,
        sizePerPage,
        loading: false
      }));
    }, 500);
  };

  GetActionFormat = (cell, row) => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-outline-primary btn-xs ts-buttom"
          size="sm"
          onClick={() => this.handleView(row)}
          title="View"
        >
          <i className="fa fa-eye"></i>
        </button>
        <button
          type="button"
          className="btn btn-outline-success btn-xs ml-1 ts-buttom"
          size="sm"
          onClick={() => this.handleEdit(row)}
        >
          <i className="fas fa-edit"></i>
        </button>
        <button
          type="button"
          className="btn btn-outline-danger btn-xs ml-1 ts-buttom"
          size="sm"
          onClick={() => this.handleDelete(row)}
          title="Delete"
        >
          <i className="fa fa-trash"></i>
        </button>
      </div>
    );
  };
  GetStatusFormat = (cell, row) => {
    return (
      <div>
        {row.status == 1 ? (
          <span className="badge badge-info">Active</span>
        ) : (
          <span className="badge badge-danger">In-Active</span>
        )}
      </div>
    );
  };
  handleView(row) {
    this.props.history.push("/cities/" + row.id);
  }
  handleEdit(row) {
    this.props.history.push("/cities/" + row.id + "/edit");
  }
  handleDelete(row) {
    let deleteUrl = "http://192.168.11.92/ccms/public/api/cities/";
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this Company!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it"
    }).then(result => {
      if (result.value) {
        console.log(row);
        axios
          .delete(deleteUrl + row.id)
          .then(response => {
            console.log(response);
            let data = response.data;
            if (data.statusMessage === "Success") {
              this.setState({
                data: this.state.data.filter(i => i.id !== row.id)
              });
              Swal.fire("Deleted!", "Company has been deleted.", "success");
              toastr.error(response.data.message, "Deleted", {
                displayDuration: 3000
              });
            } else {
              toastr.warning(response.data.message, "No Deleted", {
                displayDuration: 3000
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Deleted is Canceled", "error");
      }
    });
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        open: true
      });
    }, 100);
    axios.get(`http://192.168.11.92/ccms/public/api/cities`).then(response => {
      this.setState({
        cities: response.data.data,
        data: response.data.data,
        totalSize: response.data.data.length,
        loading: false
      });
    });
  }
  handleUserInput = e => {
    const { name, value } = e.target;
    const self = this;
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }
    this.setState({
      [name]: value,
      typing: false,
      loading: true,
      typingTimeout: setTimeout(function() {
        self.search();
      }, 700)
    });
  };
  table() {
    const { data, sizePerPage, page } = this.state;
    const columns = [
      {
        dataField: "id",
        text: "ID",
        footer: "ID",
        sort: true
      },
      {
        dataField: "name",
        text: "Name",
        footer: "Name",
        sort: true
      },
      {
        dataField: "district_name",
        text: "District",
        footer: "District",
        sort: true
      },
      {
        dataField: "zone_name",
        text: "Zone",
        footer: "Zone",
        sort: true
      },
      {
        dataField: "status",
        text: "Status",
        formatter: this.GetStatusFormat,
        footer: "Status",
        sort: true
      },
      {
        dataField: "",
        text: "Action",
        formatter: this.GetActionFormat,
        footer: "Action",
        csvExport: false
      }
    ];
    const totalSize = this.state.totalSize;
    return (
      <Table
        data={data}
        columns={columns}
        sizePerPage={sizePerPage}
        page={page}
        sizePerPage={sizePerPage}
        totalSize={totalSize}
        striped={true}
        hover={true}
        condensed={true}
        loading={this.state.loading}
      />
    );
  }
  render() {
    const hide = this.state.open ? "div-fade-in" : "div-fade-in hide";
    return (
      <div className="content-wrapper">
        <CardHead
          titleName="Cities"
          breadcrumbFirst="Home"
          breadcrumbFirstLink="/"
          breadcrumbSecond="Cities"
          breadcrumbSecondLink="/cities"
        />
        <section className="content">
          <div className="row">
            <div className={"col-12 " + hide}>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">List</h3>

                  <Link
                    className="btn btn-primary btn-sm bg-gradient float-right ml-2"
                    to={"/cities/create"}
                  >
                    <i className="fas fa-plus-square mr-1"></i>
                    Add Cities
                  </Link>

                  {/*
                    For Upload Excel
                  <Link
                    className="btn btn-info btn-sm bg-gradient float-right"
                    to={"/cities/upload/data"}
                  >
                    <i className="fas fa-upload mr-1"></i>
                    Upload from excel
                  </Link> */}
                </div>
                <div className="card-body" style={{ fontSize: "12px" }}>
                  {this.table()}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default CityIndex;
