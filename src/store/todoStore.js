import { Permission, Role } from 'appwrite';
import { create } from 'zustand'
import { databases, ID } from '../../appwrite';

const useTodosStore = create((set, get) => ({
  todos: [],
  todo: "",
  setTodo: (todo) => {
    set({ todo })
  },
  createTodo: async (title, userId) => {
    await databases.createDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_ID,
      ID.unique(),
      {
        title,
        isDone: false
      },
      [
        Permission.read(Role.user(userId)),
      ]
    );

    get().getAllTodos();
  },
  getAllCompletedTodos: () => {
    return get().todos.filter(todo => todo.isDone === true).length
  },
  getAllTodos: async () => {
    const data = await databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_ID,
    )
    set({ todos: data.documents })
  },
  setTodoChecked: async (todo) => {
    const { $databaseId, $collectionId, $id, isDone } = todo;

    await databases.updateDocument(
      $databaseId,
      $collectionId,
      $id,
      {
        isDone: !isDone
      }
    );

    get().getAllTodos();
  }
}));

export default useTodosStore;