import { useQuery } from "@tanstack/react-query";
import React from "react";

function Example() {
  const [show, setShow] = React.useState(false);

  return (
    <div>
      <div>
        <button onClick={() => setShow(!show)}>Show/Hide</button>
      </div>
      {show ? <RepoData /> : null}
    </div>
  );
}

function RepoData() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      fetch("https://api.github.com/repos/tannerlinsley/react-query").then(
        (res) => res.json()
      ),
    staleTime: Infinity,
  });

  if (isLoading) {
    return "Loading...";
  }

  if (error) {
    return "An error has occurred: " + error.message;
  }

  return (
    <>
      <h3>{data.name}</h3>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
      <div>{isFetching ? "Updating..." : ""}</div>
    </>
  );
}

export default Example;
