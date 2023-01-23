import React from 'react'
import {
    HiOutlineColorSwatch, 
	HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
    HiOutlinePresentationChartLine,
    HiOutlineUserCircle,
    HiTemplate,
    HiOutlineUserAdd,
    HiOutlineUserGroup,
    HiShieldCheck,
    HiCog
} from 'react-icons/hi'
import {
    TbBrowserCheck,
    TbStack
} from 'react-icons/tb'

const navigationIcon = {
    home: <HiOutlineHome />,
    project: <HiOutlinePresentationChartLine />,
    account: <HiOutlineUserCircle />,
    apps: <HiTemplate />,
    add_user: <HiOutlineUserAdd />,
    users: <HiOutlineUserGroup />,
    verify: <HiShieldCheck />,
    restaurant: <HiShieldCheck />,
    dispatcher: <TbBrowserCheck />,
    cog: <HiCog />,
    table: <TbStack />
}

export default navigationIcon