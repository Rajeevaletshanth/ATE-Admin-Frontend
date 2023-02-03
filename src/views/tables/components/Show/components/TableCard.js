import React from 'react'
import { Card} from 'components/ui'

const TableCard = () => {

	return (
		<div className="max-w-xs">
			<Card
                clickable
                className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                headerClass="p-0"
            >
                <div className="rounded-tl-lg rounded-tr-lg overflow-hidden">
            <img src="/img/others/img-1.jpg" alt="image" />
        </div>
				<span className="text-emerald-600 font-semibold">Life Style</span>
                <h4 className="font-bold my-3">Use the modern rules</h4>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's.
                </p>
                <div className="flex items-center">
           <span>
                <h6 className="text-sm">edit</h6>
                <span className="text-xs">Sep 23, 2021</span>
           </span>
		</div>
			</Card>
		</div>
	)
}

export default TableCard