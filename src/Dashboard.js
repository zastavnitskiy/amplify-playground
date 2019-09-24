import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listOrders } from "./graphql/queries";
import * as mutations from "./graphql/mutations";
import { Link } from "react-router-dom";
// next:
// create order mutation
// update order mutation
// delete order mutation
// view all orders
export function Dashboard() {
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
    <>
      <h3>Dashboard</h3>
      <ul>
        {orders.map(order => {
          return (
            <li key={order.id}>
              <span>
                <Link to={`/project/${order.id}`}>{order.name}</Link>
              </span>
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
    </>
  );
}
