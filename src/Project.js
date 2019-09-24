import React from "react";

export const Project = ({ match }) => {
  return (
    <>
      <h1>Project {match.params.id}</h1>
    </>
  );
};
