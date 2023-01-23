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
]

export default restaurantRoute