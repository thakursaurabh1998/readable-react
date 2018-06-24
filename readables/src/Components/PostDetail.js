import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import user from "../Img/download.png";
import { Icon, Card, Row, Col, Badge, Button, Chip, Input } from "react-materialize";
import {
  upVotePostAPI,
  downVotePostAPI,
  getPostById,
  getCommentsByPost,
  postComment
} from "../Actions/actions";

class PostDetail extends Component {
  componentWillMount() {
    const id = window.location.pathname.split("/")[2];
    if (Object.keys(this.props.posts).length === 0) this.props.getPost(id);
    this.props.getComments(id);
  }

  upVoteComment = () => {
    console.log("hello");
  }

  comment = e => {
    const id = window.location.pathname.split("/")[2];
    e.preventDefault();
    const name = e.target[0].value;
    const comment = e.target[1].value;
    // console.log(name, comment, id);
    this.props.postComment({ comment, name, id });
  };

  render() {
    const id = window.location.pathname.split("/")[2];
    const post = this.props.posts[id];
    const { upVote, downVote } = this.props;
    return (
      <div>
        {post && (
          <Row>
            <Col m={2} s={0} />
            <Col m={8} s={12}>
              <Card
                title={post.title}
                actions={[
                  <Col key={post.id} l={2} m={4} s={4}>
                    <Button onClick={() => upVote(post.id)} icon="thumb_up" />
                  </Col>,
                  <Button
                    key={post.timestamp}
                    onClick={() => downVote(post.id)}
                    icon="thumb_down"
                  />
                ]}
              >
                <Row>{post.body}</Row>
                <Row>
                  <Chip>
                    <img src={user} alt="Contact Person" />
                    {post.author}
                  </Chip>
                  <Badge newIcon>Post votes: {post.voteScore}</Badge>{" "}
                  <Badge newIcon>Comments: {post.commentCount}</Badge>
                </Row>
              </Card>
            </Col>
            <Col m={2} s={0} />
          </Row>
        )}
        <form onSubmit={this.comment}>
          <Row>
            <Col m={2} s={0} />
            <Input name="name" type="text" label="Name" s={12} m={2} />
            <Input
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
          <h3>Comments</h3>
          <Col m={2} s={0} />
        </Row>
        {this.props.comments &&
          this.props.comments.map((comment, index) => (
            <Row key={index}>
              <Col m={2} s={0} />
              <Col m={8} s={12}>
                <Card
                  key={index}
                  className="blue-grey darken-1"
                  textClassName="white-text"
                  actions={[<a onClick={this.upVoteComment} key={index+"up"}><Icon>thumb_up</Icon></a>,<a key={index+"down"}><Icon>thumb_down</Icon></a>]}
                >
                  {comment.body}
                  <br/>
                    <Chip>
                      <img src={user} alt="Contact Person" />
                      {comment.author}
                    </Chip>
                </Card>
              </Col>
              <Col m={2} s={0} />
            </Row>
          ))}
      </div>
    );
  }
}

const mapStateToProps = ({ post, comment }) => ({
  posts: post,
  comments: Object.keys(comment).map(key => comment[key])
});

const mapDispatchToProps = dispatch => ({
  upVote: id => dispatch(upVotePostAPI(id)),
  downVote: id => dispatch(downVotePostAPI(id)),
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
