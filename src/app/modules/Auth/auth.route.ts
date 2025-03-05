import express from 'express';
import { AuthControllers } from './auth.controller';


const router=express.Router()

router.post(
    '/login',AuthControllers.loginUser,

)

// router.post(
// '/sign-up'

// )

export const AuthRoutes = router;