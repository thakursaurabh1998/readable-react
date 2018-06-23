import React, { Component } from "react";
import { connect } from "react-redux";
import user from "../Img/download.png";
import { Col, Card, Row, Chip, Badge, Button } from "react-materialize";

class Posts extends Component {
  render() {
    return (
      <Row>
        <Col m={3} s={0} />
        <Col m={6} s={12}>
          {this.props.posts &&
            this.props.posts.map((post, index) => (
              <Card
                key={index}
                title={post.title}
                actions={[
                  <Col l={3} m={5} s={4}>
                    <Button key={index} icon="thumb_up" />
                  </Col>,
                  <Button key={index} icon="thumb_down" />
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
  posts: post.posts
});

export default connect(mapStateToProps)(Posts);
