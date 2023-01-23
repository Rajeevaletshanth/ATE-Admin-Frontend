import React, { useState, useEffect, Suspense, lazy } from 'react'
import { Tabs } from 'components/ui'
import { AdaptableCard, Container } from 'components/shared'
import { useNavigate, useLocation } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { useSelector } from 'react-redux'
import { getShopDet } from 'services/AccountServices'
import useAuth from 'utils/hooks/useAuth'

const Create = lazy(() => import('./components/Create/Create'))
const Show = lazy(() => import('./components/Show'))

const { TabNav, TabList } = Tabs

const settingsMenu = {
	show: { label: 'Table List', path: 'show' },
	create: { label: 'Add Table', path: 'create' },
}

const Table = () => {

	const [currentTab, setCurrentTab] = useState('show')
	const [data, setData] = useState({})

  const { checkAuthenticate } = useAuth()

	const navigate = useNavigate()

	const location = useLocation()

    const { id } = useSelector((state) => state.auth.user)

	const path = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)

	const onTabChange = val => {
		setCurrentTab(val)
		navigate(`/restaurant/table/${val}`)
	} 

	return (
		<Container>
			<AdaptableCard>
				<Tabs value={currentTab} onChange={val => onTabChange(val)}>
					<TabList>
						{
							Object.keys(settingsMenu).map(key =>
								<TabNav key={key} value={key}>{settingsMenu[key].label}</TabNav>
							)
						}
					</TabList>
				</Tabs>
				<div className="px-4 py-6">
					<Suspense fallback={<></>}>
					    { currentTab === 'show' && <Show id={id}/> }
						{ currentTab === 'create' && <Create id={id}/> }
					</Suspense>
				</div>
			</AdaptableCard>
		</Container>
	)
}

export default Table