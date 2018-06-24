import React, { Component } from "react";
import { connect } from "react-redux";
import user from "../Img/download.png";
import { Col, Card, Row, Chip, Badge, Button } from "react-materialize";
import { upVotePostAPI, downVotePostAPI } from "../Actions/actions";

class Posts extends Component {
  render() {
    const { upVote, downVote } = this.props
    return (
      <Row>
        <Col m={3} s={0} />
        <Col m={6} s={12}>
          {this.props.posts &&
            this.props.posts.map((post, index) => (
              <Card
                key={post.id}
                title={post.title}
                actions={[
                  <Col key={index} l={3} m={5} s={4}>
                    <Button onClick={() => upVote(post.id)} key={index+"like"} icon="thumb_up" />
                  </Col>,
                  <Button onClick={() => downVote(post.id)} key={index+"dislike"} icon="thumb_down" />
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
            ))}
        </Col>
        <Col m={3} s={0} />
      </Row>
    );
  }
}

const mapStateToProps = ({ post }) => ({
  posts: Object.keys(post).map(key => post[key])
});

const mapDispatchToProps = dispatch => ({
  upVote: id => dispatch(upVotePostAPI(id)),
  downVote: id => dispatch(downVotePostAPI(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
