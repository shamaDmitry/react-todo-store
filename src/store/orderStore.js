import { create } from 'zustand'
import { Permission, Query, Role } from 'appwrite';
import { databases, ID } from '../../appwrite';

const useOrderStore = create((set) => ({
  orders: [],
  products: [],
  getAllOrders: async () => {
    const data = await databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_ORDERS_COLLECTION_ID,
      [
        Query.orderDesc("$createdAt")
      ]
    )
    set({ orders: data });

    return data;
  },

  getAllProducts: async () => {
    const data = await databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_PRODUCTS_COLLECTION_ID,
    )

    set({ products: data.documents });

    return data;
  },

  createOrder: async (data) => {
    const {
      dateTime,
      deliveryPlace,
      product,
      status,
      userId
    } = data;

    const res = await databases.createDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_ORDERS_COLLECTION_ID,
      ID.unique(),
      {
        products: [product.title],
        deliveryPlace,
        dateTime: dateTime,
        status,
        price: product.price,
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