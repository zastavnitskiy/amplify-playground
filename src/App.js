import React, { useState, useEffect } from "react";
import "./App.css";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react"; // or 'aws-amplify-react-native';
import * as mutations from "./graphql/mutations";
import { listOrders } from "./graphql/queries";
Amplify.configure(awsconfig);

// next:

// create order mutation
// update order mutation
// delete order mutation
// view all orders
function App() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [lastModifiedOrderId, setLastModifiedOrderId] = useState(null);

  const handleSubmit = event => {
    event.preventDefault();
    API.graphql(
      graphqlOperation(mutations.createOrder, {
        input: {
          name,
          url
        }
      })
    ).then(result => {
      setLastModifiedOrderId(result.data.createOrder.id);
    });
  };

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let isActive = true;
    API.graphql(
      graphqlOperation(listOrders, {
        limit: 20
      })
    ).then(result => {
      console.log("got orders", result.data.listOrders.items);
      if (isActive) {
        setOrders(result.data.listOrders.items);
      }
    });

    return () => (isActive = false);
  }, [lastModifiedOrderId]);

  const handleDelete = event => {
    event.preventDefault();
    API.graphql(
      graphqlOperation(mutations.deleteOrder, {
        input: {
          id: event.target.dataset.id
        }
      })
    ).then(result => {
      console.log("order created", result.data.deleteOrder.id);
      setLastModifiedOrderId(result.data.deleteOrder.id);
    });
  };

  return (
    <div className="App">
      <ul>
        {orders.map(order => {
          return (
            <li key={order.id}>
              <span>{order.name}</span>
              <span>{order.url}</span>
              <span>{order.id}</span>
              <button onClick={handleDelete} data-id={order.id}>
                ×
              </button>
            </li>
          );
        })}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input name="url" value={url} onChange={e => setUrl(e.target.value)} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default withAuthenticator(App, true);
