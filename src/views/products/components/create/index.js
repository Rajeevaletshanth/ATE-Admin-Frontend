import { Container, AdaptableCard } from 'components/shared'
import React from 'react'
import CreateProduct from './CreateProduct'

const index = ({ id, refresh, setRefresh }) => {
	return (
		<Container>
			{/* <AdaptableCard>                */}
                <div className="px-4 py-6">
                    {/* <h3 className='mb-6'>Add Product</h3> */}
                    <CreateProduct id={id} refresh={refresh} setRefresh={setRefresh}/>
                </div>				
			{/* </AdaptableCard> */}
		</Container>
	)
}

export default index