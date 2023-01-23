import React from 'react'
import authRoute from './authRoute'
import restaurantRoute from './restaurantRoute'
import settingsRoute from './settingsRoute'
import leadsRoute from './leadsRoute'
import verificationRoute from './verificationRoute'
import { SUPERADMIN, RESTAURANT } from 'constants/roles.constant'

export const publicRoutes = [
    ...authRoute,
    {
        key: 'reset',
        path: '/reset_password/:id/:token',
        component: React.lazy(() => import('views/auth/ResetPassword')),
        authority: [],
    }
]

export const protectedRoutes = [
    ...restaurantRoute,
    ...settingsRoute,
    ...leadsRoute,
    ...verificationRoute,
    {
        key: 'home',
        path: '/home',
        component: React.lazy(() => import('views/Home')),
        authority: [SUPERADMIN],
    },
    {
        key: 'access-denied',
        path: '/access-denied',
        component: React.lazy(() => import('views/auth/AccessDenied')),
        authority: [],
    },
]
