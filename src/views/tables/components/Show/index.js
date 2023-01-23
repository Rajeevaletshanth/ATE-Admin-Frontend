import { Container, AdaptableCard } from 'components/shared'
import React, { useEffect, useState } from 'react'
import reducer from './store'
import { Loading } from 'components/shared'
import { injectReducer } from 'store/index'
import {  getTableData } from './store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import TableList from './components/TableList'
// import ProductList from './components/ProductList'


injectReducer('manageTables', reducer)

const ManageTables = ({id}) => {

	const [refreshData, setRefreshData] = useState(false)

	const dispatch = useDispatch()
	const tables = useSelector((state) => state.manageTables.data.getTableData.data);
	const loading = useSelector((state) => state.manageTables.data.loading)

	useEffect(() => {
		fetchData()	
		setRefreshData(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refreshData])
	
	const fetchData = async() => {
		dispatch(getTableData(id))
	}

	return (
		<div className="flex flex-col gap-4 h-full">
			<Loading loading={loading}>				
				<Container>
					<AdaptableCard>
						<div className="px-4 py-6">
							<h3 className='mb-6'>Tables</h3>
							<hr className='mb-4'/>
							{tables && <TableList setRefreshData={setRefreshData}  data={tables} dataLength={tables.length}/>} 
						</div>
					</AdaptableCard>
				</Container>
			</Loading>
		</div>
	)
}

export default ManageTables