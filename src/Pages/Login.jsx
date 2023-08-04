import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import useAuthStore from '../store/authStore';

const Login = () => {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("test1234");

  const navigate = useNavigate();
  const location = useLocation();

  const [logIn] = useAuthStore(state => [
    state.logIn,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const response = toast.promise(
      logIn({
        email,
        password,
      }),
      {
        pending: {
          render() {
            return "I'm loading"
          },
        },
        success: {
          render({ data }) {
            return `Hello ${data.providerUid}`
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

      {
        location.state && <div className="mb-3 text-red-500">
          {location.state.message}
        </div>
      }

      <h1 className="mb-4">LOGIN</h1>

      <form
        className="flex flex-col gap-4 mb-4"
        onSubmit={handleSubmit}
      >
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
          login
        </button>
      </form>

      <Link
        to="/register"
        className="underline capitalize text-cyan-500 hover:no-underline"
      >
        register
      </Link>
    </div>
  );
}

export default Login;
