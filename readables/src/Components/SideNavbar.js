import React, { Component } from "react";
import { SideNav, SideNavItem, Button } from "react-materialize";
import mypic from "../Img/me.jpg";
import timeline from "../Img/timeline.jpg";
import { connect } from "react-redux";
import { getCategories } from '../Actions/actions'

const me = {
  background: timeline,
  image: mypic,
  name: "Saurabh Thakur",
  email: "thakursaurabh1998@gmail.com"
};

class SideNavbar extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }
  render() {
    return (
      <SideNav
        trigger={
          <Button icon="menu">
          </Button>
        }
        options={{ closeOnClick: true }}
      >
        <SideNavItem userView user={me} />
        <SideNavItem subheader>Categories</SideNavItem>
        <SideNavItem waves href="#">
          All
        </SideNavItem>
        {this.props.categories && this.props.categories.map((category, index) => (
          <SideNavItem key={index} waves href={"#" + category.path}>
          {category.name}
        </SideNavItem>
        ))}
        <SideNavItem divider />
      </SideNav>
    );
  }
}

const mapStateToProps = ({ post }) => ({ categories: post.categories });

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(getCategories())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNavbar);
