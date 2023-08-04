import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { ToastContainer, toast } from 'react-toastify';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const [signUp] = useAuthStore(store => [
    store.signUp,
  ])

  const handleSubmit = (e) => {
    e.preventDefault();

    const response = toast.promise(
      signUp({
        name,
        email,
        password
      }),
      {
        pending: {
          render() {
            return "I'm loading"
          },
        },
        success: {
          render({ data }) {
            return `Hello ${data.name}`
          },
        },
        error: {
          render({ data }) {
            const message = data.message;

            return <div>{message}</div>
          }
        }
      }
    );

    response.then(() => {
      navigate(location.state?.from || '/todos', {
        replace: true
      })
    })
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <ToastContainer />

      <h1 className="mb-4">SignUp</h1>

      <form
        className="flex flex-col gap-4 mb-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="name"
          className="p-2 border"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="email"
          className="p-2 border"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="password"
          className="p-2 border"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="p-2 border border-cyan-500"
        >
          SignUp
        </button>
      </form>

      <Link
        to="/login"
        className="underline capitalize text-cyan-500 hover:no-underline"
      >
        login
      </Link>
    </div>
  );
}

export default SignUp;
