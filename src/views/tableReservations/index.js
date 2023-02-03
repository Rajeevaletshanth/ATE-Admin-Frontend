import React, { useState, useEffect, Suspense, lazy } from 'react'
import { Card, Tabs} from 'components/ui'
import { AdaptableCard, Container, Loading } from 'components/shared'
import useAuth from 'utils/hooks/useAuth'
import reducer from './store'
import { injectReducer } from 'store/index'
import { useSelector, useDispatch } from 'react-redux';
import { getReservation } from './store/dataSlice'
import ReservationList from './components/ReservationList'

injectReducer('manageReservations', reducer)

const TableReservation = () => {
    const dispatch = useDispatch()
    const [date, setDate] = useState(new Date());
    const { id } = useSelector((state) => state.auth.user);
	const [refresh, setRefresh] = useState(false)

    const reservation = useSelector((state) => state.manageReservations?.data?.reservations?.allReservations);
	const loading = useSelector((state) => state.manageReservations?.data?.loading);

    const fetchData = async () => {
        const reservationData = {id: id, date: date };
		dispatch(getReservation(reservationData));
	}

	useEffect(() => {  
		fetchData(date)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refresh, date])

  return (
    <div className="flex flex-col gap-4 h-full">	
				<Container>
					<AdaptableCard>
						<div className="px-4 py-6">
							<h3 className='mb-6'>Reservations</h3>
							<hr className='mb-4'/>
							<ReservationList data={reservation? reservation: []} dataLength={reservation? reservation.length: 0} date={date} setDate={setDate} loading={loading} refresh={refresh} setRefresh={setRefresh}/>
						</div>
					</AdaptableCard>
				</Container>
		</div>
  )
}

export default TableReservation