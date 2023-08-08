const CreateOrderForm = () => {
  return (
    <form>
      <label
        className="block mb-2"
      >
        <p className="mb-1">
          Date
        </p>

        <input
          type="text"
          className="w-full px-3 py-1 border"
          placeholder="Date"
        />
      </label>

      <label
        className="block mb-2"
      >
        <p className="mb-1">
          Address
        </p>

        <input
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
        <input
          type="text"
          className="w-full px-3 py-1 border"
          placeholder="Product"
        />
      </label>

      <label
        className="block mb-2"
      >
        <p className="mb-1">
          Price
        </p>
        <input
          type="text"
          className="w-full px-3 py-1 border"
          placeholder="Price"
        />
      </label>
    </form>
  );
}

export default CreateOrderForm;
