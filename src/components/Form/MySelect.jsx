import React, { Component } from "react";
import Select from "react-select";

class MySelect extends Component {
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
      return <span style={{ color: "red" }}>{this.props.validationData}</span>;
    } else {
      return "";
    }
  }
  render() {
    let { placeholder, onChange, className, name, value, options } = this.props;

    return (
      <div>
        <select
          className={
            this.errorClass(this.state.formErrors.text) + " " + className
          }
          onChange={onChange}
          name={name}
          placeholder={placeholder}
          value={value}
        >
          <option disabled value="0">
            {placeholder}
          </option>
          {options.map((item, key) => {
            return (
              <option value={item.value} key={key}>
                {item.label}
              </option>
            );
          })}
        </select>
        {this.hasValidation()}
      </div>
    );
  }
}

export default MySelect;
