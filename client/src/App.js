import React, { Component } from "react";
import { Route } from "react-router-dom";
import NavBar from "./Navbar";
import "./App.css";
import Home from "./Home";
import EpisodeList from "./EpisodeList";
import Podcast from "./Podcast";
class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Home />
        <div className="container">
          <div className="col-md-8 col-md-offset-2">
            <Route exact path="/" component={EpisodeList} />
            <Route path="/podcast/:id" component={Podcast} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
