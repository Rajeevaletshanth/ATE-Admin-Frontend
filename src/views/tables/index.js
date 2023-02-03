import React, { useState, useEffect, Suspense, lazy } from 'react'
import { AdaptableCard, Container, Loading } from 'components/shared'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useAuth from 'utils/hooks/useAuth'

const Show = lazy(() => import('./components/Show'))


const Table = () => {

  const { checkAuthenticate } = useAuth()

	const navigate = useNavigate()

	const location = useLocation()

    const { id } = useSelector((state) => state.auth.user)


	return (
		<Container>
			<AdaptableCard>
				<div className="px-4 py-6">
						<Suspense fallback={<></>}>
							<Show id={id}/>
						</Suspense>
				</div>
			</AdaptableCard>
		</Container>
	)
}

export default Table