import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import StatusBadge from '../../Components/atoms/StatusBadge';
import dayjs from 'dayjs';
import Modal from '../../Components/shared/Modal';
import CreateOrderForm from './CreateOrderForm';
import useAuthStore from '../../store/authStore';
import Button from '../../Components/atoms/Button';
import useOrderStore from '../../store/orderStore';

const OrdersTable = ({ data }) => {
  const [user] = useAuthStore(store => [
    store.user,
  ]);

  const [
    createOrder,
    getAllOrders,
    updateOrder,
  ] = useOrderStore(store => [
    store.createOrder,
    store.getAllOrders,
    store.updateOrder,
  ]);


  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [date, setDate] = useState(new Date());
  const [address, setAddress] = useState("");
  const [product, setProduct] = useState();
  const [status, setStatus] = useState();

  const handleSave = () => {
    setOpen(false);

    const data = {
      dateTime: date,
      product: JSON.parse(product),
      deliveryPlace: address,
      status,
      userId: user.$id,
    }

    console.log('data', data);
    console.log('isEdit', isEdit);
    

    // if (!isEdit) {
    //   createOrder(data).then(() => {
    //     getAllOrders();
    //   });
    // } else {
    //   updateOrder(data).then(() => {
    //     getAllOrders();
    //   });
    // }
  }

  const gridRef = useRef();
  const [rowData, setRowData] = useState();

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "dateTime",
      headerName: "To Date",
      valueFormatter: (params) => dayjs(params.value),
    },
    // {
    //   field: 'products',
    //   valueFormatter: (params) => {
    //     return params.value.join(", ")
    //   },
    //   cellRenderer: (params) => {
    //     return (
    //       <div className="flex flex-col">
    //         {params.valueFormatted}
    //       </div>
    //     )
    //   },
    // },
    {
      field: 'status',
      cellRenderer: (params) => {
        return <StatusBadge
          text={params.value}
          type={params.value}
        />
      },
    },
    { field: 'deliveryPlace', sortable: false },
    { field: 'price', },
    {
      field: '$createdAt',
      headerName: "Created",
      valueFormatter: (params) => dayjs(params.value),
    },
    { field: '$updatedAt', headerName: "Updated", valueFormatter: (params) => dayjs(params.value), },
  ]);

  const defaultColDef = useMemo(() => ({
    initialWidth: 100,
    filter: true,
    sortable: true,
    resizable: true,
  }));

  const cellClickedListener = useCallback(event => {
    setOpen(true);
    setIsEdit(true);

    const { data } = event

    setDate(data.dateTime);
    setAddress(data.deliveryPlace);
    setProduct(data.product);
    setStatus(data.status);
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);

  useEffect(() => {
    setRowData(data.documents)
  }, [data]);

  // Example using Grid's API
  const buttonListener = useCallback(e => {
    gridRef.current.api.deselectAll();
  }, []);

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById('filter-text-box').value
    );
  }, []);

  return (
    <>
      <div className="flex mb-4">
        <Button
          label="Create order"
          onClick={() => setOpen(!open)}
        />

        <div className="ml-auto">
          <input
            className="px-3 py-1 text-base border"
            type="text"
            id="filter-text-box"
            placeholder="Search..."
            onInput={onFilterTextBoxChanged}
          />
        </div>
      </div>

      <div className="ag-theme-alpine h-96">
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={false} // Optional - set to 'true' to have rows animate when sorted
          rowSelection='single' // Options - allows click selection of rows
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
          onFirstDataRendered={onFirstDataRendered}
          pagination
        />
      </div>

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
            status,
          }}
          handlers={{
            setDate,
            setAddress,
            setProduct,
            setStatus,
          }}
        />
      </Modal>
    </>

  );
}

export default OrdersTable;
