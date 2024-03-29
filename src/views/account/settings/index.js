import React, { useState, useEffect, Suspense, lazy } from 'react'
import { Tabs } from 'components/ui'
import { AdaptableCard, Container } from 'components/shared'
import { useNavigate, useLocation } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { useSelector, useDispatch } from 'react-redux'
import { getAdminDet, getShopDet } from 'services/AccountServices'
import useAuth from 'utils/hooks/useAuth'

const Profile = lazy(() => import('./components/Profile'))
const Password = lazy(() => import('./components/Password'))
const Billing = lazy(() => import('./components/Billing'))

const { TabNav, TabList } = Tabs

const settingsMenu = {
	profile: { label: 'Profile', path: 'profile' },
	password: { label: 'Password', path: 'password' },
	billing: { label: 'Billing', path: 'billing' },
}

const Settings = () => {

	const [currentTab, setCurrentTab] = useState('profile')
	const [data, setData] = useState({})
	const [isAdmin, setAdmin] = useState(false)

  const { checkAuthenticate } = useAuth()

	const navigate = useNavigate()

	const location = useLocation()

  	const { id } = useSelector((state) => state.auth.user)
	  const { authority } = useSelector((state) => state.auth.user)

	const path = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)

	const onTabChange = val => {
		setCurrentTab(val)
		navigate(`/settings/account/${val}`)
	}

	const fetchData = async () => {
		await checkAuthenticate();
		if(authority.includes('superadmin') && authority.includes('admin')){
			let response = await getAdminDet(id)
			setAdmin(true)
			setData({
				id: response.data.admin[0].id,
				username: response.data.admin[0].username,
				email: response.data.admin[0].email,
				authority: response.data.admin[0].authority,
				address: response.data.admin[0].address,
				phone_no: response.data.admin[0].phone_no,
				avatar: response.data.admin[0].avatar
			})
		}else{
			let response = await getShopDet(id)
			setData({
				id: response.data.restaurant[0].id,
				username: response.data.restaurant[0].name,
				email: response.data.restaurant[0].email,
				authority: response.data.restaurant[0].authority,
				address: response.data.restaurant[0].address,
				phone_no: response.data.restaurant[0].phone_no,
				avatar: response.data.restaurant[0].avatar
			})
		}
		// console.log(response.data)
		
	}

	useEffect(() => {
		setCurrentTab(path)    
		if(isEmpty(data)) {
			fetchData()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

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
						{ currentTab === 'profile' && <Profile isAdmin={isAdmin} data={data} /> }
						{ currentTab === 'password' && <Password isAdmin={isAdmin} data={data} /> }
						{ currentTab === 'billing' && <Billing isAdmin={isAdmin} data={data} />}
						{/* { currentTab === 'password' && <Password data={data.loginHistory} /> }
						{ currentTab === 'billing' && <Billing data={data.loginHistory} />}  */}
					</Suspense>
				</div>
			</AdaptableCard>
		</Container>
	)
}

export default Settings