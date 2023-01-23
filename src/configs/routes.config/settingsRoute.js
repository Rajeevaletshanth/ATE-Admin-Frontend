import React from 'react'
import {SUPERADMIN, RESTAURANT, ADMIN, USER} from 'constants/roles.constant'

const settingsRoute = [
    {
        key: 'account.profile',
        path: '/settings/account/profile',
        component: React.lazy(() => import('views/account/settings')),
        authority: [],
    },
    {
        key: 'account.password',
        path: '/settings/account/password',
        component: React.lazy(() => import('views/account/settings')),
        authority: [],
    },
    {
        key: 'account.billings',
        path: '/settings/account/billing',
        component: React.lazy(() => import('views/account/settings')),
        authority: [],
    },
    
]

export default settingsRoute