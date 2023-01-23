import axios from 'axios';
import config from '../configs/config.json';
import getAccessToken from './AccessToken';

export async function allOrdersApi(id) {
    return new Promise((resole, reject) => {
        axios.get(`${config.SERVER_URL}/orders/all_restaurant_orders/${id}`,
        {headers: {
                'Authorization': `Bearer ${getAccessToken()}`
            }
        }).then((res) => {                         
            resole(res)
        }).catch((err) => {
            reject(err)
        })
    }) 
}

export async function editStatus(id, data) {
    return new Promise((resole, reject) => {
        axios.put(`${config.SERVER_URL}/orders/edit/${id}`, data,
        {headers: {
                'Authorization': `Bearer ${getAccessToken()}`
            }
        }).then((res) => {                           
            resole(res)
        }).catch((err) => {
            reject(err)
        })
    }) 
}

export async function archiveOrder(id) {
    return new Promise((resole, reject) => {
        axios.delete(`${config.SERVER_URL}/orders/archive/${id}`,
        {headers: {
                'Authorization': `Bearer ${getAccessToken()}`
            }
        }).then((res) => {                           
            resole(res)
        }).catch((err) => {
            reject(err)
        })
    }) 
}
