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
    HiCog,
    HiOutlineCalendar,
    HiOutlineShoppingBag
} from 'react-icons/hi'
import {
    TbBrowserCheck,
    TbStack
} from 'react-icons/tb'
import {
    MdOutlineRestaurantMenu,
    MdFastfood,
    MdManageAccounts,
    MdOutlineAccountCircle,
    MdBookmarkAdd,
    MdOutlineCategory
} from 'react-icons/md'
import {
    GiNoodles
} from 'react-icons/gi'


const navigationIcon = {
    home: <HiOutlineHome />,
    project: <HiOutlinePresentationChartLine />,
    account: <HiOutlineUserCircle />,
    apps: <HiTemplate />,
    add_user: <HiOutlineUserAdd />,
    users: <HiOutlineUserGroup />,
    verify: <HiShieldCheck />,
    restaurant: <MdOutlineRestaurantMenu />,
    dispatcher: <TbBrowserCheck />,
    cog: <HiCog />,
    table: <TbStack />,
    reservation: <HiOutlineCalendar />,
    addons: <MdBookmarkAdd />,
    product: <GiNoodles />,
    combo: <MdFastfood />,
    leads: <MdManageAccounts />,
    account_setting: <MdOutlineAccountCircle />,
    category: <MdOutlineCategory />
}

export default navigationIcon