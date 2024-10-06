import { importShared } from './__federation_fn_import-C3Bvay6V.js';

const {create} = await importShared('zustand');

const useSharedStore = create((set) => ({
  todos: 0,
  increaseTodos: () => set((state) => ({ todos: state.todos + 1 })),
  removeAllTodos: () => set(() => ({ todos: 0 }))
}));

export { useSharedStore as default };
