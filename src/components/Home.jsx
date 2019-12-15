import React, { Component } from "react";
import CardHead from "./Header/CardHead";
import $ from "jquery";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    $("#example2").hide();
  }
  render() {
    const products = [
      {
        id: "1",
        name: "Rojan",
        price: "5000"
      },
      {
        id: "2",
        name: "Rojan",
        price: "5000"
      },
      {
        id: "3",
        name: "Rojan",
        price: "5000"
      }
    ];
    const columns = [
      {
        dataField: "id",
        text: "Product ID",
        sort: true
      },
      {
        dataField: "name",
        text: "Product Name",
        sort: true
      },
      {
        dataField: "price",
        text: "Product Price",
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
          <CardHead titleName="Home" />
          <section className="content">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Test Data</h3>
                  </div>
                  <div className="card-body">
                    <BootstrapTable
                      bootstrap4
                      keyField="id"
                      data={products}
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

export default Home;
