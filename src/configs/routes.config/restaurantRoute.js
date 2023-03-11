import React from 'react'
import {SUPERADMIN, RESTAURANT, ADMIN, USER} from 'constants/roles.constant'

const restaurantRoute = [
    {
        key: 'restaurant.dispatcher.pending',
        path: '/restaurant/dispatcher/pending',
        component: React.lazy(() => import('views/dispatcher')),
        authority: [RESTAURANT],
    },
    {
        key: 'restaurant.dispatcher.accepted',
        path: '/restaurant/dispatcher/accepted',
        component: React.lazy(() => import('views/dispatcher')),
        authority: [RESTAURANT],
    },
    {
        key: 'restaurant.dispatcher.ongoing',
        path: '/restaurant/dispatcher/ongoing',
        component: React.lazy(() => import('views/dispatcher')),
        authority: [RESTAURANT],
    },
    {
        key: 'restaurant.dispatcher.delivered',
        path: '/restaurant/dispatcher/delivered',
        component: React.lazy(() => import('views/dispatcher')),
        authority: [RESTAURANT],
    },
    {
        key: 'restaurant.dispatcher.cancelled',
        path: '/restaurant/dispatcher/cancelled',
        component: React.lazy(() => import('views/dispatcher')),
        authority: [RESTAURANT],
    },
    {
        key: 'restaurant.table.show',
        path: '/restaurant/table/show',
        component: React.lazy(() => import('views/tables')),
        authority: [RESTAURANT],
    },
    {
        key: 'restaurant.table.create',
        path: '/restaurant/table/create',
        component: React.lazy(() => import('views/tables')),
        authority: [RESTAURANT],
    },
    {
        key: 'restaurant.reservation',
        path: '/restaurant/reservation',
        component: React.lazy(() => import('views/tableReservations')),
        authority: [RESTAURANT],
    },
    {
        key: 'restaurant.products',
        path: '/restaurant/products/add',
        component: React.lazy(() => import('views/products')),
        authority: [RESTAURANT],
    },
    {
        key: 'restaurant.products',
        path: '/restaurant/products/show',
        component: React.lazy(() => import('views/products')),
        authority: [RESTAURANT],
    },
    {
        key: 'restaurant.combos',
        path: '/restaurant/combo/add',
        component: React.lazy(() => import('views/comboMenu')),
        authority: [RESTAURANT],
    },
    {
        key: 'restaurant.combos',
        path: '/restaurant/combo/show',
        component: React.lazy(() => import('views/comboMenu')),
        authority: [RESTAURANT],
    },
    {
        key: 'restaurant.addons',
        path: '/restaurant/addons/add',
        component: React.lazy(() => import('views/addons')),
        authority: [RESTAURANT],
    },
    {
        key: 'restaurant.addons',
        path: '/restaurant/addons/show',
        component: React.lazy(() => import('views/addons')),
        authority: [RESTAURANT],
    },
    {
        key: 'restaurant.category',
        path: '/restaurant/category/add',
        component: React.lazy(() => import('views/category')),
        authority: [RESTAURANT],
    },
    {
        key: 'restaurant.category',
        path: '/restaurant/category/show',
        component: React.lazy(() => import('views/category')),
        authority: [RESTAURANT],
    },
]

export default restaurantRoute
