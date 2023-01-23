import {
  NAV_ITEM_TYPE_TITLE,
  NAV_ITEM_TYPE_COLLAPSE,
  NAV_ITEM_TYPE_ITEM,
} from "constants/navigation.constant";
import {SUPERADMIN, ADMIN, RESTAURANT, USER, SALES} from 'constants/roles.constant'

const navigationConfig = [
  {
    key: "apps",
    path: "",
    title: "Restaurant",
    translateKey: "nav.restaurant",
    icon: "restaurant",
    type: NAV_ITEM_TYPE_TITLE,
    authority: [],
    subMenu: [
      {
        key: "home",
        path: "/home",
        title: "Home",
        translateKey: "nav.home",
        icon: "home",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: "dispatcher",
        path: "/restaurant/dispatcher/pending",
        title: "Dispatcher",
        translateKey: "nav.dispatcher",
        icon: "dispatcher",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      }
    ],
  },
  {
    key: "settings",
    path: "",
    title: "Setiings",
    translateKey: "nav.settings",
    icon: "",
    type: NAV_ITEM_TYPE_TITLE,
    authority: [],
    subMenu: [
      {
        key: "settings.account",
        path: "/settings/account/profile",
        title: "Account",
        translateKey: "nav.account",
        icon: "cog",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
    ],
  },
  {
    key: "leads",
    path: "",
    title: "Leads",
    translateKey: "nav.leads",
    icon: "",
    type: NAV_ITEM_TYPE_TITLE,
    authority: [SUPERADMIN, ADMIN],
    subMenu: [
      {
        key: "leads.create",
        path: "/leads/create_lead",
        title: "Create Lead",
        translateKey: "nav.create_lead",
        icon: "add_user",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [SUPERADMIN, ADMIN],
        subMenu: [],
      },
      {
        key: "leads.manage",
        path: "/leads/manage_lead",
        title: "Manage Leads",
        translateKey: "nav.manage_lead",
        icon: "users",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [SUPERADMIN, ADMIN],
        subMenu: [],
      },
    ],
  },
  {
    key: "verifications",
    path: "",
    title: "Verifications",
    translateKey: "nav.verification",
    icon: "",
    type: NAV_ITEM_TYPE_TITLE,
    authority: [SUPERADMIN, ADMIN],
    subMenu: [
      {
        key: "verifications.list",
        path: "/verification/user",
        title: "User Requests",
        translateKey: "nav.user_requests",
        icon: "verify",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [SUPERADMIN, ADMIN],
        subMenu: [],
      },
    ],
  },
];

export default navigationConfig;
