import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import Header from "../components/Header";

function ProfilePage(props) {
  return (<AppBar><Toolbar>
    <div>
      <Hidden><Header /> </Hidden>
    </div></Toolbar></AppBar>)
}

export default ProfilePage;
