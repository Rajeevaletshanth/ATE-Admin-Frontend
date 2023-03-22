import React, { useState } from 'react'
import { Card, Button, Tag, Table, Alert, Notification, toast   } from 'components/ui'
import { HiCheckCircle } from 'react-icons/hi'
import moment from 'moment';
import { putOrder } from '../../store/dataSlice';
import  { editStatus, archiveOrder } from 'services/RestaurantApiServices'

const { Tr, Th, Td, THead, TBody } = Table

const Cancelled = ({orders, setRefresh}) => {

    const [loading, setLoading] = useState({value:false,status:"", id:""})

    const toastMessage = (type, message) => {
		toast.push(
			<Notification title={type.charAt(0).toUpperCase() + type.slice(1)} type={type}>
				{message}
			</Notification>
		)
	}

    const updateStatus = async(event, order_id, status) => {
        event.preventDefault()
        setLoading({value:true, status:status, id:order_id})
        const data = {
            "status" : status
        }
        const response = await editStatus(order_id, data)
        if(response.data){
            setLoading({value:false, status:status, id:order_id})
            if(response.data.response === "success"){
                toastMessage("success", response.data.message)
            }else{
                toastMessage("danger", response.data.message)
            }
        }
        setRefresh(true)
    }

    const deleteOrder = async(event, order_id, status) => {
      event.preventDefault()
      setLoading({value:true, status:status, id:order_id})
      const response = await archiveOrder(order_id)
      if(response.data){
          setLoading({value:false, status:status, id:order_id})
          if(response.data.response === "success"){
              toastMessage("success", response.data.message)
          }else{
              toastMessage("danger", response.data.message)
          }
      }
      setRefresh(true)
    }

    const headerExtraContent = (
        <span className="flex items-center">
            <Tag prefix prefixClass="bg-red-500">Cancelled</Tag>
        </span>
    )

    let order_count = 0;


	return (
		<div className="grid-cols-2">
            {orders?.map((item, key) => {
                if(item.status === "cancelled"){
                    order_count++;
                    return[
                        <Card key={key} className="text-xs hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid mb-3" header={`Order ID : ${item.order_id}`} headerExtra={headerExtraContent} headerBorder={true}>
                            <div class="flex ml-4">
                                <div class="w-1/2">
                                    <p><b>Name:</b> {item.customer_name}</p>
                                    <p><b>Phone:</b> {item.customer_phone}</p>
                                    <p><b>Email:</b> {item.customer_email}</p>
                                </div>
                                <div class="w-1/2">
                                    <p><b>Order Date:</b> {moment(item.order_date).format("MMMM DD, YYYY")}</p>
                                    <p><b>Order Time:</b> {moment(item.order_time, "HH:mm:ss").format("h:mm A")}</p>
                                    <p><b>Delivery Address:</b> {item.delivery_address} </p>
                                </div>
                            </div>
                                <Table className="mt-3">
                                    <THead className="">
                                        <Tr>
                                            <Th>Product ID</Th>
                                            <Th>Name</Th>
                                            <Th>Quantity</Th>
                                            <Th>Addons</Th>
                                        </Tr>
                                    </THead>
                                    <TBody>
                                        {item.items.map((product, product_key) => {
                                            return[
                                                <Tr  key={product_key}>
                                                    <Td>{product.product.id}</Td>
                                                    <Td>{product.product.name}</Td>
                                                    <Td>{product.quantity}</Td>
                                                    <Td>{product.addons && product.addons.map((addon) => {
                                                        return[
                                                            <p>{addon.addon_name}</p>
                                                        ]
                                                    })}</Td>
                                                </Tr>
                                            ]
                                        })}
                                    </TBody>
                                </Table>
                            <div className="mt-6 text-right">
                                <h6 className="text-sm font-medium">Total Amount</h6>
                                <h6>€ {item.total_amount}</h6>
                            </div>
                            <div className="flex justify-end mt-3">
                                <Button size="sm" className="ltr:mr-2 rtl:ml-2" variant="solid" color="red" loading={loading.value && loading.status === "archived" && loading.id === item.order_id? true : false} onClick={(event) => deleteOrder(event, item.order_id, "archived")}>Archive</Button>
                                <Button size="sm" variant="solid" color="green" loading={loading.value && loading.status === "accepted" && loading.id === item.order_id? true : false} onClick={(event) => updateStatus(event, item.order_id, "accepted")}>Accept</Button>
                            </div>
                        </Card>
                    ]
                }
            })}
            {!orders || order_count === 0 && 
              <Card  className="text-center">
                <h5>No cancelled orders!</h5>
              </Card>
            }
		</div>
	)
}

export default Cancelled