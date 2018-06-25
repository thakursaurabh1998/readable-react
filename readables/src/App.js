import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import Posts from "./Components/Posts";
import SideNavbar from "./Components/SideNavbar";
import { Route, withRouter } from "react-router-dom";
import PostDetail from "./Components/PostDetail";
import AddPost from "./Components/AddPost";
import Error404 from "./Components/Error404"

class App extends Component {
  render() {
    return (
      <div>
        <SideNavbar />
        <AddPost />
        <div style={{ textAlign: "center" }}>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <Route exact path="/" render={() => <Posts category="" />} />
        <Route exact path="/404" render={() => <Error404 />} />
        <Route exact path="/:category/:id" render={() => <PostDetail />} />
        <Route exact path="/:category" render={() => <Posts />} />
      </div>
    );
  }
}

const mapStateToProps = ({ categories, comment }) => ({
  comments: comment.comments,
  categories: categories.categories
});

export default withRouter(connect(mapStateToProps)(App));
