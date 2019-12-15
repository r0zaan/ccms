import React, { Component } from "react";

class Footer extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <footer class="main-footer">
          <strong>
            Copyright &copy; 2014-2019{" "}
            <a href="http://adminlte.io">AdminLTE.io</a>.
          </strong>
          All rights reserved.
          <div class="float-right d-none d-sm-inline-block">
            <b>Version</b> 3.0.1
          </div>
        </footer>
        <aside class="control-sidebar control-sidebar-dark"></aside>
      </React.Fragment>
    );
  }
}

export default Footer;
