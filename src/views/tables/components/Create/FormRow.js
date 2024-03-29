import React from 'react'
import classNames from 'classnames'
import { FormItem } from 'components/ui'

const FormRow = props => {

	const {
		label, 
		children, 
		errors, 
		touched, 
		name, 
		border = true,
		alignCenter = true
	} =props

	return (
		// <div className={classNames(
		// 	'grid md:grid-cols-3 gap-4 py-8',
		// 	alignCenter && 'items-center'
		// )}>
		// 	<div className="font-semibold">{label}</div>
		// 	<div className="col-span-4">
				<FormItem
					className="mb-0 w-3/6"
					invalid={errors[name] && touched[name]}
					errorMessage={errors[name]}
				>
					{children}
				</FormItem>
		// 	</div>
		// </div>
	)
}

export default FormRow