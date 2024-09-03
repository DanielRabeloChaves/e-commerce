import express from "express";
import rateLimit from "express-rate-limit";
import FileController from "../controllers/FileController";
import Config from "../config/Config";
import { verifyToken } from "../token";
const router = express.Router();

router.get('/', rateLimit(Config.configRateLimit(100, 15)), FileController.getFileProductById);

export default router;