import express from "express";
import rateLimit from "express-rate-limit";
import VerifyTokenController from "../controllers/VerifyTokenController";
import Config from "../config/Config";
import { verifyToken } from "../token";
const router = express.Router();

router.get('/verify', rateLimit(Config.configRateLimit(100, 15)), verifyToken, VerifyTokenController.verifyToken);

export default router;