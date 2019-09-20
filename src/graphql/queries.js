/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOrder = `query GetOrder($id: ID!) {
  getOrder(id: $id) {
    id
    name
    url
    owner
  }
}
`;
export const listOrders = `query ListOrders(
  $filter: ModelOrderFilterInput
  $limit: Int
  $nextToken: String
) {
  listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      url
      owner
    }
    nextToken
  }
}
`;
