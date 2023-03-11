import axios from 'axios';
import config from '../configs/config.json';
import getAccessToken from './AccessToken';


//Super Admin Settings
export async function changePassword (id, data) {
    return new Promise((resolve, reject) => {
        axios.put(`${config.SERVER_URL}/admin/change_password/${id}`, data,
        {headers: {
                'Authorization': `Bearer ${getAccessToken()}`
            }
        }).then((res) => {                           
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export async function getAdminDet (id) {
    return new Promise((resolve, reject) => {
        axios.get(`${config.SERVER_URL}/admin/${id}`, 
        {headers: {
                'Authorization': `Bearer ${getAccessToken()}`
            }
        }).then((res) => {                           
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    }) 
}

export async function editAdminDet (id, data) {
    return new Promise((resolve, reject) => {
        axios.put(`${config.SERVER_URL}/admin/edit/${id}`, data,
        {headers: {
                'Authorization': `Bearer ${getAccessToken()}`
            }
        }).then((res) => {                           
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

//Shop Settings
export async function changeShopPassword (id, data) {
    return new Promise((resolve, reject) => {
        axios.put(`${config.SERVER_URL}/restaurant/change_password/${id}`, data,
        {headers: {
                'Authorization': `Bearer ${getAccessToken()}`
            }
        }).then((res) => {                           
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export async function getShopDet (id) {
    return new Promise((resolve, reject) => {
        axios.get(`${config.SERVER_URL}/restaurant/${id}`, 
        {headers: {
                'Authorization': `Bearer ${getAccessToken()}`
            }
        }).then((res) => {                           
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    }) 
}

export async function editShopDet (id, data) {
    return new Promise((resolve, reject) => {
        axios.put(`${config.SERVER_URL}/restaurant/edit/${id}`, data,
        {headers: {
                'Authorization': `Bearer ${getAccessToken()}`
            }
        }).then((res) => {                           
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
