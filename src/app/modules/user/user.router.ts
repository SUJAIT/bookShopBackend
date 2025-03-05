import express from 'express';
import { userController } from './user.controller';



const router = express.Router();

router.post(
    '/create-user',
    userController.createUser
)
router.post(
    '/create-admin',
    userController.createAdminUser
)

export const UserRoutes = router;