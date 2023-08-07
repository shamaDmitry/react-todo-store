import { create } from 'zustand'
import { account, ID } from '../../appwrite';

const useAuthStore = create((set, get) => ({
  signUp: async ({ name, email, password }) => {
    try {
      const user = await account.create(
        ID.unique(),
        email,
        password,
        name,
      );

      await get().logIn({ email: user.email, password });
    } catch (error) {
      console.log('error', error);
      return new Promise((resolve, reject) => reject(new Error(error)))
    }
  },

  logIn: async ({ email, password }) => {
    try {
      await account.createEmailSession(email, password);
      const user = await get().getCurrentUser();

      set({ user });
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.log('error', error);
      return new Promise((resolve, reject) => reject(new Error(error)))
    }
  },

  getCurrentUser: async () => {
    try {
      const user = await account.get();
      set({ user });

      return user;
    } catch (error) {
      console.log('error', error);
      return new Promise((resolve, reject) => reject(new Error(error)))
    }
  },

  logOut: async () => {
    try {
      await account.deleteSession('current');
      localStorage.clear();
    } catch (error) {
      console.log('error', error);
      return new Promise((resolve, reject) => reject(new Error(error)))
    }
  },

  listSessions: async () => {
    try {
      return await account.listSessions();
    } catch (error) {
      console.log('error', error);
      return new Promise((resolve, reject) => reject(new Error(error)))
    }
  },
  
  getSession: async () => {
    try {
      return await account.getSession('current');
    } catch (error) {
      console.log('error', error);
      return new Promise((resolve, reject) => reject(new Error(error)))
    }
  },

  listLogs: async () => {
    try {
      return await account.listLogs();
    } catch (error) {
      console.log('error', error);
      return new Promise((resolve, reject) => reject(new Error(error)))
    }
  },

  user: JSON.parse(localStorage.getItem('user')) || null,
}));

export default useAuthStore;