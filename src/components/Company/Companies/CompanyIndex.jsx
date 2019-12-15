import React, { Component } from "react";
import axios from "axios";
import CardHead from "../../Header/CardHead";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Table from "../../Table/Table";
import Swal from "sweetalert2";
import toastr from "reactjs-toastr";
import "reactjs-toastr/lib/toast.css";

class CompanyIndex extends Component {
  state = {
    companies: [],
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

  handleTableChange = (
    type,
    { page, sizePerPage, sortField, sortOrder, data, totalSize }
  ) => {
    let result;
    const currentIndex = (page - 1) * sizePerPage;
    setTimeout(() => {
      this.setState(() => ({
        page,
        data: this.state.companies,
        sizePerPage,
        loading: false
      }));
    }, 500);
    if (sortOrder === "asc") {
      result = data.sort((a, b) => {
        if (a[sortField] > b[sortField]) {
          return 1;
        } else if (b[sortField] > a[sortField]) {
          return -1;
        }
        return 0;
      });
    } else {
      result = data.sort((a, b) => {
        if (a[sortField] > b[sortField]) {
          return -1;
        } else if (b[sortField] > a[sortField]) {
          return 1;
        }
        return 0;
      });
    }
    this.setState(() => ({ companies: result, loading: false }));
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
  handleView(row) {
    this.props.history.push("/companies/" + row.id);
  }
  handleEdit(row) {
    this.props.history.push("/companies/" + row.id + "/edit");
  }
  handleDelete(row) {
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
        axios.delete(deleteUrl + row.id).then(response => {
          let data = response.data;
          if (data.statusMessage === "success") {
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
    console.log(this.state.sizePerPage);
    axios
      .get(`http://localhost/dev/cg-foods/public/resourceApi/companies`)
      .then(response => {
        this.setState(
          {
            companies: response.data.data,
            data: response.data.data,
            totalSize: response.data.data.length,
            loading: false
          },
          function() {
            console.log(this.state.sizePerPage);
          }
        );
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
  search = () => {
    let { searchData } = this.state;
    const currentIndex = (this.state.page - 1) * this.state.sizePerPage;
    axios
      .get(
        `http://localhost/dev/cg-foods/public/resourceApi/companies?search=${searchData}`
      )
      .then(response => {
        this.setState({
          companies: response.data.data,
          data: response.data.data,
          totalSize: response.data.data.length,
          loading: false
        });
      });
  };
  table() {
    const { data, sizePerPage, page } = this.state;
    // console.log(sizePerPage);
    const columns = [
      {
        dataField: "id",
        text: "Company ID",
        footer: "Company ID",
        sort: true
      },
      {
        dataField: "code",
        text: "Company Code",
        footer: "Company Code",
        sort: true
      },
      {
        dataField: "name",
        text: "Company Name",
        footer: "Company Name",
        sort: true
      },
      {
        dataField: "location",
        text: "Company Address",
        footer: "Company Address",
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
        remote
        data={data}
        columns={columns}
        sizePerPage={sizePerPage}
        page={page}
        sizePerPage={sizePerPage}
        totalSize={totalSize}
        onTableChange={this.handleTableChange}
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
          titleName="Companies"
          breadcrumbFirst="Home"
          breadcrumbFirstLink="/"
          breadcrumbSecond="Company"
          breadcrumbSecondLink="/companies"
        />
        <section className="content">
          <div className="row">
            <div className={"col-12 " + hide}>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">List</h3>

                  <Link
                    className="btn btn-primary btn-sm bg-gradient float-right ml-2"
                    to={"/companies/create"}
                  >
                    <i className="fas fa-plus-square mr-1"></i>
                    Add Companies
                  </Link>
                  <Link
                    className="btn btn-info btn-sm bg-gradient float-right"
                    to={"/companies/upload/data"}
                  >
                    <i className="fas fa-upload mr-1"></i>
                    Upload from excel
                  </Link>
                </div>
                <div className="card-body" style={{ fontSize: "12px" }}>
                  <div className="col-sm-3 mb-2 float-right">
                    <label htmlFor="search">Search</label>
                    <input
                      type="text"
                      name="searchData"
                      onChange={this.handleUserInput}
                      className="form-control form-control-sm"
                    />
                  </div>
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

export default CompanyIndex;
