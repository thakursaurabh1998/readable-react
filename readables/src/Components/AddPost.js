import React, { Component } from "react";
import { Modal, Button, Row, Col, Input } from "react-materialize";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { postPost } from "../Actions/actions";

class AddPost extends Component {
  state = {
    modal: false
  };

  submit = e => {
    e.preventDefault();
    const name = e.target[0].value;
    const title = e.target[1].value;
    const body = e.target[2].value;
    const category = e.target[3].value;
    if (name === "" || title === "" || body === "" || category === "") {
      // console.log(`title:${title}\nname:${name}\ncategory:${category}\nbody:${body}`)
      return;
    }
    this.props.post({ body, name, title, category });
    e.target[0].value = "";
    e.target[1].value = "";
    e.target[2].value = "";
    this.setState({ modal: false });
  };
  render() {
    const { categories } = this.props;
    return (
      <div>
        <Modal
          bottomSheet
          header="New Post"
          style={{
            maxHeight: "80%"
          }}
          open={this.state.modal}
          trigger={
            <Button
              floating
              large
              style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                zIndex: "5"
              }}
              waves="light"
              icon="add"
            />
          }
        >
          <form onSubmit={this.submit}>
            <Row>
              <Input s={12} m={4} label="Name" />
              <Input s={12} m={8} label="Post Title" />
            </Row>
            <Row>
              <Input s={12} m={8} type="textarea" label="Post Body" />
              <Input s={12} m={4} type="select" label="Category">
                {categories &&
                  categories.map(category => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
              </Input>
            </Row>
            <Row>
              <Col m={9} s={6} />
              <Button m={3} s={6}>
                Post
              </Button>
            </Row>
          </form>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  post: data => dispatch(postPost(data)),
  // fetchCategories: () => dispatch(getCategories())
});

const mapStateToProps = ({ categories }) => ({
  categories: categories.categories
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddPost)
);
