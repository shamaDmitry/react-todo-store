import { Menu, Transition } from '@headlessui/react'
import { UserIcon, ArrowRightOnRectangleIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

const UserNavMenu = ({ user, handleLogOut }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center w-full px-4 py-2 text-sm font-medium text-black border">
          <div className="flex flex-col items-start">
            <span className="text-xs text-gray-500">id: {user.$id}</span>
            <span className="font-medium">name: {user.name}</span>
            <span className="text-sm text-gray-500">email: {user.email}</span>
          </div>

          <ChevronDownIcon
            className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-50 w-56 mt-2 origin-top-right bg-white border shadow-lg">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="profile"
                  className={classNames("text-gray-700 flex w-full items-center px-2 py-2 gap-x-2", {
                    "bg-gray-300": active
                  })}
                >
                  <UserIcon className="w-5" />
                  My Profile
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames("mt-1 flex items-center gap-x-2 justify-center px-3 py-1 border bg-red-500 text-white border-red-500 w-full", {
                    "bg-red-700 border-red-700": active
                  })}
                  onClick={handleLogOut}
                >
                  <ArrowRightOnRectangleIcon
                    className="w-5"
                  />
                  Log out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

UserNavMenu.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogOut: PropTypes.func.isRequired,
}

export default UserNavMenu;
