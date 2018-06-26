import React, { Component } from "react";
import {
  Badge,
  Button,
  Card,
  Row,
  Col,
  Chip,
  Icon,
  Modal,
  Input
} from "react-materialize";
import user from "../Img/download.png";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  upVotePostAPI,
  downVotePostAPI,
  deletePostAPI,
  editPostAPI
} from "../Actions/actions";

class Post extends Component {
  state = {
    modal: false
  };

  submit = e => {
    const id = window.location.pathname.split("/")[2];
    e.preventDefault();
    const body = e.target[1].value;
    const title = e.target[0].value;
    if (body === "" || title === "") {
      return;
    }
    this.props.editPost({ id, body, title });
    e.target[0].value = "";
    e.target[1].value = "";
    this.setState({ modal: false });
  };

  render() {
    const { post, upVote, downVote, deletePost } = this.props;
    const margin = {
      marginLeft: "10px",
      marginRight: "10px"
    };
    return (
      <div>
        {post && (
          <Row>
            <Col m={2} s={0} />
            <Col m={8} s={12}>
              <Card
                title={post.title}
                actions={[
                  <Button
                    style={margin}
                    key="upvo"
                    onClick={() => upVote(post.id)}
                    icon="thumb_up"
                  />,
                  <Button
                    style={margin}
                    key="downvo1"
                    onClick={() => downVote(post.id)}
                    icon="thumb_down"
                  />,
                  <a
                    className="curs"
                    key="del"
                    style={{
                      ...margin,
                      marginTop: "5px",
                      float: "right",
                      color: "#727272"
                    }}
                    onClick={() => deletePost(post.id)}
                  >
                    <Icon>delete</Icon>
                  </a>,
                  <a
                    className="curs"
                    key="edit"
                    style={{
                      ...margin,
                      marginTop: "5px",
                      float: "right"
                    }}
                    onClick={() =>
                      this.setState(prev => {
                        return { modal: !prev.modal };
                      })
                    }
                  >
                    <Icon>edit</Icon>
                  </a>
                ].splice(0, this.props.btns)}
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
                  <Badge>{(new Date(post.timestamp)).toString().slice(0,24)}</Badge>
                </Row>
              </Card>
            </Col>
            <Col m={2} s={0} />
          </Row>
        )}
        <Modal header="Edit Post" bottomSheet open={this.state.modal}>
          <form onSubmit={this.submit}>
            <Row>
              <Input s={12} m={4} label="Title" defaultValue={post.title} />
              <Input s={12} m={8} label="Body" defaultValue={post.body} />
            </Row>
            <Row>
              <Col m={9} s={6} />
              <Button m={3} s={6}>
                Change
              </Button>
            </Row>
          </form>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  upVote: id => dispatch(upVotePostAPI(id)),
  downVote: id => dispatch(downVotePostAPI(id)),
  deletePost: id => dispatch(deletePostAPI(id)),
  editPost: data => dispatch(editPostAPI(data))
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Post)
);
