import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from 'react-redux'
import { getPosts, getComments } from './Actions/actions'
import Posts from './Components/Posts'
import SideNavbar from './Components/SideNavbar'
// import { Button, Icon } from "react-materialize";

class App extends Component {
  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchComments("8xf0y6ziyjabvozdd253nd");
  }

  render() {
    return (
      <div>
        <SideNavbar/>
        <div style={{ textAlign: "center" }}>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <Posts/>
      </div>
    );
  }
}

const mapStateToProps = ({post, comment}) => ({
  posts: post.posts,
  comments: comment.comments
})

const mapDispatchToProps = dispatch => ({
  fetchPosts : () => dispatch(getPosts()),
  fetchComments : (id) => dispatch(getComments(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
