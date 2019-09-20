import React from 'react';
import './App.css';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';

Amplify.configure(awsconfig);

const listTodos = `query listTodos {
  listTodos{
    items{
      id
      name
      description
    }
  }
}`

const addTodo = `mutation createTodo($name:String! $description: String!) {
  createTodo(input:{
    name:$name
    description:$description
  }){
    id
    name
    description
  }
}`

const createOrder = `mutation createOrder($name:String! $description: String!) {
  createOrder(input:{
    name:$name
    description:$description
  }){
    id
    name
    description
  }
}`



// next:

// create order mutation
// update order mutation
// delete order mutation
// view all orders
function App() {

  const todoMutation = async () => {
    const todoDetails = {
      name: 'Party tonight!',
      description: 'Amplify CLI rocks!'
    };
    
    const newTodo = await API.graphql(graphqlOperation(addTodo, todoDetails));
    alert(JSON.stringify(newTodo));
  }

  const listQuery = async () => {
    console.log('listing todos');
    const allTodos = await API.graphql(graphqlOperation(listTodos));
    alert(JSON.stringify(allTodos));
  }

  return (
    <div className="App">
        <p> Pick a file</p>
        <button onClick={listQuery}>GraphQL Query</button>
        <button onClick={todoMutation}>GraphQL Mutation</button>
      </div>
  );
}

export default withAuthenticator(App, true);
