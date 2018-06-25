import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Button, Input, Card } from "react-materialize";
import {
  getPostById,
  getCommentsByPost,
  postComment
} from "../Actions/actions";
import Comment from "./Comment";
import Post from "./Post";

class PostDetail extends Component {
  componentWillMount() {
    const id = window.location.pathname.split("/")[2];
    if (Object.keys(this.props.posts).length === 0) this.props.getPost(id);
    this.props.getComments(id);
  }

  comment = e => {
    const id = window.location.pathname.split("/")[2];
    e.preventDefault();
    const name = e.target[0].value;
    const comment = e.target[1].value;
    if (name === "" || comment === "") {
      return;
    }
    this.props.postComment({ comment, name, id });
    e.target[0].value = "";
    e.target[1].value = "";
  };

  render() {
    const id = window.location.pathname.split("/")[2];
    let post;
    if (id in this.props.posts) post = this.props.posts[id];
    else post = 404;
    let count = 0;
    return (
      <div>
        <Post post={post} />
        <Row>
          <Col m={2} s={0} />
          <Col m={8} s={12}>
            <h4>Add Comment</h4>
          </Col>
          <Col m={2} s={0} />
        </Row>
        <form onSubmit={this.comment}>
          <Row>
            <Col m={2} s={0} />
            <Input name="name" type="text" label="Name" s={12} m={2} />
            <Input
              validate={true}
              name="comment"
              type="text"
              label="Comment here..."
              s={12}
              m={6}
            />
            <Col m={2} s={0} />
          </Row>
          <Row>
            <Col m={2} s={0} />
            <Col m={4} s={6} />
            <Button m={4} s={6}>
              Comment
            </Button>
            <Col m={2} s={0} />
          </Row>
        </form>
        <Row>
          <Col m={2} s={0} />
          <Col m={8} s={12}>
            <h4>Comments</h4>
          </Col>
          <Col m={2} s={0} />
        </Row>
        {this.props.comments.length &&
          this.props.comments.map((comment, index) => {
            if (comment.parentId === post.id && comment.deleted === false) {
              count++;
              return <Comment comment={comment} key={index} />;
            } else return null;
          })}
        {count === 0 && (
          <Row>
            <Col m={2} s={0} />
            <Col m={8} s={12}>
              <Card title="No Comments Available" />
            </Col>
            <Col m={2} s={0} />
          </Row>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ post, comment }) => ({
  posts: post,
  comments: Object.keys(comment).map(key => comment[key])
});

const mapDispatchToProps = dispatch => ({
  getPost: id => dispatch(getPostById(id)),
  getComments: id => dispatch(getCommentsByPost(id)),
  postComment: comment => dispatch(postComment(comment))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostDetail)
);
