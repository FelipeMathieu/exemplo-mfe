declare module "shared/Example" {
  export const Example: React.FC;
}

declare module "shared/SharedStore" {
  const useSharedStore: () => {
    todos: number;
    increaseTodos: () => void;
    removeAllTodos: () => void;
  };

  export default useSharedStore;
}

declare module "shared/LoadRemoteModule" {
  function loadRemoteModule<T>(
    remote: string | undefined,
    component: string
  ): () => Promise<{
    default: React.ComponentType<T>;
  }>;

  export default loadRemoteModule;
}
