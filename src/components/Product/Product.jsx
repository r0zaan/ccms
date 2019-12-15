import React, { Component } from "react";
import axios from "axios";
import CardHead from "../Header/CardHead";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Table from "../Table/Table";
class Product extends Component {
  state = {
    products: [],
    page: 1,
    data: [],
    sizePerPage: 10
  };

  handleTableChange = (type, { page, sizePerPage }) => {
    const currentIndex = (page - 1) * sizePerPage;
    setTimeout(() => {
      this.setState(() => ({
        page,
        data: this.state.products.slice(
          currentIndex,
          currentIndex + sizePerPage
        ),
        sizePerPage
      }));
    }, 500);
    this.setState(() => ({ data: [] }));
  };
  componentDidMount() {
    const currentIndex = (this.state.page - 1) * this.state.sizePerPage;
    axios
      .get(`http://localhost/dev/cg-foods/public/products1`)
      .then(response => {
        this.setState({
          products: response.data,
          data: response.data.slice(
            currentIndex,
            currentIndex + this.state.sizePerPage
          )
        });
      });
  }
  render() {
    const { data, sizePerPage, page } = this.state;
    const columns = [
      {
        dataField: "id",
        text: "Product ID",
        footer: "Product ID",
        sort: true
      },
      {
        dataField: "detail",
        text: "Product Name",
        footer: "Product Name",
        sort: true
      },
      {
        dataField: "code",
        text: "Product Code",

        footer: "Product Code",
        sort: true
      }
    ];
    const selectRow = {
      mode: "radio",
      clickToSelect: true
    };
    return (
      <div className="content-wrapper">
        <CardHead titleName="Home" />
        <section className="content">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Test Data</h3>
                </div>
                <div className="card-body" style={{ fontSize: "12px" }}>
                  <Table
                    bootstrap4
                    remote
                    data={data}
                    columns={columns}
                    sizePerPage={sizePerPage}
                    totalSize={this.state.products.length}
                    onTableChange={this.handleTableChange}
                    striped={true}
                    hover={true}
                    condensed={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Product;
