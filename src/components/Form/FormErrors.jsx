import React, { Component } from "react";

class FormErrors extends Component {
  state = {};
  render() {
    return (
      <div className="formErrors">
        {Object.keys(this.props.formErrors).map((fieldName, i) => {
          if (this.props.formErrors[fieldName].length > 0) {
            return (
              <p key={i} style={{ color: "red" }}>
                {fieldName} {this.props.formErrors[fieldName]}
              </p>
            );
          } else {
            return "";
          }
        })}
      </div>
    );
  }
}

export default FormErrors;
