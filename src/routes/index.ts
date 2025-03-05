import { Router } from "express";
import { AuthRoutes } from "../app/modules/Auth/auth.route";
import { UserRoutes } from "../app/modules/user/user.router";


const router = Router();

const moduleRoutes = [
    {
        path:'/auth',
        route:AuthRoutes
    },
    {
        path:'/user',
        route:UserRoutes
    },
]

moduleRoutes.forEach((route)=>router.use(route.path, route.route))

export default router