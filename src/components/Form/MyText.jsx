import React, { Component } from "react";

class MyText extends Component {
  state = {
    text: "",
    formErrors: { text: "" },
    textValid: false,
    formValid: false
  };
  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let textValid = this.state.textValid;

    // switch (fieldName) {
    //   case this.props.name:
    //     textValid = value.length >= 6;
    //     fieldValidationErrors.text = textValid ? "" : " is too short";
    //     break;
    //   default:
    //     break;
    // }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        textValid: textValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.textValid
    });
  }
  errorClass(error) {
    return error.length === 0
      ? "form-control form-control-sm"
      : "form-control form-control-sm is-invalid";
  }
  hasValidation() {
    if (this.props.validationData) {
      console.log(this.props.validationData);
      return <span style={{ color: "red" }}>{this.props.validationData}</span>;
    } else {
      return "";
    }
  }
  render() {
    return (
      <div>
        <input
          type="text"
          className={
            this.errorClass(this.state.formErrors.text) +
            " " +
            this.props.className
          }
          onChange={event => this.handleUserInput(event)}
          onChange={this.props.onChange}
          name={this.props.name}
          placeholder={this.props.placeholder}
          value={this.props.value}
        />
        {this.hasValidation()}
      </div>
    );
  }
}

export default MyText;
