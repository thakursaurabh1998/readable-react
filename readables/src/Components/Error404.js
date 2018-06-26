import React, { Component } from "react";
import errorImg from "../Img/error.jpg";

class Error404 extends Component {
  render() {
    return (
      <div>
        <img
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto"
          }}
          src={errorImg}
          alt="Error 404 Page not Found"
        />
      </div>
    );
  }
}

export default Error404;
