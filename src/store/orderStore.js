import { create } from 'zustand'
import { Permission, Role } from 'appwrite';
import { databases, ID } from '../../appwrite';

const useOrderStore = create((set) => ({
  orders: [],
  getAllOrders: async () => {
    const data = await databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_ORDERS_COLLECTION_ID,
    )
    set({ orders: data });

    return data;
  },
  
  createOrder: async (userId) => {
    const res = await databases.createDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_ORDERS_COLLECTION_ID,
      ID.unique(),
      {
        deliveryPlace: "deliveryPlace",
        dateTime: new Date().toJSON(),
        price: 100,
      },
      [
        Permission.write(Role.user(userId)),
        Permission.read(Role.user(userId)),
        Permission.update(Role.user(userId)),
        Permission.delete(Role.user(userId)),
      ]
    );

    return res;
  },

  deleteOrder: async (orderId) => {
    await databases.deleteDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_ORDERS_COLLECTION_ID,
      orderId,
    );
  },
}));

export default useOrderStore;