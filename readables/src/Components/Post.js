import React, { Component } from "react";
import { Badge, Button, Card, Row, Col, Chip } from "react-materialize";
import user from "../Img/download.png";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { upVotePostAPI, downVotePostAPI } from "../Actions/actions";

class Post extends Component {
  render() {
    const { post, upVote, downVote } = this.props;
    return (
      <div>
        {post && (
          <Row>
            <Col m={2} s={0} />
            <Col m={8} s={12}>
              <Card
                title={post.title}
                actions={[
                  <Col  key="upvo1" l={2} m={4} s={4}>
                    <Button key="upvo" onClick={() => upVote(post.id)} icon="thumb_up" />
                  </Col>,
                  <Button
                    key="downvo1"
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
                  <Link to={`/${post.category}/${post.id}`}>
                    <Badge newIcon>Comments: {post.commentCount}</Badge>
                  </Link>
                </Row>
              </Card>
            </Col>
            <Col m={2} s={0} />
          </Row>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  upVote: id => dispatch(upVotePostAPI(id)),
  downVote: id => dispatch(downVotePostAPI(id))
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Post)
);
