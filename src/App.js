import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "./components/page/loginpage/LoginPage";
import SearchPage from "./components/page/searchpage/SearchPage";
import "./App.css";
import 'antd/dist/antd.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/login" component={LoginPage} />
          <Route path="/search" component={SearchPage} />
        </div>
      </Router>
    );
  }
}

export default App;
