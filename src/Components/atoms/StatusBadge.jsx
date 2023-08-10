import classNames from 'classnames';
import React from 'react';
import { ORDER_STATUS } from '../../enums/ORDER_STATUS';

const {
  REGISTERED,
  PACKING,
  SENT,
  CANCELED,
} = ORDER_STATUS;

const StatusBadge = ({ text, type }) => {
  return (
    <div className={
      classNames("font-bold rounded-full inline-flex items-center justify-center px-2 text-xs capitalize border h-5", {
        "bg-yellow-500 text-white border-yellow-500": type === PACKING,
        "bg-green-500 text-white border-green-500": type === SENT,
        "bg-sky-500 text-white border-sky-500": type === REGISTERED,
        "bg-red-500 text-white border-red-500": type === CANCELED,
      })
    }>
      {text}
    </div>
  );
}

export default StatusBadge;
