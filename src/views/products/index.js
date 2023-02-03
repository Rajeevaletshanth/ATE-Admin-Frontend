import React, { useState, useEffect, Suspense, lazy } from 'react'
import { Tabs, Card } from 'components/ui'
import { AdaptableCard, Container, Loading } from 'components/shared'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import useAuth from 'utils/hooks/useAuth'
import reducer from './store'
import { injectReducer } from 'store/index'
import { getProducts } from './store/dataSlice'

injectReducer('manageProducts', reducer)

const Create = lazy(() => import('./components/create'))
const Show = lazy(() => import('./components/show'))

const { TabNav, TabList } = Tabs

const settingsMenu = {
	show: { label: 'Product List', path: 'show' },
	add: { label: 'Add Product', path: 'add' },
}

const Products = () => {

	const [currentTab, setCurrentTab] = useState('show')
	const [data, setData] = useState({})
    const [refresh, setRefresh] = useState(false)

	const { checkAuthenticate } = useAuth()
	const dispatch = useDispatch()

	const navigate = useNavigate()

	const location = useLocation()

  	const { id } = useSelector((state) => state.auth.user)

	const path = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)

    const products = useSelector((state) => state.manageProducts?.data?.products?.product);
	const loading = useSelector((state) => state.manageOrders?.data?.loading);

	const onTabChange = val => {
		setCurrentTab(val)
		navigate(`/restaurant/products/${val}`)
	}

	const fetchData = async () => {
        await checkAuthenticate();
        dispatch(getProducts(id));
	}

	useEffect(() => {
		setCurrentTab(path)    
		if(isEmpty(data)) {
			fetchData()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refresh])

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
						{ currentTab === 'show' && <Show id={id} data={products? products: []} dataLength={products? products.length: 0} refresh={refresh} setRefresh={setRefresh}/> }
                        { currentTab === 'add' && <Create id={id} refresh={refresh} setRefresh={setRefresh}/> }
					</Suspense>
				</div>
			</AdaptableCard>
		</Container>
	)
}

export default Products