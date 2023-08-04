import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
      <div
        className="mb-4 text-2xl"
      >
        404
      </div>

      <Link
        to="/"
        className="px-4 py-2 text-black border"
      >
        go home
      </Link>
    </div>
  );
}

export default Page404;
