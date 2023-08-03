import { create } from 'zustand'
import { account } from '../../appwrite';

const useAuthStore = create((set, get) => ({
  user: null,
  logIn: async ({ email, password }) => {
    try {
      return await account.createEmailSession(email, password);
    } catch (error) {
      console.log('error', error);
      throw new Error(error.message)
    }

    // promise.then(function (response) {
    //   console.log(response); // Success
    //   set({ user: response });
    // }, function (error) {
    //   return error
    // });
  },

  getCurrentUser: async () => {
    return await account.get();
    // set({ user });
  },

  logOut: async () => {
    return await account.deleteSession('current');
  },

  createJWT: async () => {
    const jwt = account.createJWT();
  },
  listSessions: async () => {
    const sessions = await account.listSessions();
  },
  listLogs: async () => {
    const logs = await account.listLogs();
  },
}));

export default useAuthStore;