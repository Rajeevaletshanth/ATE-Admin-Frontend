import axios from 'axios';
import config from '../configs/config.json';
import getAccessToken from './AccessToken';

export async function allOrdersApi(id) {
    return new Promise((resolve, reject) => {
        axios.get(`${config.SERVER_URL}/orders/all_restaurant_orders/${id}`,
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

export async function editStatus(id, data) {
    return new Promise((resolve, reject) => {
        axios.put(`${config.SERVER_URL}/orders/edit/${id}`, data,
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

export async function archiveOrder(id) {
    return new Promise((resolve, reject) => {
        axios.delete(`${config.SERVER_URL}/orders/archive/${id}`,
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

export async function addTable(id, data) {
    return new Promise((resolve, reject) => {
        axios.post(`${config.SERVER_URL}/table/create/${id}`, data,
            {
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`
                }
            }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
    })
}

export async function getTableList(restaurant_id) {
    return new Promise((resolve, reject) => {
        axios.get(`${config.SERVER_URL}/table/list/${restaurant_id}`, 
            {
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`
                }
            }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
    })
}

export async function editTable(id, data) {
    return new Promise((resolve, reject) => {
        axios.put(`${config.SERVER_URL}/table/edit/${id}`, data,
            {
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`
                }
            }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
    })
}

export async function deleteTable(id) {
    return new Promise((resolve, reject) => {
        axios.delete(`${config.SERVER_URL}/table/delete/${id}`, 
            {
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`
                }
            }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
    })
}

export async function getReservations(data) {
    return new Promise((resolve, reject) => {
        axios.post(`${config.SERVER_URL}/table_reservation/list/${data.id}`, {date: data.date},
            {
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`
                }
            }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
    })
}

export async function cancelReservations(id) {
    return new Promise((resolve, reject) => {
        axios.delete(`${config.SERVER_URL}/table_reservation/cancel/${id}`, 
            {
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`
                }
            }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
    })
}


//Products
export async function getAllProduct(restaurant_id) {
    return new Promise((resolve, reject) => {
        axios.get(`${config.SERVER_URL}/product/restaurant/${restaurant_id}`, 
            {
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`
                }
            }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
    })
}

export async function editProduct(id, data) {
    return new Promise((resolve, reject) => {
        axios.put(`${config.SERVER_URL}/product/edit/${id}`, data,
            {
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`
                }
            }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
    })
}

export async function addProduct(data) {
    return new Promise((resolve, reject) => {
        axios.post(`${config.SERVER_URL}/product/create`, data,
            {
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`
                }
            }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
    })
}

export async function removeProduct(id) {
    return new Promise((resolve, reject) => {
        axios.delete(`${config.SERVER_URL}/product/delete/${id}`, 
            {
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`
                }
            }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
    })
}

//Combo Menu
export async function getAllComboMenu(restaurant_id) {
    return new Promise((resolve, reject) => {
        axios.get(`${config.SERVER_URL}/combo_menu/list/${restaurant_id}`, 
            {
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`
                }
            }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
    })
}

export async function editComboMenu(id, data) {
    return new Promise((resolve, reject) => {
        axios.put(`${config.SERVER_URL}/combo_menu/edit/${id}`, data,
            {
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`
                }
            }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
    })
}

export async function addComboMenu(data) {
    return new Promise((resolve, reject) => {
        axios.post(`${config.SERVER_URL}/combo_menu/create`, data,
            {
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`
                }
            }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
    })
}

export async function removeComboMenu(id) {
    return new Promise((resolve, reject) => {
        axios.delete(`${config.SERVER_URL}/combo_menu/delete/${id}`, 
            {
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`
                }
            }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
    })
}


//Category
export async function getAllCategory(restaurant_id) {
    return new Promise((resolve, reject) => {
        axios.get(`${config.SERVER_URL}/category/restaurant/${restaurant_id}`, 
            {
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`
                }
            }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
    })
}

export async function addNewCategory(data) {
    return new Promise((resolve, reject) => {
        axios.post(`${config.SERVER_URL}/category/create`, data,
            {
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`
                }
            }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
    })
}

export async function editCategory(id, data) {
    return new Promise((resolve, reject) => {
        axios.put(`${config.SERVER_URL}/category/edit/${id}`, data,
            {
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`
                }
            }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
    })
}

export async function deleteCategory(id) {
    return new Promise((resolve, reject) => {
        axios.delete(`${config.SERVER_URL}/category/delete/${id}`, 
            {
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`
                }
            }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
    })
}

//Addons
export async function getAllAddons(restaurant_id) {
    return new Promise((resolve, reject) => {
        axios.get(`${config.SERVER_URL}/addons/list/${restaurant_id}`, 
            {
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`
                }
            }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
    })
}

export async function addNewAddon(data) {
    return new Promise((resolve, reject) => {
        axios.post(`${config.SERVER_URL}/addons/create`, data,
            {
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`
                }
            }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
    })
}

export async function editAddon(id, data) {
    return new Promise((resolve, reject) => {
        axios.put(`${config.SERVER_URL}/addons/edit/${id}`, data,
            {
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`
                }
            }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
    })
}

export async function deleteAddon(id) {
    return new Promise((resolve, reject) => {
        axios.delete(`${config.SERVER_URL}/addons/delete/${id}`, 
            {
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`
                }
            }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
    })
}