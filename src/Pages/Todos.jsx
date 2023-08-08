import classNames from 'classnames';
import { CheckIcon, XMarkIcon, TrashIcon, ArchiveBoxXMarkIcon } from '@heroicons/react/24/solid'
import useTodosStore from '../store/todoStore';
import { useEffect, useState } from 'react';
import Title from '../Components/atoms/Title';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../Components/atoms/Spinner';
import InlineEditor from '../Components/atoms/InlineEditor';
import TodoForm from '../Components/todos/TodoForm';

function Todos() {
  const [
    todos,
    getAllTodos,
    setTodoChecked,
    getAllCompletedTodos,
    deleteTodo,
    updateTodo,
  ] = useTodosStore(state => [
    state.todos,
    state.getAllTodos,
    state.setTodoChecked,
    state.getAllCompletedTodos,
    state.deleteTodo,
    state.updateTodo,
  ]);

  const [loading, setLoading] = useState(false);

  const handleUpdate = (updated) => {
    toast.promise(
      updateTodo(updated),
      {
        pending: "Updating...",
        success: "Updated",
        error: {
          render({ data }) {
            return <div>{data.message}</div>
          }
        }
      }
    );
  }

  useEffect(() => {
    setLoading(true);
    getAllTodos().then(() => setLoading(false))
    return () => { };
  }, [getAllTodos]);

  const handleChecked = (todo) => {
    toast.promise(
      setTodoChecked(todo),
      {
        pending: "Updating...",
        success: "Updated",
        error: {
          render({ data }) {
            return <div>{data.message}</div>
          }
        }
      }
    );
  }

  const handleDelete = (todoId) => {
    toast.promise(
      deleteTodo(todoId),
      {
        pending: "Deleting...",
        success: {
          render: () => "Deleted",
          icon: <ArchiveBoxXMarkIcon className="text-red-500" />,
        },
        error: {
          render({ data }) {
            const message = data.message;

            return <div>{message}</div>
          }
        }
      }
    );
  }

  if (loading) {
    return <Spinner className="w-5 mb-4 text-cyan-500" />
  } else {
    return (
      <section className="">
        <ToastContainer />

        <Title
          text="Todos"
        />

        <div className="flex flex-col items-center justify-center">
          <h2 className="mb-4 text-lg">
            Todos: {getAllCompletedTodos()} / {todos.length}
          </h2>

          <TodoForm />

          <div className="flex flex-col w-full max-w-md">
            {todos.length ? todos.map(todo => {
              return (
                <div
                  key={todo.$id}
                  className={classNames("flex items-start p-2 mb-4 border gap-x-2 w-full", {
                    "border-red-500": !todo.isDone,
                    "border-green-500": todo.isDone,
                  })}
                >
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

                  <InlineEditor
                    value={todo.title}
                    todo={todo}
                    handleUpdate={handleUpdate}
                  />

                  <button
                    onClick={() => handleDelete(todo.$id)}
                    className="px-2 py-1 text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="w-4"></TrashIcon>
                  </button>
                </div>
              )
            }) : <p className="text-center">nothing is here</p>}
          </div>
        </div>
      </section>
    )
  }
}

export default Todos
