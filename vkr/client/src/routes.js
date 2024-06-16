import Admin from "./pages/Admin";
import {ADMIN_ROUTE, PROFILE_ROUTE, TASK_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, MYTASKS_ROUTE, MYPROFILE_ROUTE} from "./utils/consts";
import Profile from "./pages/Profile";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import TaskPage from "./pages/TaskPage";
import MyTasks from "./pages/MyTasks";
import MyProfile from "./pages/MyProfile";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: MYTASKS_ROUTE,
        Component: MyTasks
    },
    {
        path: MYPROFILE_ROUTE,
        Component: MyProfile
    },      
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: TASK_ROUTE + '/:id',
        Component: TaskPage
    },
    {
        path: PROFILE_ROUTE + '/:id',
        Component: Profile
    },
]
