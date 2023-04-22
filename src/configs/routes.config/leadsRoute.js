import React from 'react'
import {SUPERADMIN, ADMIN, USER} from 'constants/roles.constant'

const leadsRoute = [
    {
        key: 'leads.create',
        path: '/leads/create_lead',
        component: React.lazy(() => import('views/leads/create')),
        authority: [SUPERADMIN, ADMIN],
    },
    {
        key: 'leads.manage',
        path: '/leads/manage_lead',
        component: React.lazy(() => import('views/leads/manage')),
        authority: [SUPERADMIN],
    },
    {
        key: 'admin.restaurants',
        path: '/admin/restaurants/show',
        component: React.lazy(() => import('views/restaurants')),
        authority: [SUPERADMIN, ADMIN],
    },
    {
        key: 'admin.cuisine',
        path: '/admin/cuisines/add',
        component: React.lazy(() => import('views/cuisines')),
        authority: [SUPERADMIN, ADMIN],
    },
    {
        key: 'admin.cuisine',
        path: '/admin/cuisines/show',
        component: React.lazy(() => import('views/cuisines')),
        authority: [SUPERADMIN, ADMIN],
    },
]

export default leadsRoute