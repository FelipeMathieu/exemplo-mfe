import { create } from "zustand";

const useSharedStore = create((set) => ({
  todos: 0,
  increaseTodos: () =>
    set((state: { todos: number }) => ({ todos: state.todos + 1 })),
  removeAllTodos: () => set(() => ({ todos: 0 })),
}));

export default useSharedStore;
