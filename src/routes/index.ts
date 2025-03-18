import { Router } from "express";
import { AuthRoutes } from "../app/modules/Auth/auth.route";
import { UserRoutes } from "../app/modules/user/user.router";
import { ShopRouter } from "../app/modules/Shop/shop.router";
import { ProductRouter } from "../app/modules/Products/product.route";


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
    },
    {
        path:'/product',
        route:ProductRouter
    }
]

moduleRoutes.forEach((route)=>router.use(route.path, route.route))

export default router