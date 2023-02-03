import React, { useState, useMemo } from "react";
import {
  Table,
  Pagination,
  Select,
  Tag,
  Input,
  Button,
  Drawer,
  Badge,
  DatePicker,
  Alert,
  Notification,
  toast
} from "components/ui";
import { Loading } from 'components/shared'
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import { matchSorter } from "match-sorter";
import { HiPencilAlt, HiOutlineTrash } from "react-icons/hi";
import { cancelReservations } from 'services/RestaurantApiServices'

const columns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Customer Name",
    accessor: "customer.customer_name",
  },
  {
    Header: "Customer Phone",
    accessor: "customer.customer_phone",
  },
  {
    Header: "Tables",
    accessor: "table_ids",
  },
  // {
  //     Header: 'Date',
  //     accessor: 'reservation_date'
  // },
  {
    Header: "Time",
  },
  {
    Header: "Action",
  },
];

const { Tr, Th, Td, THead, TBody, Sorter } = Table;

const pageSizeOption = [
  { value: 10, label: "10 / page" },
  { value: 20, label: "20 / page" },
  { value: 30, label: "30 / page" },
  { value: 40, label: "40 / page" },
  { value: 50, label: "50 / page" },
];

function FilterInput({ preGlobalFilteredRows, globalFilter, setGlobalFilter, date, setDate }) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  const handleDate = (date) => {
	let convDate = new Date(date);
	let formattedDate = convDate.toLocaleDateString("en-US", {year: 'numeric', month: '2-digit', day: '2-digit'});
	setDate(formattedDate);
  }

  return (
    <div className="flex justify-end">
      <div className="flex items-center mb-4">
        {/* <span className="mr-2">Search:</span> */}
		<DatePicker 
		  	size="sm" 
		  	style={{ maxWidth: 180 }}
			value={date}
			placeholder="Choose a date"
			className="mr-2 mb-2"
			onChange={(date) => handleDate(date)}
		/>

        <Input
          size="sm"
		  className="mb-2"
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          style={{ maxWidth: 180 }}
          placeholder={`Search`}
        />
      </div>
    </div>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const ReservationList = (props) => {
  const { data, dataLength, date, setDate, loading, refresh, setRefresh } = props;

  const filterTypes = useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
    rows,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    allColumns,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualPagination: false,
      filterTypes,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const onPaginationChange = (page) => {
    // console.log("page", page);
    gotoPage(page - 1);
  };

  const onSelectChange = (value) => {
    setPageSize(Number(value));
  };

  const convertUTCtoLocal = (utcDateTime) => {
    let localDate = new Date(utcDateTime);
    return localDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const openNotification = (type, message) => {
    toast.push(
      <Notification title={type.charAt(0).toUpperCase() + type.slice(1)} type={type}>
        {message}
      </Notification>
    )
  }

  const deleteReservation = async(id) => {
	const response = await cancelReservations(id);
	if(response.data){
		if(response.data.response === "success"){
			openNotification('success', 'Reservation Cancelled.')
			setRefresh(!refresh)
		}else{
			openNotification('danger', response.data.message)
		}
	}
  }

  return (
    <div>
      <FilterInput
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
        date={date}
        setDate={setDate}
      /> 

      <Table {...getTableProps()}>
        <THead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    <Sorter sort={column.isSortedDesc} />
                  </span>
                </Th>
              ))}
            </Tr>
          ))}
        </THead>
		<Loading loading={loading}>
        <TBody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  if (cell.column.Header === "Action") {
                    return (
                      <Td {...cell.getCellProps()}>
                        <Button
                          size="xs"
                          variant="solid"
                          color="red-600"
                        //   id={cell.row.original.id}
						  onClick={() => deleteReservation(cell.row.original.id)}
                        >
                          Cancel
                        </Button>
                      </Td>
                    );
                  } else if (cell.column.Header === "Time") {
                    return (
                      <Td {...cell.getCellProps()}>
                        {convertUTCtoLocal(cell.row.original.reservation_from)}{" "}
                        - {convertUTCtoLocal(cell.row.original.reservation_to)}
                      </Td>
                    );
                  } else {
                    return (
                      <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                    );
                  }
                })}
              </Tr>
            );
          })}
        </TBody>
		</Loading>
      </Table>
      <div className="flex items-center justify-between mt-4">
        <Pagination
          pageSize={pageSize}
          currentPage={pageIndex + 1}
          total={dataLength}
          onChange={onPaginationChange}
        />
        <div style={{ minWidth: 130 }}>
          <Select
            size="sm"
            isSearchable={false}
            value={pageSizeOption.filter((option) => option.value === pageSize)}
            options={pageSizeOption}
            onChange={(option) => onSelectChange(option.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ReservationList;
