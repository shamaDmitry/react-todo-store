import React from 'react'
import { useEffect, useState } from "react";
import Button from "../Components/atoms/Button";
import Title from "../Components/atoms/Title";
import Modal from "../Components/shared/Modal";
import useAuthStore from "../store/authStore";
import useOrderStore from "../store/orderStore";
import CreateOrderForm from "./Orders/CreateOrderForm";
import OrdersTable from './Orders/OrdersTable';

const Orders = () => {
  const [
    orders,
    getAllOrders,
    deleteOrder,
    getAllProducts,
  ] = useOrderStore(store => [
    store.orders,
    store.getAllOrders,
    store.deleteOrder,
    store.getAllProducts,
  ]);

  const handleDelete = (orderId) => {
    deleteOrder(orderId).then(() => {
      getAllOrders();
    })
  }

  useEffect(() => {
    getAllOrders();
    getAllProducts();
    return () => { };
  }, [getAllOrders, getAllProducts]);

  return (
    <>
      <section>
        <Title
          text="Orders"
        />

        <OrdersTable
          data={orders}
        />

        {
          orders?.documents?.map(order => {
            return (
              <div
                key={order.$id}
                className="flex items-center mb-4 gap-x-2"
              >
                id: {order.$id}

                <Button
                  label="deleteOrder"
                  className="text-white bg-red-500"
                  onClick={() => handleDelete(order.$id)}
                />
              </div>
            )
          })
        }
      </section>
    </>
  );
}

export default Orders;
