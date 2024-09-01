import express from "express";
import rateLimit from "express-rate-limit";
import UserController from "../controllers/UserController";
import Config from "../config/Config";
import { verifyToken } from "../token";
const router = express.Router();

router.get('/all', rateLimit(Config.configRateLimit(50, 15)), verifyToken, UserController.getAllUser);
router.get('/find', rateLimit(Config.configRateLimit(50, 15)), verifyToken, UserController.getUserByUID);
router.post('/create', rateLimit(Config.configRateLimit(50, 15)), UserController.createUser);
router.post('/authentication', rateLimit(Config.configRateLimit(10, 15)), UserController.authentication)

export default router;