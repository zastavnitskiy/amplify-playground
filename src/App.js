import React from "react";
import "./App.css";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react"; // or 'aws-amplify-react-native';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Project } from "./components/Project";
import { Index } from "./components/Index";

Amplify.configure(awsconfig);

const App = () => {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={Index} />
        <Route path="/dashboard" component={Dashboard}></Route>
        <Route path="/project/:id" component={Project}></Route>
      </Router>
    </div>
  );
};

export default withAuthenticator(App, true);
