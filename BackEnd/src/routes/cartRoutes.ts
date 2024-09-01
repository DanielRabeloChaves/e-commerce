import express from "express";
import rateLimit from "express-rate-limit";
import CartController from "../controllers/CartController";
import Config from "../config/Config";
import { verifyToken } from "../token";
const router = express.Router();

router.get('/all', rateLimit(Config.configRateLimit(50, 15)), verifyToken, CartController.getAllCart);
router.get('/all/find', rateLimit(Config.configRateLimit(50, 15)), verifyToken, CartController.getCartByUID);
router.get('/find', rateLimit(Config.configRateLimit(50, 15)), verifyToken, CartController.getCartByID);
router.post('/insert', rateLimit(Config.configRateLimit(50, 15)), verifyToken, CartController.createCart);

export default router;