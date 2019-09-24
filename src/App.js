import React from "react";
import "./App.css";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react"; // or 'aws-amplify-react-native';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { Project } from "./Project";
Amplify.configure(awsconfig);

const Index = () => {
  return <Redirect to="/dashboard" />;
};

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
