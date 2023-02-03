import { Container, AdaptableCard } from 'components/shared'
import React, { useEffect, useState } from 'react'
import reducer from './store'
import { Loading } from 'components/shared'
import { injectReducer } from 'store/index'
import {  getTableData } from './store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import TableList from './components/TableList'
// import ProductList from './components/ProductList'
import Create from '../Create/Create'

injectReducer('manageTables', reducer)

const ManageTables = ({id}) => {

	const [refreshData, setRefreshData] = useState(false)

	const dispatch = useDispatch()
	const tables = useSelector((state) => state.manageTables.data.getTableData.data);
	const loading = useSelector((state) => state.manageTables.data.loading)

	useEffect(() => {
		fetchData()	
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refreshData])
	
	const fetchData = async() => {
		dispatch(getTableData(id))
	}

	return (
		<div className="flex flex-col gap-4 h-full">
						
				<Container>
					{/* <AdaptableCard> */}
						{/* <div className="px-4 py-6"> */}
							<h3 className='mb-6'>Tables</h3>
							<hr className='mb-4'/>
							<Create id={id} refreshData={refreshData} setRefreshData={setRefreshData}/>
							{/* <Loading loading={loading}>	 */}
							{tables && <TableList refreshData={refreshData} setRefreshData={setRefreshData}  data={tables} dataLength={tables.length} id={id}/>}
							{/* </Loading>  */}
						{/* </div> */}
					{/* </AdaptableCard> */}
				</Container>
			
		</div>
	)
}

export default ManageTables