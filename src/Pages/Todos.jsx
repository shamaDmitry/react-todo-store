import classNames from 'classnames';
import { CheckIcon, XMarkIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/solid'
import useTodosStore from '../store/todoStore';
import useAuthStore from '../store/authStore';
import { useEffect, useState } from 'react';
import Title from '../Components/atoms/Title';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../Components/atoms/Spinner';

function Todos() {
  const [user] = useAuthStore(state => [
    state.user,
  ]);

  const [
    todos,
    getAllTodos,
    setTodoChecked,
    getAllCompletedTodos,
    todo,
    setTodo,
    createTodo,
    deleteTodo,
    updateTodo,
  ] = useTodosStore(state => [
    state.todos,
    state.getAllTodos,
    state.setTodoChecked,
    state.getAllCompletedTodos,
    state.todo,
    state.setTodo,
    state.createTodo,
    state.deleteTodo,
    state.updateTodo,
  ]);

  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState("");

  const handleUpdate = (todo) => {
    setIsEdit(false);
    console.log('updatedTodo', updatedTodo);

    // updateTodo(todo)
  }

  useEffect(() => {
    setLoading(true);
    getAllTodos(user.$id).then(() => setLoading(false))
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
        success: "Deleted",
        error: {
          render({ data }) {
            const message = data.message;

            return <div>{message}</div>
          }
        }
      }
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTodo("");
    createTodo(todo, user.$id);
  }

  return (
    <section className="">
      <ToastContainer />

      {/* <Spinner className="w-5 text-cyan-500" /> */}

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
          {!todos.length && <p>nothing is here</p>}

          {loading && <Spinner className="w-5 text-cyan-500" />}

          {todos.map(todo => {
            return (
              <div
                key={todo.$id}
                className={classNames("inline-flex items-center justify-between p-2 mb-4 border gap-x-4 min-w-full", {
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

                <p className='text-red-600'>
                  {updatedTodo}
                </p>

                {isEdit ?
                  <input
                    type="text"
                    className="border"
                    defaultValue={updatedTodo}
                    onChange={(event) => {
                      setUpdatedTodo(event.target.name)
                    }}
                  /> :
                  <span className={classNames({
                    "line-through": todo.isDone
                  })}>
                    {todo.title}
                  </span>}

                <div>
                  {!isEdit &&
                    <button
                      onClick={() => handleDelete(todo.$id)}
                      className="px-2 py-1 text-red-500"
                    >
                      <TrashIcon className="w-4"></TrashIcon>
                    </button>}


                  {/* {isEdit ?
                    <button
                      className="px-2 py-1 text-slate-500"
                      onClick={() => handleUpdate(todo)}
                    >
                      ok
                    </button> :

                    <button
                      className="px-2 py-1 text-slate-500"
                      onClick={() => setIsEdit(prevState => !prevState)}
                    >
                      <PencilIcon className="w-4" />
                    </button>} */}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Todos
