import React, { lazy, Suspense } from "react";
import useSharedStore from "shared/SharedStore";
import loadRemoteModule from "shared/LoadRemoteModule";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Example = lazy(
  loadRemoteModule("shared@http://localhost:3003/remoteEntry.js", "Example")
);

interface IApp {
  title: string;
  queryClient: QueryClient;
}

const App: React.FC<IApp> = ({ title = "", queryClient }) => {
  const { todos, increaseTodos } = useSharedStore();

  return (
    <QueryClientProvider client={queryClient}>
      <h2>{title}</h2>
      <Suspense fallback={<span>Loading Example</span>}>
        <Example />
      </Suspense>
      <button onClick={increaseTodos}>aumentar todos</button>
      <span>todos: {todos}</span>
    </QueryClientProvider>
  );
};

export default App;
