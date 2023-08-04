import classNames from 'classnames';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'
import useTodosStore from '../store/todoStore';
import useAuthStore from '../store/authStore';
import { useEffect } from 'react';
import Title from '../Components/atoms/Title';

function Todos() {
  const [user] = useAuthStore(state => [
    state.user,
  ]);

  const [todos, getAllTodos, setTodoChecked, getAllCompletedTodos, todo, setTodo, createTodo] = useTodosStore(state => [
    state.todos,
    state.getAllTodos,
    state.setTodoChecked,
    state.getAllCompletedTodos,
    state.todo,
    state.setTodo,
    state.createTodo,
  ]);

  useEffect(() => {
    getAllTodos()
    return () => { };
  }, [getAllTodos]);

  const handleChecked = (todo) => {
    setTodoChecked(todo)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTodo("");
    createTodo(todo, user.$id);
  }

  return (
    <section className="">
      <Title
        text="Todos"
      />

      <div className="flex flex-col items-center justify-center">

        <h2 className="mb-4 text-lg">
          Todos: {getAllCompletedTodos()} / {todos.length}
        </h2>

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

        <div className="flex flex-col items-start justify-center max-w-md">
          {todos.map(todo => {
            return (
              <div
                key={todo.$id}
                className={classNames("inline-flex items-center justify-between p-2 mb-4 border gap-x-4 min-w-full", {
                  "border-red-500": !todo.isDone,
                  "border-green-500": todo.isDone,
                })}
              >
                <span className={classNames({
                  "line-through": todo.isDone
                })}>
                  {todo.title}
                </span>

                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    onChange={() => handleChecked(todo)}
                    checked={todo.isDone}
                    className="sr-only peer"
                  />

                  <span
                    className={classNames("w-8 h-8 border rounded-none text-white", {
                      "bg-red-500 border-red-500 hover:bg-red-700": !todo.isDone,
                      "bg-green-500 border-green-500 hover:bg-green-700": todo.isDone
                    })}
                  >
                    {todo.isDone ? <CheckIcon /> : <XMarkIcon />}
                  </span>
                </label>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Todos
