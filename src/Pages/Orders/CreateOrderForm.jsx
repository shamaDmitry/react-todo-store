import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import DatePicker from "react-date-picker";
import Combobox from "../../Components/atoms/Combobox";
import useOrderStore from "../../store/orderStore";

const CreateOrderForm = ({ data, handlers }) => {
  const [
    products,
    getAllProducts,
  ] = useOrderStore(store => [
    store.products,
    store.getAllProducts,
  ]);

  const {
    date,
    address,
    product,
  } = data;

  const {
    setDate,
    setAddress,
    setProduct,
  } = handlers;

  return (
    <form onSubmit={e => console.log(e)}>
      <label
        className="block mb-2"
      >
        <p className="mb-1">
          Date
        </p>

        <DatePicker
          onChange={setDate}
          className="w-full"
          value={date}
          minDate={new Date()}
        />
      </label>

      <label
        className="block mb-2"
      >
        <p className="mb-1">
          Address
        </p>

        <input
          value={address}
          onChange={e => setAddress(e.target.value)}
          type="text"
          className="w-full px-3 py-1 border"
          placeholder="Address"
        />
      </label>

      <label
        className="block mb-2"
      >
        <p className="mb-1">
          Product
        </p>

        {product}

        <Combobox
          menuItems={products}
          value={product}
          onChange={setProduct}
        />
      </label>
    </form>
  );
}

export default CreateOrderForm;
