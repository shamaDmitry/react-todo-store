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
  const [open, setOpen] = useState(false);
  const [user] = useAuthStore(store => [
    store.user,
  ]);

  const [
    orders,
    products,
    createOrder,
    getAllOrders,
    deleteOrder,
    getAllProducts,
  ] = useOrderStore(store => [
    store.orders,
    store.products,
    store.createOrder,
    store.getAllOrders,
    store.deleteOrder,
    store.getAllProducts,
  ]);

  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [product, setProduct] = useState();

  const handleSave = () => {
    setOpen(false);

    const data = {
      dateTime: date,
      product: JSON.parse(product),
      deliveryPlace: address,
      userId: user.$id,
    }

    createOrder(data).then(() => {
      getAllOrders();
    })
  }
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

        <Button
          label="Create order"
          onClick={() => setOpen(!open)}
          className="mb-4"
        ></Button>

        <OrdersTable
          data={orders}
        />

        {/* {
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
        } */}
      </section>

      <Modal
        open={open}
        setOpen={setOpen}
        handleOk={handleSave}
        okText="Save"
        cancelText="Cancel"
      >
        <h1 className="mb-3 text-lg font-bold capitalize">
          create order
        </h1>

        <CreateOrderForm
          data={{
            date,
            address,
            product,
          }}
          handlers={{
            setDate,
            setAddress,
            setProduct
          }}
        />
      </Modal>
    </>
  );
}

export default Orders;
