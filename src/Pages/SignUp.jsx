import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="mb-4">SignUp</h1>

      <form className="flex flex-col gap-4 mb-4">
        <input type="text" placeholder="name" className="p-2 border" />
        <input type="text" placeholder="email" className="p-2 border" />
        <input type="text" placeholder="password" className="p-2 border" />

        <button className="p-2 border border-cyan-500">
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
