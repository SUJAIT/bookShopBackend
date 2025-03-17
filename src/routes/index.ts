import { Router } from "express";
import { AuthRoutes } from "../app/modules/Auth/auth.route";
import { UserRoutes } from "../app/modules/user/user.router";
import { ShopRouter } from "../app/modules/Shop/shop.router";


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
    {
        path:'/shop',
        route:ShopRouter
    }
]

moduleRoutes.forEach((route)=>router.use(route.path, route.route))

export default router