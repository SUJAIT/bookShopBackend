
import express from 'express';
import { ProductController } from './product.controller';

const route = express.Router()

route.post('/create-product',ProductController.createProduct)

export const ProductRouter = route;
