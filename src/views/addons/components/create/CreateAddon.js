import React, { useEffect, useState } from 'react'
import { 
	Input,
	Alert,
	Button,
	Select,
	FormItem,
	FormContainer,
	Checkbox,
	Avatar,
	Upload,
  	Notification,
  	toast
} from 'components/ui'
import { 
	MdOutlineFastfood
} from 'react-icons/md'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import CreatableSelect from 'react-select/creatable'
import * as Yup from 'yup'
import { addNewAddon } from 'services/RestaurantApiServices'



const validationSchema = Yup.object().shape({
	name: Yup.string().min(3, "Name is too short").max(50, "Name is too long").required("Please enter the product name."),
	price: Yup.number().max(10000, "Price is too high!").required("Price required.")
})


const openNotification = (type, message) => {
    toast.push(
      <Notification title={type.charAt(0).toUpperCase() + type.slice(1)} type={type}>
        {message}
      </Notification>
    )
  }

const CreateAddon = ({id, refresh, setRefresh}) => {

	return (
			<div>
				<Formik
					enableReinitialize
					initialValues={{ 
						name: '',
						price: ''
					}}
					validationSchema={validationSchema}
					onSubmit={async(values, { setSubmitting }) => {
				
						try {
							setSubmitting(true)
							const response = await addNewAddon({ 
								name: values.name,
								restaurant_id: id,
								price: values.price
							})
							if(response.data){		
								setSubmitting(false)					
								if(response.data.response == "success"){
									openNotification('success', 'Addon added successfully.')
									setRefresh(!refresh)
								}else{
									openNotification('danger', response.data.message)
								}								
							}
						} catch (error) {
							openNotification('danger', error.message)
							setSubmitting(false)
						}
					}}
				>
					{({values, touched, errors, resetForm, isSubmitting }) => (
						<Form>
							<FormContainer>
								<FormItem
									label="Name"
									invalid={errors.name && touched.name}
									errorMessage={errors.name}
								>
									<Field 
										type="text" 
										autoComplete="off" 
										name="name" 
										placeholder="Name" 
										component={Input} 
									/>
								</FormItem>

								<FormItem
									label="Price"
									invalid={errors.price && touched.price}
									errorMessage={errors.price}
								>
									<Field 
										type="number" 
										autoComplete="off" 
										name="price" 
										placeholder="Price in Euro" 
										component={Input} 
									/>
								</FormItem>
								
								<FormItem>
									<Button type="reset" className="ltr:mr-2 rtl:ml-2"  onClick={resetForm}>Reset</Button>
									<Button variant="solid" type="submit" className="bg-primary" loading={isSubmitting} >
										{ isSubmitting ? 'Adding...' : 'Add' }
									</Button>
								</FormItem>
							</FormContainer>
						</Form>
						)
					}
				</Formik>
		</div>
	)
}

export default CreateAddon
