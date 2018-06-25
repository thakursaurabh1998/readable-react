import React, { Component } from "react";
import errorImg from "../Img/error.webp";

class Error404 extends Component {
  render() {
    return (
      <div>
        <img src={errorImg} alt="Error 404 Page not Found" />
      </div>
    );
  }
}

export default Error404