import React, { useState, useMemo } from 'react'
import { Table, Pagination, Select, Tag, Input, Button, Drawer} from 'components/ui'
import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import  { matchSorter } from 'match-sorter'
// import EditLead from './EditProduct'
import { toast, Notification } from 'components/ui'
import { deleteTable } from 'services/RestaurantApiServices'
import { HiTrash, HiOutlinePencil } from 'react-icons/hi'


const columns = [
    // {
    //     Header: 'ID',
    //     accessor: 'id'
    // },
    {
        Header: 'Table No',
        accessor: 'table_no'
    },
	{
        Header: 'Table Type',
        accessor: 'table_type'
    },
	{
        Header: 'Chairs',
        accessor: 'seat_count'
    },
	{
        Header: ' QR Code',
        accessor: 'qr_code'
    },
    {
        Header: 'Action'
    }
]

const { Tr, Th, Td, THead, TBody, Sorter } = Table


const pageSizeOption = [
	{ value: 10, label: '10 / page'},
	{ value: 20, label: '20 / page'},
	{ value: 30, label: '30 / page'},
	{ value: 40, label: '40 / page'},
	{ value: 50, label: '50 / page'},
]

function FilterInput ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
	const count = preGlobalFilteredRows.length
	const [value, setValue] = useState(globalFilter)
	const onChange = useAsyncDebounce(value => {
		setGlobalFilter(value || undefined)
	}, 200)

	return (
		<div className="flex justify-end">
			<div className="flex items-center mb-4">
				{/* <span className="mr-2">Search:</span> */}
				<Input
					size="sm"
					value={value || ""}
					onChange={e => {
						setValue(e.target.value)
						onChange(e.target.value)
					}}
					style={{maxWidth: 180}}
					placeholder={`Search`}
				/>
			</div>
		</div>
	)
}

function fuzzyTextFilterFn(rows, id, filterValue) {
	return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const TableList = props => {

	const { data, dataLength, setRefreshData } = props

    const [isOpen, setIsOpen] = useState(false)
    const [editId, setEditId] = useState(); 
    const [editData, setEditData] = useState(); 

	const openDrawer = (data) => {
        setEditData(JSON.parse(data))
		setIsOpen(true)
	}

	const onDrawerClose = () => {
        setEditId()
		setIsOpen(false)
	}

    const Footer = (
        <div className="text-right w-full">
            <Button size="sm" className="mr-2" onClick={() => onDrawerClose()}>Close</Button>
            <Button size="sm" variant="solid" onClick={() => onDrawerClose()}>Confirm</Button>
        </div>
    )

    const filterTypes = useMemo(() => ({
		// Add a new fuzzyTextFilterFn filter type.
		fuzzyText: fuzzyTextFilterFn,
		// Or, override the default text filter to use
		// "startWith"
		text: (rows, id, filterValue) => {
			return rows.filter(row => {
				const rowValue = row.values[id]
				return rowValue !== undefined ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase()) : true
			})
		},
	}),[])

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
        
	)

	const onPaginationChange = page => {
		gotoPage(page - 1)
	}

	const onSelectChange = value => {
		setPageSize(Number(value))
	}

    const editLead = (e) => {
        openDrawer(e.target.getAttribute('data-details'))
    }
	// Deleted
	const deleteRow = async (id) => {
		const resp = await deleteTable(id);
		if (resp.data) {
			if (resp.data.response === "success") {
				toast.push(<Notification title={resp.data.message} type="success" />, { placement: 'top-center' })
				setTimeout(() => {
					setRefreshData(true)
				}, 500)

			} else if (resp.data.response === "warning") {
				toast.push(<Notification title={resp.data.message} type="success" />, { placement: 'top-center' })
			}
		}
	}

	return (
		<div>
            <FilterInput
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            />                
            
			<Table {...getTableProps()}>
				<THead>
					{headerGroups.map(headerGroup => (
						<Tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(column => (
                            <Th {...column.getHeaderProps(column.getSortByToggleProps())} >
								<div className="text-center">
									{column.render('Header')}
									<span>
										<Sorter sort={column.isSortedDesc}/>
									</span>
								</div>
							</Th>                               
							))}
						</Tr>
					))}
				</THead>
				<TBody {...getTableBodyProps()}>
					{page.map((row, i) => {
						prepareRow(row)
						return (
							<Tr {...row.getRowProps()}>
								{row.cells.map(cell => {
                                     if(cell.column.id === "qr_code"){
										return <Td {...cell.getCellProps()} className="flex justify-center"><img src={cell.value} alt={`QRCode - Table ${cell.row.original.table_no}`} /></Td>
                                        //  return <Td {...cell.getCellProps()}><Tag className={!cell.value? "text-white bg-green-600 border-0" : "text-white bg-red-600 border-0"}> {!cell.value? "Active" : "Suspended"} </Tag> </Td>
                                     }else if(cell.column.Header === "Action"){
                                         return <Td {...cell.getCellProps()} className="text-center"> 
										 <Button className="mr-2 mb-2" size="xs" variant="solid" color="yellow-500" id={cell.row.original.id} data-details={JSON.stringify(cell.row.original)} onClick={editLead}> Edit </Button>
										 <Button size="xs" variant="solid" color="red-500"  onClick={() => deleteRow(cell.row.original.id)}> Delete </Button>
										 </Td> 
                                     }else{
                                         return <Td {...cell.getCellProps()} className="text-center"><b>{cell.render('Cell')}</b></Td>
                                     }									
								})}
							</Tr>
						)
					})}
				</TBody>
			</Table>
            {editData && <Drawer
				title="Products"
				isOpen={isOpen}
				onClose={onDrawerClose}
				onRequestClose={onDrawerClose}
                // footer={Footer}
			>
                {/* <EditLead data={editData}/> */}
			</Drawer>} 
			<div className="flex items-center justify-between mt-4">
				<Pagination
					pageSize={pageSize}
					currentPage={pageIndex + 1}
					total={dataLength}
					onChange={onPaginationChange}
				/>
				<div style={{minWidth: 130}}>
					<Select
						size="sm"
						isSearchable={false} 
						value={pageSizeOption.filter(option => option.value === pageSize)} 
						options={pageSizeOption}
						onChange={option => onSelectChange(option.value)}
					/>
				</div>
			</div>
		</div>
	)
}

export default TableList