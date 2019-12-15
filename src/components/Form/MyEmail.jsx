import React, { Component } from "react";

class MyEmail extends Component {
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

    switch (fieldName) {
      case this.props.name:
        textValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.text = textValid ? "" : " is invalid";
        break;
      default:
        break;
    }
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

  render() {
    return (
      <input
        type="email"
        className={this.errorClass(this.state.formErrors.text)}
        onChange={event => this.handleUserInput(event)}
        name={this.props.name}
        placeholder={this.props.placeholder}
      />
    );
  }
}

export default MyEmail;
