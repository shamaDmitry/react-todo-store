import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import DatePicker from "react-date-picker";
import Combobox from "../../Components/atoms/Combobox";
import useOrderStore from "../../store/orderStore";
import { ORDER_STATUS } from '../../enums/ORDER_STATUS';

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
    status,
  } = data;

  const {
    setDate,
    setAddress,
    setProduct,
    setStatus,
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
          Status
        </p>
        
        <select
          className="w-full px-3 py-1 lowercase bg-white border"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          {
            Object.keys(ORDER_STATUS).map(item => {
              return (
                <option
                  value={item.toLowerCase()}
                  key={item}
                >
                  {item}
                </option>
              )
            })
          }

        </select>
      </label>

      <label
        className="block mb-2"
      >
        <p className="mb-1">
          Product
        </p>

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
