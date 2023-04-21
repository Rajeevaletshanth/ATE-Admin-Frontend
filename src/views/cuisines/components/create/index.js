import { Container, AdaptableCard } from 'components/shared'
import React from 'react'
import CreateCuisines from './CreateCuisine'

const index = ({ id, refresh, setRefresh }) => {
	return (
		<Container>
			{/* <AdaptableCard>                */}
                <div className="px-4 py-6">
                    {/* <h3 className='mb-6'>Add Product</h3> */}
                    <CreateCuisines id={id} refresh={refresh} setRefresh={setRefresh}/>
                </div>				
			{/* </AdaptableCard> */}
		</Container>
	)
}

export default index