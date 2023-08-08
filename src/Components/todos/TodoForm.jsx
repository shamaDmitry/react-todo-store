import { toast } from 'react-toastify';
import useAuthStore from '../../store/authStore';
import useTodosStore from '../../store/todoStore';

const TodoForm = () => {
  const [user] = useAuthStore(state => [
    state.user,
  ]);

  const [
    todo,
    setTodo,
    createTodo,
  ] = useTodosStore(state => [
    state.todo,
    state.setTodo,
    state.createTodo,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault()
    setTodo("");

    toast.promise(
      createTodo(todo, user.$id),
      {
        pending: "Creating...",
        success: "Created",
        error: {
          render({ data }) {
            return <div>{data.message}</div>
          }
        }
      }
    );
  }

  return (
    <form
      className="mb-4"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="px-4 py-2 border placeholder:capitalize"
        placeholder="add todo"
      />
    </form>
  );
}

export default TodoForm;
