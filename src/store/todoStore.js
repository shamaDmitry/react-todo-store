import { Permission, Query, Role } from 'appwrite';
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
        Permission.write(Role.user(userId)),
        Permission.read(Role.user(userId)),
        Permission.update(Role.user(userId)),
        Permission.delete(Role.user(userId)),
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
  deleteTodo: async (todoId) => {
    await databases.deleteDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_ID,
      todoId,
    );

    get().getAllTodos();
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
  },
  updateTodo: async (todo) => {
    const { $databaseId, $collectionId, $id, title } = todo;

    await databases.updateDocument(
      $databaseId,
      $collectionId,
      $id,
      {
        title
      }
    );

    get().getAllTodos();
  }
}));

export default useTodosStore;