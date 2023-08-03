import { create } from 'zustand'
import { account } from '../../appwrite';

const useAuthStore = create((set, get) => ({
  user: null,
  logIn: async () => {
    const user = await account.createEmailSession('admin@admin.com', 'test1234');
    set({ user });
  },
  logOut: async () => {
    await account.deleteSessions();
  },
  getCurrentUser: async () => {
    const user = await account.get();

    set({ user });
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