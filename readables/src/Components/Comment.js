import React, { Component } from "react";
import { Icon, Card, Row, Col, Chip, Badge } from "react-materialize";
import user from "../Img/download.png";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { upVoteCommentAPI, downVoteCommentAPI, deleteCommentAPI } from "../Actions/actions";

class Comment extends Component {
  // upVoteComment = () => {
  //   console.log("hello");
  //   this.props.upVote()
  // };

  render() {
    const { comment, upVote, downVote, deleteComment } = this.props;
    return (
      <Row>
        <Col m={2} s={0} />
        <Col m={8} s={12}>
          <Card
            className="blue-grey darken-1"
            textClassName="white-text"
            actions={[
              <a className="curs" key="up" onClick={() => upVote(comment.id)}>
                <Icon>thumb_up</Icon>
              </a>,
              <a
                className="curs"
                key="down"
                onClick={() => downVote(comment.id)}
              >
                <Icon>thumb_down</Icon>
              </a>,
              <a
                className="curs"
                key="edit"
                // onClick={() => edit(comment.id)}
              >
                <Icon>edit</Icon>
              </a>,
              <a
                className="curs"
                key="delete"
                onClick={() => deleteComment(comment.id)}
              >
                <Icon>delete</Icon>
              </a>
            ]}
          >
            {comment.body}
            <br />
            <Chip>
              <img src={user} alt="Contact Person" />
              {comment.author}
            </Chip>
            <Badge newIcon>Comment votes: {comment.voteScore}</Badge>
          </Card>
        </Col>
        <Col m={2} s={0} />
      </Row>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  upVote: id => dispatch(upVoteCommentAPI(id)),
  downVote: id => dispatch(downVoteCommentAPI(id)),
  deleteComment: id => dispatch(deleteCommentAPI(id))
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Comment)
);

// export default Comment
