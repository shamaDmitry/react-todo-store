import React from 'react';

const Combobox = ({ menuItems, value, onChange }) => {
  return (
    <select
      type="text"
      className="w-full px-3 py-1 bg-white border"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="">select</option>

      {menuItems.map(item => {
        return (
          <option
            key={item.$id}
            value={JSON.stringify({ id: item.$id, title: item.title, price: item.price })}
          >
            {item.title}
          </option>
        )
      })}

    </select>
  );
}

export default Combobox;
