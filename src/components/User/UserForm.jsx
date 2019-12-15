import React, { Component } from "react";
import CardHead from "../Header/CardHead";
import ReactTooltip from "react-tooltip";
import MyText from "../Form/MyText";
import MyEmail from "../Form/MyEmail";

class UserForm extends Component {
  state = {
    name: "",
    email: "",
    open: false
  };
  componentDidMount() {
    //slow loading
    setTimeout(() => {
      this.setState({
        open: true
      });
    }, 100);
  }
  render() {
    const hide = this.state.open ? "div-fade-in" : "div-fade-in hide";
    return (
      <React.Fragment>
        <div className="content-wrapper">
          <CardHead
            titleName="User"
            breadcrumbFirst="Home"
            breadcrumbFirstLink="/"
            breadcrumbSecond="User"
            breadcrumbSecondLink="/user"
            breadcrumbThird="Create"
            breadcrumbThirdLink="/user/create"
          />
          <section className="content">
            <div className="row ">
              <div className={"col-md-12 " + hide}>
                <div className="card card-info">
                  <div className="card-header">
                    <h3 className="card-title">Create User</h3>
                  </div>
                  <div className="card-body">
                    <form role="form">
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
                            <MyText name="name" placeholder="Enter Name" />
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group">
                            <label>Email</label>
                            <MyEmail name="email" placeholder="Enter Email" />
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={!this.state.formValid}
                      >
                        Create
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

export default UserForm;
