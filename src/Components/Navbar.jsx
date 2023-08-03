import React from 'react';
import useAuthStore from '../store/authStore';

const Navbar = () => {
  const [logIn, user, getCurrentUser, createJWT, logOut, listSessions, listLogs] = useAuthStore(state => [
    state.logIn,
    state.user,
    state.getCurrentUser,
    state.createJWT,
    state.logOut,
    state.listSessions,
    state.listLogs,
  ]);

  return (
    <div className="py-4 border-b">
      <div className="container">
        <nav className="flex justify-between">
          <p>logo</p>

          <div>
            {
              <pre>
                {JSON.stringify(user, null, 2)}
              </pre>
            }
          </div>

          <div>
            <button
              className="px-3 py-1 border"
              onClick={logIn}
            >
              login
            </button>

            <button
              className="px-3 py-1 border"
              onClick={getCurrentUser}
            >
              getCurrentUser
            </button>

            <button
              className="px-3 py-1 border"
              onClick={createJWT}
            >
              createJWT
            </button>

            <button
              className="px-3 py-1 border"
              onClick={logOut}
            >
              logOut
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
