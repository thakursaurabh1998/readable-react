import React, { Component } from "react";
import { connect } from "react-redux";
import user from "../Img/download.png";
import { getPosts } from "../Actions/actions";
import { Col, Card, Row, Chip, Badge, Button } from "react-materialize";
import { upVotePostAPI, downVotePostAPI } from "../Actions/actions";
import { withRouter, Link } from "react-router-dom";

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const { upVote, downVote } = this.props;
    let count = 0;
    return (
      <div>
        {this.props.posts &&
          this.props.posts.map((post, index) => {
            if (
              this.props.category === post.category ||
              this.props.category === ""
            ) {
              count++;
              return (
                <Row key={index + "row"}>
                  <Col m={2} s={0} />
                  <Col m={8} s={12}>
                    <Card
                      key={post.id}
                      title={post.title}
                      actions={[
                        <Col key={index} l={2} m={4} s={4}>
                          <Button
                            onClick={() => upVote(post.id)}
                            key={index + "like"}
                            icon="thumb_up"
                          />
                        </Col>,
                        <Button
                          onClick={() => downVote(post.id)}
                          key={index + "dislike"}
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
              );
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
