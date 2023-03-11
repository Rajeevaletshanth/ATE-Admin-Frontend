import { Container, AdaptableCard } from 'components/shared'
import React from 'react'
import CreateComboMenu from './CreateComboMenu'

const index = ({ id, refresh, setRefresh }) => {
	return (
		<Container>
			{/* <AdaptableCard>                */}
                <div className="px-4 py-6">
                    {/* <h3 className='mb-6'>Add Product</h3> */}
                    <CreateComboMenu id={id} refresh={refresh} setRefresh={setRefresh}/>
                </div>				
			{/* </AdaptableCard> */}
		</Container>
	)
}

export default index