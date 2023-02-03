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
// import { getProductData, putProductData } from '../store/dataSlice'
import { editTable } from 'services/RestaurantApiServices'

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const statusOptions = [
  { value: true, label: 'Suspend' },
  { value: false, label: 'Active' }
]

const validationSchema = Yup.object().shape({
  // name: Yup.string().max(50, 'Too Long!').required('Name Required'),
  // description: Yup.string().required('Description Required'),
  // restaurant_id: Yup.string().required('Required'),
  // combo_menu_id: Yup.string().required('Required'),
  // category_id: Yup.string().required('Required'),
  // quantity: Yup.string().required('Required'),
  // offer: Yup.string().required('Required'),
  // price: Yup.string().required('Required'),
  // is_availability: Yup.string().required('Required'),
  // is_addons: Yup.string().required('Required'),
  // food_type: Yup.string().required('Required'),
  // product_avatar: Yup.string(),

  table_no: Yup.number().max(1000, 'Table number exceeds the limit!').required('Table number required.'),
  table_type: Yup.string().max(100, 'Maximum length 100').required('Table type required.'),
  seat_count: Yup.number().max(100, 'Chair counts exceeds the limit!').required('Chair count required.')
})

const EditTable = ({ data, id, refreshData, setRefreshData }) => {
  const dispatch = useDispatch()
  const [profileImg, setProfileImg] = useState("");
  const table_id = data.id
  const [errorMessage, setErrorMessage] = useTimeOutMessage()
  const [successMessage, setSuccessMessage] = useTimeOutMessage()
  
  return (
    <div>
      {errorMessage && <Alert className="mb-4" type="danger" showIcon>{errorMessage}</Alert>}
      {successMessage && <Alert className="mb-4" type="success" showIcon>{successMessage}</Alert>}
      <Formik
        enableReinitialize
        initialValues={{
          table_no: data.table_no,
          table_type: data.table_type,
          seat_count: data.seat_count
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setSubmitting(true)
            let data = {table_no : values.table_no, table_type : values.table_type, seat_count : values.seat_count}
           
            const response = await editTable(table_id, data)
            if(response.data){
              setSubmitting(false)
              if(response.data.response === "success"){
                setSuccessMessage(response.data.message)
                setRefreshData(!refreshData)
              }else{
                setErrorMessage(response.data.message)
              }
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

              <FormItem
                label="Table No"
                invalid={errors.table_no && touched.table_no}
                errorMessage={errors.table_no}
              >
                <Field
                  type="number"
                  autoComplete="off"
                  name="table_no"
                  placeholder="Table No"
                  component={Input}
                />
              </FormItem>

              <FormItem
                label="Table Type"
                invalid={errors.table_type && touched.table_type}
                errorMessage={errors.table_type}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="table_type"
                  placeholder="Table Type"
                  component={Input}
                />
              </FormItem>
              
              <FormItem
                label="Chairs"
                invalid={errors.seat_count && touched.seat_count}
                errorMessage={errors.seat_count}
              >
                <Field
                  type="number"
                  autoComplete="off"
                  name="seat_count"
                  placeholder="Chairs"
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

export default EditTable