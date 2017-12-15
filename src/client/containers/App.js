import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import Home from "../containers/views/Home";
import Navbar from "../containers/layout/Navbar";
import Body from "../containers/layout/Body";
import Footer from "../containers/layout/Footer";
import Ranking from "../containers/views/Ranking";

const App = ({ alert, props }) => {
  return (
    <div>
      <Navbar />
      <Body>{props.children}</Body>
      <Footer />
    </div>
  );
};

const mapStateToAppProps = (state, props) => {
  return {
    alert: state.alert,
    props
  };
};

// Testing purposes exports
export { App, mapStateToAppProps };

export default withRouter(connect(mapStateToAppProps)(App));