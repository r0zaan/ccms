import React, { Component } from "react";
import CardHead from "../Header/CardHead";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

class User extends Component {
  state = {};
  render() {
    const users = [
      {
        id: "1",
        name: "Rojan",
        email: "rojantamrakar@gmail.com"
      },
      {
        id: "2",
        name: "Test",
        email: "test@gmail.com"
      },
      {
        id: "3",
        name: "test2",
        email: "test2@gmail.com"
      },
      {
        id: "4",
        name: "test3",
        email: "test3@gmail.com"
      }
    ];
    const columns = [
      {
        dataField: "id",
        text: "User ID",
        sort: true
      },
      {
        dataField: "name",
        text: "User Name",
        sort: true
      },
      {
        dataField: "email",
        text: "User Email",
        sort: true
      }
    ];

    const selectRow = {
      mode: "radio",
      clickToSelect: true
    };

    return (
      <React.Fragment>
        <div className="content-wrapper">
          <CardHead titleName="User" />
          <section className="content">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">List</h3>
                    <Link
                      className="btn btn-primary btn-sm bg-gradient float-right"
                      to={"/user/create"}
                    >
                      <i className="fas fa-plus-square mr-1"></i>
                      Add User
                    </Link>
                  </div>
                  <div className="card-body">
                    <BootstrapTable
                      bootstrap4
                      keyField="id"
                      data={users}
                      columns={columns}
                      pagination={paginationFactory()}
                      selectRow={selectRow}
                    />
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

export default User;
