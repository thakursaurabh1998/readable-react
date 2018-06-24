import React, { Component } from "react";
import { SideNav, SideNavItem, Button } from "react-materialize";
import mypic from "../Img/me.jpg";
import timeline from "../Img/timeline.jpg";
import { connect } from "react-redux";
import { getCategories } from "../Actions/actions";
import { Link } from "react-router-dom";

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
          <Button
            style={{
              position: "fixed",
              top: "20px",
              left: "20px",
              zIndex: "5"
            }}
            icon="menu"
          />
        }
        options={{ closeOnClick: true }}
      >
        <SideNavItem userView user={me} />
        <SideNavItem subheader>Categories</SideNavItem>
          <Link to='/'>All</Link>
        {this.props.categories &&
          this.props.categories.map((category, index) => (
              <Link key={index} to={category.path}>{category.name}</Link>
          ))}
        <SideNavItem divider />
      </SideNav>
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  categories: categories.categories
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(getCategories())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNavbar);
