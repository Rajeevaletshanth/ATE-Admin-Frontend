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
import { addProduct } from 'services/RestaurantApiServices'
import { uploadFile } from 'services/ApiService'
import { getAllCategory, getAllAddons } from 'services/RestaurantApiServices'



const validationSchema = Yup.object().shape({
	name: Yup.string().min(3, "Name is too short").max(50, "Name is too long").required("Please enter the product name."),
	category: Yup.object().shape({
		value: Yup.number(),
		label: Yup.string(),
	  }),
	price: Yup.number().max(10000, "Price is too high!").required("Price required.")
})

const uploadProfile = async(file) => {
    try {
        const avatar = await uploadFile(file)
        return avatar;
    } catch (error) {
        return error
    }
}

const openNotification = (type, message) => {
    toast.push(
      <Notification title={type.charAt(0).toUpperCase() + type.slice(1)} type={type}>
        {message}
      </Notification>
    )
  }

const CreateProduct = ({id, refresh, setRefresh}) => {

	const [prodAddons, setProdAddons] = useState([]);
	const [productImage, setProductImage] = useState([]);

	const [addonOptions, setAddons] = useState([]);
	const [categoryOption, setCategory] = useState([]);

	const onSetFormFile = (form, field, file) => {
		form.setFieldValue(field.name, URL.createObjectURL(file[0]))
        setProductImage([file[0]])
	}

	const getAddons = async() => {
		const response = await getAllAddons(id)
		if(response.data.response === "success"){
			let temp_addons = []
			response.data.addons.map((item, key) => {
				temp_addons[key] = { value: item.id, label: item.name}
				
			})
			setAddons(temp_addons)
		}
	}

	const getCategory = async() => {
		const response = await getAllCategory(id)
		if(response.data.response === "success"){
			let temp_category = [{ value: -1, label: 'No Category'}]
			response.data.category.map((item, key) => {
				temp_category[key+1] = { value: item.id, label: item.name}
				
			})
			setCategory(temp_category)
		}
	}


	const handleAddons = (option) => {
		setProdAddons([]);
		option.map((item) => {
			setProdAddons(s => {
				return[
					...s, item.value
				]
			})
		})
	}

	useEffect(() => {
		getAddons()
		getCategory()
	},[])

	return (
			<div>
				<Formik
					enableReinitialize
					initialValues={{ 
						name: '',
						category: { value: -1, label: 'No Category'},
						price: '',
						description: '',
						addons: '',
						vegetarian: false
					}}
					validationSchema={validationSchema}
					onSubmit={async(values, { setSubmitting }) => {
						let imageurl = ""
						if(productImage.length > 0){
							imageurl = await uploadProfile(productImage)
						}
						
						try {
							setSubmitting(true)
							const response = await addProduct({ 
								name: values.name,
								category_id: values.category? values.category.value: -1,
								restaurant_id: id,
								description: values.description,
								price: values.price,
								addons: prodAddons,
								vegetarian: values.vegetarian,
								avatar: imageurl
							})
							if(response.data){		
								setSubmitting(false)					
								if(response.data.response == "success"){
									openNotification('success', 'Product added successfully.')
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
									label="Description"
									invalid={errors.description && touched.description}
									errorMessage={errors.description}
								>
									<Field 
										type="text" 
										autoComplete="off" 
										name="description" 
										placeholder="Description" 
										component={Input} 
									/>
								</FormItem>

								<FormItem
									label="Category"
									invalid={errors.category && touched.category}
									errorMessage={errors.category}
								>
									<Field name="category" component={Input}>
										{({ field, form }) => (
											<Select
												componentAs={CreatableSelect}
												field={field}
												form={form}
												options={categoryOption}
												value={values.category}
												onChange={option =>  form.setFieldValue(field.name, option) }
											/>
										)}
									</Field>
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

								<FormItem
									label="Addons"
									invalid={errors.addons && touched.addons}
									errorMessage={errors.addons}
								>
									<Field name="addons">
										{({ field, form }) => (
											<Select
												componentAs={CreatableSelect}
												isMulti
												field={field}
												form={form}
												options={addonOptions}
												value={values.addons}
												onChange={option => {
													form.setFieldValue(field.name, option);
													handleAddons(option);
												}}
											/>
										)}
									</Field>
								</FormItem>

								<FormItem
									invalid={errors.vegetarian && touched.vegetarian}
									errorMessage={errors.vegetarian}
								>
									<Field 
										type="checkbox" 
										name="vegetarian"  
										component={Checkbox} 
									> Vegetarian</ Field>
								</FormItem>

								<FormItem
									label="Product Image"
									invalid={errors.avatar && touched.avatar}
									errorMessage={errors.avatar}
								>                            
                                    <Field name="avatar" component={Input}>
                                        {({ field, form }) => {
                                        const avatarProps = field.value ? { src: productImage.length > 0? field.value : "" } : {}
                                        return (
                                            <Upload
                                                className="cursor-pointer"
                                                onChange={files => onSetFormFile(form, field, files)}
                                                onFileRemove={files => onSetFormFile(form, field, files)}
                                                showList={false}
                                                uploadLimit={1}
                                            >
                                                <Avatar 
                                                    className="border-2 border-white dark:border-gray-800 shadow-lg"
                                                    size={250} 
                                                    shape="square"
                                                    icon={<MdOutlineFastfood />}
                                                    {...avatarProps}  
                                                />
                                            </Upload>
                                        )
                                        }}
                                    </Field>
								</FormItem>
								
								<FormItem>
									<Button type="reset" className="ltr:mr-2 rtl:ml-2" onClick={resetForm}>Reset</Button>
									<Button variant="solid" type="submit" loading={isSubmitting} >
										{ isSubmitting ? 'Adding Product...' : 'Add' }
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

export default CreateProduct
