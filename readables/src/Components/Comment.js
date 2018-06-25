import React, { Component } from "react";
import {
  Icon,
  Card,
  Row,
  Col,
  Chip,
  Badge,
  Modal,
  Input,
  Button
} from "react-materialize";
import user from "../Img/download.png";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  upVoteCommentAPI,
  downVoteCommentAPI,
  deleteCommentAPI,
  editCommentAPI
} from "../Actions/actions";

class Comment extends Component {
  state = {
    modal: false
  };

  submit = (e,id) => {
    e.preventDefault();
    const body = e.target[0].value;
    if (body === "") {
      return;
    }
    this.props.editComment({ id, body })
    e.target[0].value = "";
    this.setState({ modal: false });
  }

  render() {
    const { comment, upVote, downVote, deleteComment } = this.props;
    return (
      <div>
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
                  onClick={() =>
                    this.setState(prev => {
                      return { modal: !prev.modal };
                    })
                  }
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
        <Modal header="Edit Comment" bottomSheet open={this.state.modal}>
          <form onSubmit={(e)=>this.submit(e,comment.id)}>
            <Row>
              <Input
                s={12}
                m={9}
                label="Comment Body"
                defaultValue={comment.body}
              />
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
  upVote: id => dispatch(upVoteCommentAPI(id)),
  downVote: id => dispatch(downVoteCommentAPI(id)),
  deleteComment: id => dispatch(deleteCommentAPI(id)),
  editComment: data => dispatch(editCommentAPI(data))
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Comment)
);

// export default Comment
