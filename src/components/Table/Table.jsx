import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Loader from "react-loader-spinner";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import ToolkitProvider, {
  CSVExport,
  Search
} from "react-bootstrap-table2-toolkit";
import overlayFactory from "react-bootstrap-table2-overlay";

const { SearchBar } = Search;
const ExportCSVButton = props => {
  const handleClick = () => {
    props.onExport();
  };
  return (
    <div>
      <button className="btn btn-success btn-sm" onClick={handleClick}>
        <i className="fa fa-file-excel mr-1"></i>
        Excel Export
      </button>
    </div>
  );
};
class Table extends Component {
  state = {};
  render() {
    const {
      page,
      sizePerPage,
      striped,
      hover,
      totalSize,
      condensed,
      pagination,
      loading
    } = this.props;
    return (
      <div>
        <ToolkitProvider
          bootstrap4
          keyField="id"
          data={this.props.data}
          columns={this.props.columns}
          exportCSV={{
            fileName: "excel.csv"
          }}
          search
        >
          {props => (
            <div>
              <SearchBar {...props.searchProps} />
              <br />
              <ExportCSVButton {...props.csvProps} />
              <BootstrapTable
                keyField="id"
                striped={striped}
                hover={hover}
                condensed={condensed}
                pagination={paginationFactory({
                  showTotal: true,
                  alwaysShowAllBtns: true
                })}
                noDataIndication={() => (
                  // <Loader type="ThreeDots" color="skyblue" height={80} width={80} />
                  <div>No data Found</div>
                )}
                {...props.baseProps}
                loading={loading}
                overlay={overlayFactory({
                  spinner: true,
                  styles: {
                    overlay: base => ({ ...base, background: "#32353885" })
                  }
                })}
                selectRow={{ mode: "checkbox" }}
              />
            </div>
          )}
        </ToolkitProvider>
      </div>
    );
  }
}

export default Table;
