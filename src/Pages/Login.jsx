import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import useAuthStore from '../store/authStore';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [logIn, user] = useAuthStore(state => [
    state.logIn,
    state.user,
  ]);

  const handleCurrentUser = async () => {

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    logIn({
      email,
      password,
    }).then(res => {
      console.log('res', res);
    })

    // await toast.promise(
    //   logIn({
    //     email,
    //     password,
    //   }),
    //   {
    //     pending: {
    //       render() {
    //         return "I'm loading"
    //       },
    //       icon: true,
    //     },
    //     success: {
    //       render({ data }) {
    //         return `Hello ${data}`
    //       },
    //       // other options
    //       icon: "🟢",
    //     },
    //     error: {
    //       render({ data }) {
    //         return (
    //           <p>
    //             {data.response.message}
    //           </p>
    //         )
    //       }
    //     }
    //   }
    // )
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <ToastContainer />

      <h1 className="mb-4">LOGIN</h1>

      <pre>
        {JSON.stringify(user)}
      </pre>

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

      <button
        onClick={handleCurrentUser}
        className="p-2 border border-cyan-500"
      >
        handleCurrentUser
      </button>

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
