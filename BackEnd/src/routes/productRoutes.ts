import express from "express";
import rateLimit from "express-rate-limit";
import ProductController from "../controllers/ProductController";
import Config from "../config/Config";
import { verifyToken } from "../token";
const router = express.Router();

router.get('/all', rateLimit(Config.configRateLimit(50, 15)), verifyToken, ProductController.getAllProduct);
router.get('/find', rateLimit(Config.configRateLimit(50, 15)), verifyToken, ProductController.getProductByID);
router.post('/insert', rateLimit(Config.configRateLimit(50, 15)), verifyToken, ProductController.createProduct);

export default router;