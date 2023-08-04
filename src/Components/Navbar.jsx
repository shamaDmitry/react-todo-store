import { Link, NavLink, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import useAuthStore from '../store/authStore';
import UserNavMenu from './user/UserNavMenu';

const menuItems = [
  {
    id: uuidv4(),
    to: 'todos',
    text: 'todos',
  },
  {
    id: uuidv4(),
    to: 'orders',
    text: 'orders',
  },
  {
    id: uuidv4(),
    to: 'about',
    text: 'about',
  },
]

const Navbar = () => {
  const [user, logIn, logOut] = useAuthStore(state => [
    state.user,
    state.logIn,
    state.logOut,
  ]);

  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut().then(() => {
      navigate('/login', {
        replace: true
      })
    })
  }

  return (
    <header className="py-2 border-b shadow-lg">
      <div className="container">
        <nav className="flex items-center justify-center">
          <Link
            to="/"
            className="px-3 py-1 border"
          >
            logo
          </Link>

          <div className="flex mx-auto gap-x-3">
            {
              menuItems.map(item => {
                return (
                  <NavLink
                    key={item.id}
                    to={item.to}
                    className={({ isActive }) => isActive ? "text-red-500 capitalize underline" : "capitalize"
                    }
                  >
                    {item.text}
                  </NavLink>
                )
              })
            }
          </div>

          <div className="flex items-center gap-x-4">
            {!user && <button
              className="px-3 py-1 border"
              onClick={logIn}
            >
              login
            </button>}

            <UserNavMenu
              user={user}
              handleLogOut={handleLogOut}
            />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
