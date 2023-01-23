import React, { useState, useEffect } from 'react'
import { Avatar } from 'components/ui'
import { getAvatar } from 'services/ApiService'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import {
  Input,
  Alert,
  Button,
  Select,
  FormItem,
  FormContainer,
  Drawer
} from 'components/ui'
import * as Yup from 'yup'
import CreatableSelect from 'react-select/creatable'
import { useDispatch, useSelector} from 'react-redux'
import { getProductData, putProductData } from '../store/dataSlice'

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const statusOptions = [
  { value: true, label: 'Suspend' },
  { value: false, label: 'Active' }
]

const validationSchema = Yup.object().shape({
  name: Yup.string().max(50, 'Too Long!').required('Name Required'),
  description: Yup.string().required('Description Required'),
  restaurant_id: Yup.string().required('Required'),
  combo_menu_id: Yup.string().required('Required'),
  category_id: Yup.string().required('Required'),
  quantity: Yup.string().required('Required'),
  offer: Yup.string().required('Required'),
  price: Yup.string().required('Required'),
  is_availability: Yup.string().required('Required'),
  is_addons: Yup.string().required('Required'),
  food_type: Yup.string().required('Required'),
  product_avatar: Yup.string(),
})

const EditProduct = ({ data }) => {
  const dispatch = useDispatch()

  const [profileImg, setProfileImg] = useState("");

  const [errorMessage, setErrorMessage] = useTimeOutMessage()
  const [successMessage, setSuccessMessage] = useTimeOutMessage()
  
  const getProfile = async (filename) => {
    try {
      const profile = await getAvatar(filename);
      setProfileImg(URL.createObjectURL(profile))
    } catch (error) {
      setProfileImg('../../../img/avatars/thumb-1.jpg')
    }
  }

  useEffect(() => {
    getProfile(data.avatar);
  }, [])
  
  return (
    <div>
      {errorMessage && <Alert className="mb-4" type="danger" showIcon>{errorMessage}</Alert>}
      {successMessage && <Alert className="mb-4" type="success" showIcon>{successMessage}</Alert>}
      <div className='text-center mb-3'>
        <Avatar size={150} shape="circle" src={profileImg} />
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          id: data.id,
          price: data.price,
          offer:data.offer,
          quantity:data.quantity,
          name: data.name,
          description: data.description,
          combo_menu_id:data.combo_menu_id,
          category_id:data.category_id,
          is_availability:data.is_availability,
          is_addons:data.is_addons,
          food_type: data.food_type,
          restaurant_id: data.restaurant_id
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setSubmitting(true)
            let data = { id: values.id,name:values.name,description:values.description,price:values.price,offer:values.offer,quantity:values.quantity,food_type:values.food_type,is_availability:values.is_availability,is_addons:values.is_addons,category_id:values.category_id,restaurant_id:values.restaurant_id,combo_menu_id:values.combo_menu_id}
            const { payload } = await dispatch(putProductData(data));
            if (payload.response === "success") {
              setSubmitting(false)
              setSuccessMessage(payload.message)
              setTimeout(() => {
                dispatch(getProductData())
              }, 1000)
            } else {
              setSubmitting(false)
              setErrorMessage(payload.message)
            }
          } catch (error) {
            setErrorMessage("404, Axios error!")
            setSubmitting(false)
          }
        }}
      >
        {({ values, touched, errors, resetForm, isSubmitting }) => (
          <Form>
            <FormContainer>
               <Field
                  type="hidden"
                  autoComplete="off"
                  name="restaurant_id"
                  component={Input}
                />
              <FormItem
                label="Product"
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
                label="description"
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
                label="Price"
                invalid={errors.price && touched.price}
                errorMessage={errors.price}
              >
                <Field
                  type="number"
                  autoComplete="off"
                  name="price"
                  placeholder="Price"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Food Type"
                invalid={errors.food_type && touched.food_type}
                errorMessage={errors.food_type}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="food_type"
                  placeholder="Food Type"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Quantity"
                invalid={errors.quantity && touched.quantity}
                errorMessage={errors.quantity}
              >
                <Field
                  type="number"
                  autoComplete="off"
                  name="quantity"
                  placeholder="Quantity"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Availability"
                invalid={errors.is_availability && touched.is_availability}
                errorMessage={errors.is_availability}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="is_availability"
                  placeholder="Availability"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Offer"
                invalid={errors.offer && touched.offer}
                errorMessage={errors.offer}
              >
                <Field
                  type="number"
                  autoComplete="off"
                  name="offer"
                  placeholder="Offer"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Category"
                invalid={errors.category_id && touched.category_id}
                errorMessage={errors.category_id}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="category_id"
                  placeholder="Category"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Comobo Menu"
                invalid={errors.combo_menu_id && touched.combo_menu_id}
                errorMessage={errors.combo_menu_id}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="combo_menu_id"
                  placeholder="Combo Menu"
                  component={Input}
                />
              </FormItem>
 
 
 
              <FormItem>
                <Button type="reset" className="ltr:mr-2 rtl:ml-2" onClick={resetForm} >Reset</Button>
                <Button variant="solid" type="submit" color="gray-800" loading={isSubmitting}>
                  {isSubmitting ? 'Updating...' : 'Update'}
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

export default EditProduct