import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts } from "../Actions/actions";
import { Col, Card, Row, Input } from "react-materialize";
import { upVotePostAPI, downVotePostAPI } from "../Actions/actions";
import { withRouter } from "react-router-dom";
import Post from "./Post";

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  state = {
    sort: "0"
  };

  changeVal = e => {
    this.setState({ sort: e.target.value });
  };

  changeSort = () => {
    const temp = this.state.sort;
    return this.props.posts.sort((a, b) => {
      switch (temp) {
        case "recent":
          return b["timestamp"] - a["timestamp"];
        case "mostPopular":
          return b["voteScore"] - a["voteScore"];
        case "leastPopular":
          return a["voteScore"] - b["voteScore"];
        default:
          return 1;
      }
    });
  };

  render() {
    let count = 0;
    let category = window.location.pathname.split("/")[1];
    return (
      <div>
        {window.location.pathname.split('/')[1]!=='404' && (
          <Row>
            <Col m={2} s={0} />
            <Input
              s={12}
              m={4}
              onChange={this.changeVal}
              type="select"
              label="Sort"
              icon="sort"
              defaultValue="0"
            >
              <option value="0" disabled>
                Sort by
              </option>
              <option value="recent">Recent</option>
              <option value="mostPopular">Most Popular</option>
              <option value="leastPopular">Least Popular</option>
            </Input>
          </Row>
        )}
        {this.props.posts &&
          this.changeSort(this.props.posts).map((post, index) => {
            if (
              post.deleted === false &&
              (category === post.category || category === "")
            ) {
              count++;
              return <Post btns={2} key={index} post={post} />;
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
