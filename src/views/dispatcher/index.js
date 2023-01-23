import React, { useState, useEffect, Suspense, lazy } from 'react'
import { Tabs } from 'components/ui'
import { AdaptableCard, Container, Loading } from 'components/shared'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import useAuth from 'utils/hooks/useAuth'
import reducer from './store'
import { injectReducer } from 'store/index'
import { getOrders } from './store/dataSlice'


import {
	MdPendingActions
} from 'react-icons/md'

injectReducer('manageOrders', reducer)

const Pending = lazy(() => import('./components/pending'))
const Accepted = lazy(() => import('./components/accepted'))
const Ongoing = lazy(() => import('./components/ongoing'))
const Delivered = lazy(() => import('./components/delivered'))
const Cancelled = lazy(() => import('./components/cancelled'))

const { TabNav, TabList } = Tabs

const settingsMenu = {
	pending: { label: 'Pending', path: 'pending' },
	accepted: { label: 'Accepted', path: 'accepted' },
	ongoing: { label: 'Ongoing', path: 'ongoing' },
	delivered: { label: 'Delivered', path: 'delivered' },
	cancelled: { label: 'Cancelled', path: 'cancelled' }
}

const Settings = () => {

	const [currentTab, setCurrentTab] = useState('profile')

	const { checkAuthenticate } = useAuth()
	const dispatch = useDispatch()

	const navigate = useNavigate()

	const location = useLocation()

  	const { id } = useSelector((state) => state.auth.user)

	const [refresh, setRefresh] = useState(false)

	const path = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)

	const orders = useSelector((state) => state.manageOrders?.data?.orders?.data);
	const loading = useSelector((state) => state.manageOrders?.data?.loading);

	const onTabChange = val => {
		setCurrentTab(val)
		navigate(`/restaurant/dispatcher/${val}`)
	}

	const fetchData = async () => {
		dispatch(getOrders(id));
	}

	useEffect(() => {
		setCurrentTab(path)    
		fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if(refresh)
			fetchData()
		setRefresh(false)
	},[orders, refresh])

	return (
		<Container>
			<AdaptableCard >
				<Tabs value={currentTab} variant="pill"  onChange={val => onTabChange(val)}>
					<TabList >
						{
							Object.keys(settingsMenu).map((key) =>
								<TabNav key={key} value={key} >{settingsMenu[key].label}</TabNav>
							)
						}
					</TabList>
				</Tabs>
				<div className="px-4 py-6">
					<Loading loading={loading}>
					<Suspense fallback={<></>}>
						{ currentTab === 'pending' && <Pending orders={orders?orders:[]} setRefresh={setRefresh}/> }
						{ currentTab === 'accepted' && <Accepted  orders={orders?orders:[]}  setRefresh={setRefresh}/> }
						{ currentTab === 'ongoing' && <Ongoing  orders={orders?orders:[]}  setRefresh={setRefresh}/>}
						{ currentTab === 'delivered' && <Delivered  orders={orders?orders:[]}  setRefresh={setRefresh}/> }
						{ currentTab === 'cancelled' && <Cancelled  orders={orders?orders:[]}  setRefresh={setRefresh}/>}
					</Suspense>
					</Loading>
				</div>
			</AdaptableCard>
		</Container>
	)
}

export default Settings