import { useEffect, useState } from "react";
import Button from "../Components/atoms/Button";
import Title from "../Components/atoms/Title";
import Modal from "../Components/shared/Modal";
import useAuthStore from "../store/authStore";
import useOrderStore from "../store/orderStore";
import CreateOrderForm from "./Orders/CreateOrderForm";

const Orders = () => {
  const [open, setOpen] = useState(false)

  const [user] = useAuthStore(store => [
    store.user,
  ]);

  const handleSave = () => {
    setOpen(false);
    createOrder(user.$id).then(() => {
      getAllOrders()
    })
  }
  const handleDelete = (orderId) => {
    deleteOrder(orderId).then(() => {
      getAllOrders();
    })
  }

  const [
    orders,
    createOrder,
    getAllOrders,
    deleteOrder,
  ] = useOrderStore(store => [
    store.orders,
    store.createOrder,
    store.getAllOrders,
    store.deleteOrder,
  ]);

  useEffect(() => {
    getAllOrders()
    return () => { };
  }, [getAllOrders]);

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

        <pre className="mb-4 overflow-auto">
          {JSON.stringify(orders)}
        </pre>

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

        <CreateOrderForm />
      </Modal>
    </>
  );
}

export default Orders;
