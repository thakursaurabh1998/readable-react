import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts } from "../Actions/actions";
import { Col, Card, Row } from "react-materialize";
import {
  upVotePostAPI,
  downVotePostAPI
} from "../Actions/actions";
import { withRouter } from "react-router-dom";
import Post from "./Post";

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    let count = 0;
    let category = window.location.pathname.split('/')[1];
    return (
      <div>
        {this.props.posts &&
          this.props.posts.map((post, index) => {
            if (
              category === post.category ||
              category === ""
            ) {
              count++;
              return <Post key={index} post={post}/>;
            }
            return null;
          })}
        {count === 0 && (
          <Row>
            <Col m={3} s={0} />
            <Col m={6} s={12}>
              <Card title="Sorry! No Posts Available" />
            </Col>
            <Col m={3} s={0} />
          </Row>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ post }) => ({
  posts: Object.keys(post).map(key => post[key])
});

const mapDispatchToProps = dispatch => ({
  upVote: id => dispatch(upVotePostAPI(id)),
  downVote: id => dispatch(downVotePostAPI(id)),
  fetchPosts: () => dispatch(getPosts())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Posts)
);
