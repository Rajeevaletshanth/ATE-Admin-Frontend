import React, { useEffect, useState} from 'react'
import {
    Input,
    Avatar,
    Upload,
    Button,
    Notification,
    toast,
    FormContainer,
    Select,
    Card
} from 'components/ui'
import FormDesription from './FormDesription'
import FormRow from './FormRow'
import { Field, Form, Formik } from 'formik'
import {
    HiOutlineUserCircle,
    HiOutlineUser
} from 'react-icons/hi'
import {
    AiOutlineFieldNumber
} from 'react-icons/ai'
import {
    FaShapes,
    FaChair
} from 'react-icons/fa'


import * as Yup from 'yup'
import { addTable } from 'services/RestaurantApiServices'


const validationSchema = Yup.object().shape({
    table_no: Yup.number().max(1000, 'Table number exceeds the limit!').required('Table number required.'),
    table_type: Yup.string().max(100, 'Maximum length 100').required('Table type required.'),
    seat_count: Yup.number().max(100, 'Chair counts exceeds the limit!').required('Chair count required.')
})

const tableShapes = [
    { value: 'Round', label: 'Round' },
    { value: 'Square', label: 'Square' },
    { value: 'Rectangle', label: 'Rectangle' },
    { value: 'Oval', label: 'Oval' }
]

const Create = ({id}) => {

    const [qrcode, setQrcode] = useState("") 
    const [tableNO, setTableNo] = useState() 
    const [tableType, setTableType] = useState("") 
    const [seatCount, setSeatCount] = useState() 

    const onFormSubmit = async (values, setSubmitting) => {
        let data = {
            table_no: values.table_no,
            table_type:values.table_type,
            seat_count:values.seat_count
        }
        const response = await addTable(id, data);
        if (response.data) {
            if (response.data.response === "success") {
                setQrcode(response.data.qr_code)
                setTableNo(values.table_no)
                setTableType(values.table_type)
                setSeatCount(values.seat_count)
                toast.push(<Notification title={response.data.message} type="success" />, { placement: 'top-center' })
            } else {
                toast.push(<Notification title={response.data.message === "Validation error"? `Table no : ${values.table_no} is already added!`: response.data.message} type="danger" />, { placement: 'top-center' })
            }
            setSubmitting(false)
        }

    }

  return (
    <div>
    <Formik
            initialValues={{
                table_type: '',
                seat_count: 4
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true)
                setTimeout(() => {
                    onFormSubmit(values, setSubmitting)
                }, 1000)
            }}
        >
            {({touched, errors, isSubmitting, resetForm }) => {
                const validatorProps = { touched, errors }
                return (
                    <Form>
                        <FormContainer>
                            <FormDesription
                                title="Add Table"
                                desc="Table customization"
                            />

                                <FormRow className="bg-dark" name="table_no" label="Table No" {...validatorProps}>
                                    <Field
                                        type="number"
                                        autoComplete="off"
                                        name="table_no"
                                        placeholder="Table No"
                                        component={Input}
                                        // prefix={<AiOutlineFieldNumber className="text-xl" />}
                                    />
                                </FormRow>
                                <FormRow name="table_type" label="Table Shape" {...validatorProps}>
                                    <Field name="table_type" >
                                        {({ field, form }) => (
                                            <Select
                                                placeholder="Select a Table Type.."
                                                field={field}
                                                form={form}
                                                options={tableShapes}
                                                value={tableShapes.filter(option => option.value === field.value)}
                                                onChange={option => form.setFieldValue(field.name, option.value)}
                                            />
                                        )}
                                    </Field>
                                </FormRow>	

                                <FormRow name="seat_count" label="Chairs" {...validatorProps}>
                                    <Field
                                        type="number"
                                        autoComplete="off"
                                        name="seat_count"
                                        placeholder="Chairs"
                                        component={Input}
                                        // prefix={<FaChair className="text-xl" />}
                                    />
                                </FormRow>	

                            

                            <div className="mt-4 ltr:text-right">
                                <Button className="ltr:mr-2 rtl:ml-2" type="button" onClick={resetForm}>Reset</Button>
                                <Button variant="solid" loading={isSubmitting} type="submit">
                                    {isSubmitting ? 'Adding Table...' : 'Add'}
                                </Button>
                            </div>

                        </FormContainer>
                    </Form>
                )
            }}

        </Formik>

        {qrcode && <div className='border-dashed border-2 p-5 bg-gray-100 mt-5'>

                <div className="text-center mb-4">
                    <h2>New Table Added</h2>
                    <p>Restaurant ID : {id}</p>
                    <p>Table No : {tableNO}</p>
                    <p>Table Type : {tableType}</p>
                    <p>Seat Count : {seatCount}</p>
                </div>
                <div className='flex justify-center mb-5'>
                    <img src={qrcode}  alt="" />
                </div>
                
                <div className="text-center">
                    <a className='bg-green-500 hover:bg-green-600 p-2 px-4 text-white rounded-lg' download={`QR Code - Table ${tableNO}`} href={qrcode}>Download</a>
                </div>
            
		</div>}
        {/* <div className='flex justify-center'>
            <img src={qrcode?qrcode:""}  alt="" />
        </div>
        <div className="text-center">
            {qrcode && <a className='bg-green-500 hover:bg-green-600 p-2 px-4 text-white rounded-lg' download={tableNO} href={qrcode}>Download</a>}
        </div>
             */}
        
        
    </div>
  )
}

export default Create