import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Login extends Component {
  render() {
    return (
      <div>
        <Button waves="light">
          Login with github
          <Icon left>cloud</Icon>
        </Button>
      </div>
    );
  }
}

export default withRouter(connect()(Login));
