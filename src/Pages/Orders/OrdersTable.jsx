import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import StatusBadge from '../../Components/atoms/StatusBadge';
import dayjs from 'dayjs';

const OrdersTable = ({ data }) => {
  console.log("data", data);

  const gridRef = useRef();
  const [rowData, setRowData] = useState();

  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'products',
      valueFormatter: (params) => {
        return params.value.join(", ")
      },
      cellRenderer: (params) => {
        return (
          <div className="flex flex-col">
            {params.valueFormatted}
          </div>
        )
      },
    },
    {
      field: 'status',
      cellRenderer: (params) => {
        return <StatusBadge
          text={params.value}
          type={params.value}
        />
      },
    },
    {
      field: '$createdAt',
      headerName: "Created",
      valueFormatter: (params) => dayjs(params.value),
    },
    { field: '$updatedAt', headerName: "Updated", valueFormatter: (params) => dayjs(params.value), },
    { field: 'deliveryPlace', sortable: false },
    { field: 'price', }
  ]);

  const defaultColDef = useMemo(() => ({
    initialWidth: 100,
    filter: true,
    sortable: true,
    resizable: true,
  }));

  const cellClickedListener = useCallback(event => {
    console.log('cellClicked', event);
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

  return (
    <div className="ag-theme-alpine h-96">
      <AgGridReact
        ref={gridRef} // Ref for accessing Grid's API
        rowData={rowData} // Row Data for Rows
        columnDefs={columnDefs} // Column Defs for Columns
        defaultColDef={defaultColDef} // Default Column Properties
        animateRows={false} // Optional - set to 'true' to have rows animate when sorted
        rowSelection='multiple' // Options - allows click selection of rows
        onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        onFirstDataRendered={onFirstDataRendered}
        pagination
      />
    </div>
  );
}

export default OrdersTable;
